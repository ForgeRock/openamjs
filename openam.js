/* 
* The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in compliance with the
 * License.
 *
 * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
 * specific language governing permission and limitations under the License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file and include
 * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
 * Header, with the fields enclosed by brackets [] replaced by your own identifying
 * information: "Portions copyright [year] [name of copyright owner]".
 *
 * Copyright 2014-2016 ForgeRock AS.
 */

/* Some useful wrappers around the OpenAM APIs 
 * To be extended further
 * openam.js (v0.1)
 * Author: Identity Wrestler
 * Notice: This wrapper is not suported/maintained/endorsed by ForgeRock
 */

// TO DO: The Legacy Functions are not implemented yet.

// Some important service URIs
var XUILoginURI =  "/XUI/#login";
var XUILogoutURI =  "/XUI/#logout";
var LoginURI = "/UI/Login";
var LogoutURI = "/UI/Logout";
var ProfileURI = "/XUI/#profile/";

// OpenAM REST API URIs
var sessionsURI = "/json/sessions";
var authenticationURI = "/json/authenticate";
var attributesURI = "/json/users/";
var serverinfoURI = "/json/serverinfo/*";

// OpenAM Legacy REST API URIs
var legacyAuthenticationURI = "/identity/json/authenticate";
var legacyAttributesURI = "/identity/json/attributes";
var legacyValidateSession = "/identity/json/isTokenValid";
var legacyLogoutURI = "/identity/logout";

// OpenAM Param names
var logoutURI = "logout";
var realmParam = "realm";
var serviceParam = "service";
var moduleParam = "module";
var authTypeParam = "authIndexType";
var authValueParam = "authIndexValue";

// Some global variables
var uid = null;

var storageExist = ("sessionStorage" in window && window.sessionStorage);

var openWindow = function (url, o) {
    var left = (screen.width / 2) - (900 / 2);
    var top = (screen.height / 2) - (600 / 2);
    var height = (o.height !== null) ? o.height : 520;
    var win = window.open(url, "win", "width=900, height=" + height + ", top=" + top + ", left=" + left);
    win.focus();
    var id = setInterval(function () {
        try {
            loc = win.location.href;
            if (win.location.href.indexOf(url) < 0) {
                clearInterval(id);
                win.opener.location.replace(loc);
                win.close();
            } 
        } catch (ex1) {
            // Do nothing
        };
    }, 500);
};

// Gets the URL of the page running the script
function getMyURL() {
    var host = window.location.hostname;
    var protocol = window.location.protocol;
    var port = window.location.port;
    var path = window.location.pathname;
    return protocol + "//" + host + ":" + port + path;
}

// Create a Cookie for the domain we are running
function createCookie(name, value, hours, domainName) {
    var expires;
    var domain;
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
        domain = ";domain=" + domainName;       
    } else {
        expires = "";
        domain = ";domain=" + domainName;
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + domain + "; path=/";
}

// Delete the cookie 
function deleteCookie(name, domainName) {
    createCookie(name, "", -1, domainName);
}

// Get the cookie
function getCookie(name) {
var value = " " + document.cookie;
var cStart = value.indexOf(" " + name + "=");
if (cStart === -1) {
    value = null;
}
else {
    cStart = value.indexOf("=", cStart) + 1;
    var cEnd = value.indexOf(";", cStart);
    if (cEnd === -1) {
        cEnd = value.length;
    }
    value = unescape(value.substring(cStart,cEnd));
}
return value;
}


// Functions to connect to the server using XMLHttpRequest
// or MSoft stuff, in case is necessary
var ajax = {};
ajax.x = function () {
    if ('withCredentials' in new XMLHttpRequest()) {
        console.log("XHR support");
        return new XMLHttpRequest();
    } else if (typeof XDomainRequest !== "undefined") {
        console.log("XDR support");
        return new XDomainRequest();
    } else {
        var versions = [
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
                console.log("ERROR when creating ActiveXObject");
            }
        }
        console.log("ActiveXObject support");
        return xhr;
    }
};

ajax.send = function(url, callback, method, data, contentType, sessionCookieName, tokenId, sync) {
    var x = ajax.x();
    x.open(method, url, sync, null, null);
    x.onreadystatechange = function() {
        if (x.readyState === 4) {
            callback(x.responseText);
        }
    };
    x.setRequestHeader('Content-type', contentType);
    if (tokenId && sessionCookieName) {
       x.setRequestHeader(sessionCookieName, tokenId); 
    }
    x.send(data);
};

ajax.authenticate = function (url, callback, data, username, password, sync) {

    var x = ajax.x();
    x.onreadystatechange = function () {
        if (x.readyState === 4) {
                callback(x.responseText);
        }
    };
    
    x.onerror = function () {
        console.error(x.statusText);
    };
    
    try {
        x.open('POST', url, false);
    } catch (err) {
        // Do nothing
    }
    
    x.setRequestHeader('X-OpenAM-Username', username);
    x.setRequestHeader('X-OpenAM-Password', password);
    x.setRequestHeader('Content-type', 'application/json');
    x.send(data);
};

ajax.get = function(url, callback, contentType, sessionCookieName, tokenId, sync) {
    ajax.send(url, callback, 'GET', null, contentType, sessionCookieName, tokenId, sync);
};

ajax.post = function(url, data, callback, contentType, sync) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), contentType, sync);
};

/**
 * OpenAM Configuration instance
 * @constructor
 * @function openamConfig
 * @param {String} openAMBaseURL - The URL where OpenAM is running, example: "https://openam.example.com:443/openam"
 * @param {String} realm - Name of the realm to be used, example: "/"
 * @param {Boolean | undefined} cacheEnabled - IF enabled, session valid status and attributs will be cached in sessionStorage, if possible. Example: false
 * @param {Boolean | undefined} openamDebugEnabled - Enable debug, works for some browser, not for all. Example: true
 * @param {Boolean | undefined} legacyEnabled - Is the OpenAM you are connecting to using the old APIs, then it is legacy. Example: false
 * @returns {openamConfig} An instance of the OpenAM Configuration.
*/
function openamConfig(openAMBaseURL, realm, cacheEnabled, openamDebugEnabled,
        legacyEnabled) {
    this.openAMBaseURL = openAMBaseURL;
    this.realm = realm;
    serverinfo = this.getServerinfo();
    this.sessionCookieName = JSON.parse(serverinfo).cookieName;
    this.domainName = JSON.parse(serverinfo).domains[0];  // Taking the first domain
    this.cacheEnabled = cacheEnabled;
    this.legacyEnabled = legacyEnabled || false;
    this.openamDebugEnabled = openamDebugEnabled;
    this.ssotoken = getCookie(this.sessionCookieName);
    this.XUILoginURL = this.openAMBaseURL + XUILoginURI;
    this.LoginURL = this.openAMBaseURL + LoginURI;
    this.cacheTime = 3;
}

/**
 * getServerinfo
 * @function getServerinfo
 * @returns {JSON} The value provided by the OpeAM serverinfo endpoint
 */
openamConfig.prototype.getServerinfo = function() {
    var response = null;
    var serverinfo_url = this.createServerinfoURL(this.realm);
    this.openamDebug("getServerinfo: Serverinfo URL: " + serverinfo_url);
    ajax.get(serverinfo_url,
             function(responseText) { 
                        response = responseText;
                      }, 
                      'application/json');
    return response;
    
};

/**
 * Creates the proper OpenAM URL for the serverinfo endpoint using the configured parameters
 * @function createServerinfoURL
 * @param {String} realm - Name of the realm to be used, example: "/"
 * @returns {String} The URL of the serverinfo endpoint for the configured OpenAM in the realm provided
 */
openamConfig.prototype.createServerinfoURL = function(realm) {
    serverinfo_url = this.openAMBaseURL + serverinfoURI;
    if (realm !== '' & realm !== '/') {
        serverinfo_url = serverinfo_url.replace("/json", "/json" + realm);
    }
    return serverinfo_url;
};

/**
 * Check the local session storage
 * @function getLocal
 * @param {String} storageKey
 * @returns {JSON} The value of the attribute requested
 */
openamConfig.prototype.getLocal = function (storageKey) {

    var now, expiration, data = false;
    try {
        this.openamDebug("About to enter SESSION STORAGE" + storageExist);
        if (storageExist) {
            data = sessionStorage.getItem(storageKey);
            this.openamDebug("There is sessionStorage");
            if (data) {
                data = JSON.parse(data);
                this.openamDebug("There is Data: " + data);
                now = new Date();
                expiration = new Date(data.timestamp);
                expiration.setMinutes(expiration.getMinutes() + this.cacheTime);
                if (now.getTime() > expiration.getTime()) {
                    this.openamDebug("DATA EXPIRED ");
                    data = false;
                    sessionStorage.removeItem(storageKey);
                } else {
                    this.openamDebug("DATA NOT EXPIRED ");
                    data = data.data;
                }
            }
        }
    } catch (error) {
        this.openamDebug("STORAGE ERROR");
        data =false;
    }
    return data;
};

/**
 * Stores a value "data" in the key "storageKey" in the local session storage
 * @function storeLocal
 * @param {type} storageKey - The key to be used to store the value
 * @param {type} data - The value of the data to be stored
 */
openamConfig.prototype.storeLocal = function (storageKey, data) {
    if (storageExist) {
        try {
            this.openamDebug("DATA TO STORE IS: " + storageKey + ":" + data);
            sessionStorage.setItem(storageKey,
                    JSON.stringify({
                        timestamp: new Date(),
                        data: data}));
        } catch (err) {
            // Nothing
        }
    }
};

/**
 * Removes the specified key from the session storage
 * @function removeLocal
 * @param {type} storageKey - The key-value pair to be removed
 */
openamConfig.prototype.removeLocal = function (storageKey) {
    if (storageExist) {
        try {
            this.openamDebug("REMOVING " + storageKey);
            sessionStorage.removeItem(storageKey);
        } catch (err) {
            // Do nothing
        }
    }
};

/**
 * Removes all the key-value pairs stored by this library in the local session storage
 * @function removeAllLocal
 */
openamConfig.prototype.removeAllLocal = function () {
    if (storageExist) {
        try {
            this.openamDebug("REMOVING ALL");
            this.removeLocal("validSession");
            this.removeLocal("attributes");
        } catch (err) {
            // Do nothing
        }
    }
};

/**
 * Redirects for authentication to an OpenAM using the Authentication module specified
 * @function authNRedirectModule
 * @param {String} module - Name of the module to be used for the authentication
 * @param {String | undefined} realm - Name of the realm to be used (Default is the one configured in openamConfig)
 * @param {String | undefined} gotoURL - URL to go after the authentication is successful. Default is to go back to the URL that invoked the function
 * @param {String | undefined} gotoOnFail - URL to go if the authentication fails. Default is to go back to the URL that invoked the function
 * @param {Boolean | undefined} classic - Use the Classic Login UI (true) or the XUI (false). Default is to use the XUI
*/
openamConfig.prototype.authNRedirectModule = function (module, realm, gotoURL, 
                                                gotoOnFail, classic) 
{                                                 
    redirectURL = "";
    myURL = encodeURIComponent(getMyURL());

    module = module || "DataStore";
    realm = realm || this.realm;
    gotoURL = gotoURL || myURL;
    gotoOnFail = gotoOnFail || myURL;
    classic = classic || false;
 
    if (!classic) {
        redirectURL = this.XUILoginURL + realm + "&" + moduleParam + "=" +
                module + "&goto=" + gotoURL + "&gotoOnFail=" + gotoOnFail;
    } else {
        redirectURL = this.LoginURL + "?" + realmParam + "=" + realm + "&" +
                moduleParam + "=" + module + "&goto=" + gotoURL + 
                "&gotoOnFail=" + gotoOnFail;
    }
    window.location = redirectURL;
    return false;
};

/**
 * Redirects for authentication to an OpenAM using the Authentication module specified using a window instead of redirecting to a new page
* @function authNRedirectModuleWdw
* @param {String} module - Name of the module to be used for the authentication
* @param {String | undefined} realm - Name of the realm to be used (Default is the one configured in openamConfig)
* @param {String | undefined} gotoURL - URL to go after the authentication is successful. Default is to go back to the URL that invoked the function
* @param {Boolean | undefined} classic - Use the Classic Login UI (true) or the XUI (false). Default is to use the XUI
*/
openamConfig.prototype.authNRedirectModuleWdw = function (module, realm, gotoURL, classic) 
{                                                 
    redirectURL = "";
    myURL = encodeURIComponent(getMyURL());

    module = module || "DataStore";
    realm = realm || this.realm;
    gotoURL = gotoURL || myURL;
    classic = classic || false;
 
    if (!classic) {
        redirectURL = this.XUILoginURL + realm + "&" + moduleParam + "=" +
                module + "&goto=" + gotoURL;
    } else {
        redirectURL = this.LoginURL + "?" + realmParam + "=" + realm + "&" +
                moduleParam + "=" + module + "&goto=" + gotoURL;
    }
    openWindow(redirectURL, { height: 500 });
    return false;
};

/**
 * Redirects for authentication to an OpenAM using the Authentication service chain specified
 * @function authNRedirectService
 * @param {String} service - Name of the service chain to be used for the authentication
 * @param {String | undefined} realm - Name of the realm to be used (Default is the one configured in openamConfig)
 * @param {String | undefined} gotoURL - URL to go after the authentication is successful. Default is to go back to the URL that invoked the function
 * @param {String | undefined} gotoOnFail - URL to go if the authentication fails. Default is to go back to the URL that invoked the function
 * @param {Boolean | undefined} classic - Use the Classic Login UI (true) or the XUI (false). Default is to use the XUI
*/
openamConfig.prototype.authNRedirectService = function (service, realm, gotoURL, 
                                                gotoOnFail, classic) 
{                                                    
    redirectURL = "";
    myURL= encodeURIComponent(getMyURL());
    
    service = service || "ldapService";
    realm = realm || this.realm;
    gotoURL = gotoURL || myURL;
    gotoOnFail = gotoOnFail || myURL;
    classic = classic || false;
    
    if (!classic) {
        redirectURL = this.XUILoginURL + realm + "&" + serviceParam + "=" + 
                    service + "&goto=" + gotoURL + "&gotoOnFail=" + gotoOnFail;
    } else {
        redirectURL = this.LoginURL + "?" + realmParam + "=" + realm + "&" + 
                serviceParam + "=" + service + "&goto=" + gotoURL + 
                "&gotoOnFail=" + gotoOnFail;
    }
    window.location = redirectURL;
    return false;      
};

/**
 * Redirects for authentication to an OpenAM using the Authentication service chain specified using a window instead of a new page
 * @function authNRedirectServiceWdw
 * @param {String} service - Name of the service chain to be used for the authentication
 * @param {String | undefined} realm - Name of the realm to be used (Default is the one configured in openamConfig)
 * @param {String | undefined} gotoURL - URL to go after the authentication is successful. Default is to go back to the URL that invoked the function
 * @param {Boolean | undefined} classic - Use the Classic Login UI (true) or the XUI (false). Default is to use the XUI
*/
openamConfig.prototype.authNRedirectServiceWdw = function (service, realm, gotoURL, classic) 
{                                                    
    redirectURL = "";
    myURL= encodeURIComponent(getMyURL());
    
    service = service || "ldapService";
    realm = realm || this.realm;
    gotoURL = gotoURL || myURL;
    classic = classic || false;
    
    if (!classic) {
        redirectURL = this.XUILoginURL + realm + "&" + serviceParam + "=" + 
                    service + "&goto=" + gotoURL;
    } else {
        redirectURL = this.LoginURL + "?" + realmParam + "=" + realm + "&" + 
                serviceParam + "=" + service + "&goto=" + gotoURL;
    }
    openWindow(redirectURL, { height: 500 });
    return false;      
};

/**
 *  Checks if a user is authenticated
 * @function isUserAuthenticated
 * @returns {Boolean} - True if a user is authenticated
*/
openamConfig.prototype.isUserAuthenticated = function () {
    
    if (this.ssotoken && this.ssotoken !== '' && this.isSessionValid(this.ssotoken)) {
        this.openamDebug("USER AUTHENTICATED");
        return true;      
    } else {
        this.openamDebug("USER NOT AUTHENTICATED");
        return false;
    }
};

/**
 * Checks if the session that the tokenID represents is valid
 * @function isSessionValid
 * @param {String} tokenId - The SSO Token ID (a.k.a the identifier of the session)
 * @returns {Boolean} - True if the session is valid
*/
openamConfig.prototype.isSessionValid = function (tokenId) {
    var valid = false;
    var sessions_url = "";
    
    response = this.getLocal("validSession");
    this.openamDebug("isSessionValid cached response: " + response);
    if (response) {
        valid = JSON.parse(response).valid;
        uid = JSON.parse(response).uid;
        this.realm = JSON.parse(response).realm;
        if (valid && uid && this.realm) {
            return valid;
        }
    }
    
    if (!this.legacyEnabled) {
        this.openamDebug("isSessionValid: Legacy Mode Disabled");
        sessions_url = this.openAMBaseURL + sessionsURI;
        ajax.post(sessions_url + "/" + tokenId + "?_action=validate",
                  null,function(responseText) { 
                      valid = JSON.parse(responseText).valid;
                      uid = JSON.parse(responseText).uid;
                      this.realm = JSON.parse(responseText).realm;
                      response = responseText;
                      },
                  'application/json');  
                  this.openamDebug("VALID IS: " + valid);
    } else {
       this.openamDebug("isSessionValid: Legacy Mode Enabled");
        sessions_url = this.openAMBaseURL + legacyValidateSession;
        ajax.post(sessions_url + "?tokenid=" + tokenId, null,
                   function(responseText) {
                       valid = JSON.parse(responseText).valid;
                      },
                   'application/json');
    }
    this.storeLocal("validSession", response);
    this.openamDebug("isSessionValid: isValid Response: " + valid + "; uid="
        + uid + "; realm=" + this.realm);

    return valid;
};


/**
 * Authenticates an identity using username/password. The realm, module or service can be specified
 *  but only modules and services with username/password are supported at the moment
 *  @function authenticate
 *  @param {String} username - Name of the user(or identity) to be authenticated
 *  @param {String} password - The Password to be used to authenticate the user: username
 *  @param {String | undefined} realm - The realm to be used during the authentication. Default is the realm used in openamConfig
 *  @param {String | undefined} module - AuthN module to be used. Default is the default AuthN module configured in the OpenAM for the realm
 *  @param {String | undefined} service - Name of the service chain to be used for the authentication
 *  @returns {String | null} Returns the token id of the session if the authentication is successful, otherwise it returns null 
 */
openamConfig.prototype.authenticate =  function (username, password, realm, module, service) {
    if (!this.legacyEnabled) {
        return this.authenticateWithModernOpenAM(username, password, realm, module, service);      
    } else {
        return this.authenticateWithLegacyOpenAM(username, password, realm, module, service);
    }
};

/**
 *  Authenticates an identity using username/password.
 *  The version of the AM should support the /json/authenticate endpoint.
 *  The realm, module or service can be specified but only modules and services 
 *  with username/password are supported at the moment
 *  @function authenticateWithModernOpenAM
 *  @param {String} username - Name of the user(or identity) to be authenticated
 *  @param {String} password - The Password to be used to authenticate the user: username
 *  @param {String | undefined} realm - The realm to be used during the authentication. Default is the realm used in openamConfig
 *  @param {String | undefined} module - AuthN module to be used. Default is the default AuthN module configured in the OpenAM for the realm
 *  @param {String | undefined} service - Name of the service chain to be used for the authentication
 *  @returns {String | null} Returns the token id of the session if the authentication is successful, otherwise it returns null 
*/
openamConfig.prototype.authenticateWithModernOpenAM = function(username, password, realm, module, service) {
    var tokenId = null;
    if (!realm  || realm === null) realm=this.realm;
    authentication_url = this.createAuthenticationURL(realm, module, service);
    this.openamDebug("authenticateWithModernOpenAM: AUTHN URL: " + authentication_url);
    try {
        ajax.authenticate(authentication_url,
                function (responseText) {
                    if (responseText) {
                       tokenId = JSON.parse(responseText).tokenId;
                       response = responseText;
                    }
                }, "{}", username, password);
    } catch (err) {
        this.openamDebug("authenticateWithModernOenAM: " + err);
    }    
    if ( tokenId && tokenId.length !== 0 ) {
        createCookie(this.sessionCookieName, tokenId, 3, this.domainName);
        this.openamDebug("RESPONSE: " + response);
    } else {
        deleteCookie(this.sessionCookieName);
        this.removeLocal("validSession");
    }
    this.openamDebug("authenticateWithModernOpenAM.TOKENID: " + tokenId);
    return tokenId;
};

/**
 * Authenticates an identity using username/password.
 * The realm, module or service can be specified but only modules and services 
 * with username/password are supported at the moment. 
 * NOTE: This function is not implemented!
 * @function authenticateWithLegacyOpenAM
 * @param {String} username - Name of the user(or identity) to be authenticated
 * @param {String} password - The Password to be used to authenticate the user: username
 * @param {String | undefined} realm - The realm to be used during the authentication. Default is the realm used in openamConfig
 * @param {String | undefined} module - AuthN module to be used. Default is the default AuthN module configured in the OpenAM for the realm
 * @param {String | undefined} service - Name of the service chain to be used for the authentication
 * @returns {String | null} Returns the token id of the session if the authentication is successful, otherwise it returns null 
*/
openamConfig.prototype.authenticateWithLegacyOpenAM = function(username, password, realm, module, service) {
    authenticationSuccess = false;
    var tokenId = null;
    return tokenId;
    
    // TO DO: Complete this
};

/**
 * Constructs the URL to be used for the authentication based on the real and module or service provided
 * @function createAuthenticationURL
 * @param {String | undefined} realm - The realm to be used during the authentication. Default is the realm used in openamConfig
 * @param {String | undefined} module - AuthN module to be used. Default is the default AuthN module configured in the OpenAM for the realm
 * @param {String | undefined} service - Name of the service chain to be used for the authentication
 * @returns {string} - Returns the URL of the authentication endpoint for the realm and module or service provided
 */
openamConfig.prototype.createAuthenticationURL = function (realm, module, service) {
    this.openamDebug("OpenAM Base URL: " + this.openAMBaseURL);
    authentication_url = this.openAMBaseURL + authenticationURI;
    if (realm && realm !== '') {
        authentication_url = authentication_url + "?" + realmParam + "=" + realm;
    }
    if (module && module !== '') {
        if (authentication_url.indexOf("?") !== -1 ) {        
            authentication_url = authentication_url + "&" + authTypeParam + "=" + moduleParam + "&" +
               authValueParam  + "=" + module;
        } else {
            $authentication_url = authentication_url + "?" +  authTypeParam + "=" + moduleParam + "&" +
                authValueParam  + "=" + module;
        }
    } else {
        if (service && service !== '') {
            if (authentication_url.indexOf("?") !== -1 ) {
                authentication_url = authentication_url + "&" + authTypeParam + "=" + serviceParam + "&" +
                authValueParam  + "=" + service;
            } else {
                authentication_url = authentication_url + "?" + authTypeParam + "=" + serviceParam + "&" +
                authValueParam  + "=" + service;
            }
        }
    }
    return authentication_url;
};

/**
 * Obtains the values of the profile attributes specified as a comma separated list
 * @param {type} attributes - Comma separated list of attributes
 * @returns {JSON} - Returns the value of the profile attributes requested from the OpenAM
 */
openamConfig.prototype.getIdentityAttributes = function (attributes) {
    
    response = null;
    if (this.cacheEnabled) {
        data = this.getLocal("attributes");
        if (data) return data;
    }   
    
    tokenId = this.ssotoken;   
    if (this.isSessionValid(tokenId)) {
        if (!this.legacyEnabled) {
            this.openamDebug("getAttributesFromOpenAM: LEGACY NOT ENABLED");
            response = this.getAttributesFromModernOpenAM(tokenId, attributes);   
        } else {
            this.openamDebug("getAttributesFromOpenAM: LEGACY ENABLED");
            response = this.getAttributesFromLegacyOpenAM(tokenId, attributes);
        }
    }    
    if (response && this.cacheEnabled) this.storeLocal("attributes", response);
    return response;
};


/**
 * Obtains the values of the profile attributes specified as a comma separated list for an OpenAM version 12 or later
 * @param {String} tokenId - The token id that represents the OpenAM session
 * @param {String} attributes - Comma separated list of attributes
 * @returns {JSON} - Returns the value of the profile attributes requested from the OpenAM
 */
openamConfig.prototype.getAttributesFromModernOpenAM = function (tokenId, attributes) {
    var response = null;
    var attributes_url=this.createAttributesURL(this.realm);
    this.openamDebug("getAttributesFromModernOpenAM: ATTRIBUTE URL: " + attributes_url);
    url = attributes_url + uid + "?_fields=" + encodeURIComponent(attributes);
    this.openamDebug("getAttributesFromModernOpenAM: full url: " + url);
    ajax.get(url,
             function(responseText) { 
                        response = responseText;
                      }, 
                      'application/json', this.sessionCookieName, tokenId);
    this.openamDebug("getAttributesFromModernOpenAM. Attributes: " + response);
    return response;
};


/**
 * Obtains the values of the profile attributes specified as a comma separated list for an OpenAM version 11 or older
 * NOTE: This function is not yet implemented!
 * @param {String} tokenId - The token id that represents the OpenAM session
 * @param {String} attributes - Comma separated list of attributes
 * @returns {JSON} - Returns the value of the profile attributes requested from the OpenAM
 */
openamConfig.prototype.getAttributesFromLegacyOpenAM = function (tokenId, attributes) {
   var response = null;
   // TO DO: Implement this
   return response;
};

/**
 * Constructs the proper OpenAM Attributes URL using the configured realm
 * @param {String | undefined} realm - Name of the realm to be used (Default is the one configured in openamConfig)
 * @returns {String} - Returns the URL of the attributes end point of the OpenAM
 */
openamConfig.prototype.createAttributesURL = function(realm) {
    realm = realm || this.realm;
    attributes_url = this.openAMBaseURL + attributesURI;
    this.openamDebug("from inside realm=" + realm);
    if (realm !== '' & realm !== '/') {
        attributes_url = attributes_url.replace("/users", realm + "/users");
    }
    return attributes_url;
};

/**
 * Log out the user from the OpenAM
 * @param {String} gotoURL - The URL to go to after a successful logout. Default is to return to the curent page
 * @param {String} gotoOnFail - The URL to go to in case the logout failed. Default is to return to the curent page
 * @returns {undefined}
 */
openamConfig.prototype.logout = function (gotoURL, gotoOnFail) {
    gotoURL = gotoURL || getMyURL();
    gotoOnFail = gotoOnFail || getMyURL();
    
    if (!this.legacyEnabled) {
        if (this.logoutWithModernOpenAM()) {
            window.location = gotoURL;
        } else {
            window.location = gotoOnFail;
        }
        
    } else {
        if (this.logoutWithLegacyOpenAM()) {
            window.location = gotoURL;
        } else {
            window.location = gotoOnFail;
        }
    }
};

/**
 * Logs out a user from a modern OpenAM
 * @returns {Boolean} - Returns True if the logout is successful
 */
openamConfig.prototype.logoutWithModernOpenAM = function () {
    var logoutSuccess = false;
    tokenId = this.ssotoken;
    logout_url = this.createLogoutURL(tokenId);
    this.openamDebug("logoutWithModernOpenAM: AUTHN URL: " + logout_url);
    ajax.send(logout_url,
        function(responseText) { 
            response = responseText;
        }, "POST", "{}", "application/json", this.sessionCookieName, tokenId);
    this.openamDebug(response);
    if ( response ) {
        deleteCookie(this.sessionCookieName, this.domainName);
        deleteCookie(this.aMAuthCookie, this.domainName);
        this.ssotoken = null;
        logoutSuccess = true;
    } else {
        deleteCookie(this.sessionCookieName, this.domainName);
        deleteCookie(this.aMAuthCookie, this.domainName);
        this.ssotoken = null;
        logoutSuccess = false;
    }
    this.removeAllLocal();
    this.openamDebug("logout result: " + logoutSuccess);                      
    return logoutSuccess;
};

/**
 * Logs out a user from a legacy OpenAM
 * NOTE: This function is not implemented yet
 * @returns {Boolean} - Returns True if the logout is successful
 */
openamConfig.prototype.logoutWithLegacyOpenAM = function () {
    var logoutSuccess = false;
    tokenId = this.ssotoken;
    // TO DO: Implement this
    return logoutSuccess;
};


// Creates the proper OpenAM authentication URL using the parameters configured 
/**
 * 
 * @param {String} tokenId - The token id that represents the OpenAM session
 * @returns {String} - Returns The URL of the logout endpoint for a modern OpenAM
 */
openamConfig.prototype.createLogoutURL = function(tokenId) {
    if (!this.legacyEnabled) {
        logout_url = this.openAMBaseURL + sessionsURI + "/" + tokenId + "?_action=logout";
    }
    return logout_url;
};

/**
 * Displays a message in the browser's console (if possible)
 * @param {type} message - Message to display in the console
 * @returns {undefined}
 */
openamConfig.prototype.openamDebug = function (message) {
    if (this.openamDebugEnabled) {
        try {
            console.log(message);
        } catch (err) {
            alert("Debugging will be disabled, your browser does not support it");
            this.openamDebugEnabled = false;
        }
    }
};
