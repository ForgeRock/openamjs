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
 * Copyright 2014 ForgeRock AS.
 */

/* Some useful wrappers around the OpenAM APIs 
 * To be extended further
 * openam.js (v0.1)
 */

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



// 
function openamConfig(openAMBaseURL, realm, sessionCookieName, 
    domainName, legacyEnabled, OPENAM_DEBUG_ENABLED) {
    this.openAMBaseURL = openAMBaseURL;
    this.realm = realm;
    this.sessionCookieName = sessionCookieName;
    this.domainName = domainName;
    this.legacyEnabled = legacyEnabled;
    this.OPENAM_DEBUG_ENABLED = OPENAM_DEBUG_ENABLED;
    this.ssotoken = getCookie(this.sessionCookieName);
    this.XUILoginURL = this.openAMBaseURL + XUILoginURI;
    this.LoginURL = this.openAMBaseURL + LoginURI;
}

// Gets the URL of the page running the script
function getMyURL() {
    var host = window.location.hostname;
    var protocol = window.location.protocol;
    var port = window.location.port;
    var path = window.location.pathname;
    return protocol + "//" + host + port + path;
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
ajax.x = function() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();  
    }
    var versions = [
        "MSXML2.XmlHttp.5.0",   
        "MSXML2.XmlHttp.4.0",  
        "MSXML2.XmlHttp.3.0",   
        "MSXML2.XmlHttp.2.0",  
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for(var i = 0; i < versions.length; i++) {  
        try {  
            xhr = new ActiveXObject(versions[i]);  
            break;  
        } catch (e) {
        }  
    }
    return xhr;
};

ajax.send = function(url, callback, method, data, contentType, sessionCookieName, tokenId, sync) {
    var x = ajax.x();
    x.open(method, url, sync);
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

ajax.authenticate = function(url, callback, data, username, password, sync) {  
    
    var x = ajax.x();
    try {
        x.open('POST', url, false);
    } catch (err) {

    }
    x.onreadystatechange = function() {
        if (x.readyState === 4) {
            callback(x.responseText);
        }
    };
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
@function redirectAuthNWithModule redirects for authentication to an OpenAM using an AuthN module
@param {String} module - Name of the module to be used for the authentication
@param {optional String} realm - Name of the realm to be used (Default is the one configured in openamConfig)
@param {optional String} goto - URL to go after the authentication is successful. Default is to go back to the URL that invoked the function
@param {optional String} gotoOnFail - URL to go if the authentication fails. Default is to go back to the URL that invoked the function
@param {optional Boolean} classic - Use the Classic Login UI (true) or the XUI (false). Default is to use the XUI
*/
openamConfig.prototype.redirectAuthNWithModule = function (module, realm, goto, 
                                                gotoOnFail, classic) 
{
// openamConfig.prototype.authenticateWithModule = function (module) {                                                    

    redirectURL = ";"
    myURL = encodeURIComponent(getMyURL());

    module = module || "DataStore";
    realm = realm || this.realm;
    goto = goto || myURL;
    gotoOnFail = gotoOnFail || myURL;
    classic = classic || false;

    if (!classic) {
        redirectURL = this.XUILoginURL + realm + "&" + moduleParam + "=" +
                module + "&goto=" + goto + "&gotoOnFail=" + gotoOnFail;
    } else {
        redirectURL = this.LoginURL + "?" + realmParam + "=" + realm + "&" +
                moduleParam + "=" + module + "&goto=" + goto + 
                "&gotoOnFail=" + gotoOnFail;
    }
    window.location = redirectURL;
    return false;
};

/**
@function redirectAuthNWithService redirects for authentication to an OpenAM using a service chain
@param {String} service - Name of the service chain to be used for the authentication
@param {optional String} realm - Name of the realm to be used (Default is the one configured in openamConfig)
@param {optional String} goto - URL to go after the authentication is successful. Default is to go back to the URL that invoked the function
@param {optional String} gotoOnFail - URL to go if the authentication fails. Default is to go back to the URL that invoked the function
@param {optional Boolean} classic - Use the Classic Login UI (true) or the XUI (false). Default is to use the XUI
*/
openamConfig.prototype.redirectAuthNWithService = function (service, realm, goto, 
                                                gotoOnFail, classic) 
{                                                    
    redirectURL = ";"
    myURL= encodeURIComponent(getMyURL());
    
    service = service || "ldapService";
    realm = realm || this.realm;
    goto = goto || myURL;
    gotoOnFail = gotoOnFail || myURL;
    classic = classic || false;
    
    if (!classic) {
        redirectURL = this.XUILoginURL + realm + "&" + serviceParam + "=" + 
                    service + "&goto=" + goto + "&gotoOnFail=" + gotoOnFail;
    } else {
        redirectURL = this.LoginURL + "?" + realmParam + "=" + realm + "&" + 
                serviceParam + "=" + service + "&goto=" + goto + 
                "&gotoOnFail=" + gotoOnFail;
    }
    window.location = redirectURL;
    return false;      
};


/**
@function isUserAuthenticated If a user is authenticated, returns true
*/
openamConfig.prototype.isUserAuthenticated = function () {
    if (this.ssotoken && this.ssotoken !== '' && this.isSessionValid(this.ssotoken)) {
        this.openamDebug("USER AUTHETNICATED");
        return true;
    } else {
        this.openamDebug("USER NOT AUTHENTICATED");
        return false;
    }
};

/**
@function isSessionValid if the session that the tokenID represents is valid, returns true.
@param {String} tokenId - The SSO Token ID (a.k.a the identifier of the session)
*/
openamConfig.prototype.isSessionValid = function (tokenId) {
    var valid = false;
    var sessions_url = "";
    
    if (!this.legacyEnabled) {
        this.openamDebug("isSessionValid: Legacy Mode Disabled");
        sessions_url = this.openAMBaseURL + sessionsURI;
        ajax.post(sessions_url + "/" + tokenId + "?_action=validate",
                  null,function(responseText) { 
                      valid = JSON.parse(responseText).valid;
                      uid = JSON.parse(responseText).uid;
                      this.realm = JSON.parse(responseText).realm;
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
    this.openamDebug("isSessionValid: isValid Response: " + valid + "; uid="
        + uid + "; realm=" + this.realm);
    return valid;
};


/**
@function authenticate Authenticates an identity using username/password. The realm, module or service can be specified
 but only modules and services with username/password are supported at the moment
@param {String} username - Name of the user(or identity) to be authenticated
@param {String} password - The Password to be used to authenticate the user: username
@param {optional String} realm_ - The realm to be used during the authentication. Default is the realm used in openamConfig
@param {optional String} module_ - AuthN module to be used. Default is the default AuthN module configured in the OpenAM for the realm
*/
openamConfig.prototype.authenticate =  function (username, password, realm_, module_, service_) {
    if (!this.legacyEnabled) {
        return this.authenticateWithModernOpenAM(username, password, realm_, module_, service_);      
    } else {
        return this.authenticateWithLegacyOpenAM(username, password, realm_, module_, service_);
    }
};

// Authenticates a user in a modern OpenAM using the credentials passed 
/**
@function authenticateWithModernOpenAM Authenticates an identity using username/password.
 The version of the AM should support the /json/authenticate endpoint
 The realm, module or service can be specified but only modules and services 
 with username/password are supported at the moment
@param {String} username - Name of the user(or identity) to be authenticated
@param {String} password - The Password to be used to authenticate the user: username
@param {optional String} realm_ - The realm to be used during the authentication. Default is the realm used in openamConfig
@param {optional String} module_ - AuthN module to be used. Default is the default AuthN module configured in the OpenAM for the realm
*/
openamConfig.prototype.authenticateWithModernOpenAM = function(username, password, realm_, module_, service_) {
    authenticationSuccess = false;
    var tokenId = null;
    authentication_url = this.createAuthenticationURL(realm_, module_, service_);
    this.openamDebug("authenticateWithModernOpenAM: AUTHN URL: " + authentication_url);
    try {
        ajax.authenticate(authentication_url,
                function (responseText) {
                    tokenId = JSON.parse(responseText).tokenId;
                }, "{}", username, password);
    } catch (err) {
        this.openamDebug("authenticateWithModernOenAM: " + err);
        this.openamDebug("authenticateWithModernOpenAM: ");
        authenticationSuccess = false;
    }    
    if ( tokenId && tokenId.length !== 0 ) {
        createCookie(this.sessionCookieName, tokenId, 3, this.domainName);
        authenticationSuccess = true;
    } else {
        deleteCookie(this.sessionCookieName);
        authenticationSuccess = false;
    }
    this.openamDebug("authenticateWithModernOpenAM.Session VALID: " + authenticationSuccess);
    this.openamDebug("authenticateWithModernOpenAM.TOKENID: " + tokenId);
    return tokenId;
};


openamConfig.prototype.authenticateWithLegacyOpenAM = function(username, password, realm_, module_, service_) {
    authenticationSuccess = false;
    var tokenId = null;
    return tokenId;
};

// Creates the proper OpenAM authentication URL using the parameters configured 
openamConfig.prototype.createAuthenticationURL = function (realm_, module_, service_) {
    this.openamDebug("OpenAM Base URL: " + this.openAMBaseURL);
    authentication_url = this.openAMBaseURL + authenticationURI;
    if (realm_ && realm_ !== '') {
        authentication_url = authentication_url + "?" + realmParam + "=" + realm_;
    }
    if (module_ && module_ !== '') {
        if (authentication_url.indexOf("?") !== -1 ) {        
            authentication_url = authentication_url + "&" + authTypeParam + "=" + moduleParam + "&" +
               authValueParam  + "=" + module_;
        } else {
            $authentication_url = authentication_url + "?" +  authTypeParam + "=" + moduleParam + "&" +
                authValueParam  + "=" + module_;
        }
    } else {
        if (service_ && service_ !== '') {
            if (authentication_url.indexOf("?") !== -1 ) {
                authentication_url = authentication_url + "&" + authTypeParam + "=" + serviceParam + "&" +
                authValueParam  + "=" + service_;
            } else {
                authentication_url = authentication_url + "?" + authTypeParam + "=" + serviceParam + "&" +
                authValueParam  + "=" + service_;
            }
        }
    }
    return authentication_url;
};

// Pulls attributes from OpenAM using the existing session and username 
openamConfig.prototype.getIdentityAttributes = function (attributes) {
    tokenId = this.ssotoken;
    if (this.isSessionValid(tokenId)) {
        if (!this.legacyEnabled) {
            this.openamDebug("getAttributesFromOpenAM: LEGACY NOT ENABLED");
            return this.getAttributesFromModernOpenAM(tokenId, attributes);      
        } else {
            this.openamDebug("getAttributesFromOpenAM: LEGACY ENABLED");
            return this.getAttributesFromLegacyOpenAM(tokenId, attributes);
        }
    } else {
        return null;
    }
};


// Pulls attributes from OpenAM using the existing session and username
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


// To do
openamConfig.prototype.getAttributesFromLegacyOpenAM = function (tokenId, attributes) {
   var response = null; 
   return response;
};

// Creates the proper OpenAM Attributes URL using the configured parameters
openamConfig.prototype.createAttributesURL = function(realm_) {
    attributes_url = this.openAMBaseURL + attributesURI;
    this.openamDebug("from inside realm_=" + realm_);
    if (realm_ !== '' & realm_ !== '/') {
        attributes_url = attributes_url.replace("/users", realm_ + "/users");
    }
    return attributes_url;
};

// Log out the user from the OpenAM
openamConfig.prototype.logout = function (goto, gotoOnFail) {
    // tokenId = this.ssotoken;
    goto = goto || getMyURL();
    gotoOnFail = gotoOnFail || getMyURL();
    
    if (!this.legacyEnabled) {
        if (this.logoutWithModernOpenAM()) {
            window.location = goto;
        } else {
            window.location = gotoOnFail;
        }
        
    } else {
        if (this.logoutWithLegacyOpenAM()) {
            window.location = goto;
        } else {
            window.location = gotoOnFail;
        }
    }
};

// Logs out a user from a modern OpenAM
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
    this.openamDebug("logout result: " + logoutSuccess);                      
    return logoutSuccess;
};

// To do
openamConfig.prototype.logoutWithLegacyOpenAM = function () {
    var logoutSuccess = false;
    tokenId = this.ssotoken;
    return logoutSuccess;
};


// Creates the proper OpenAM authentication URL using the parameters configured 
openamConfig.prototype.createLogoutURL = function(tokenId) {
    if (!this.legacyEnabled) {
        logout_url = this.openAMBaseURL + sessionsURI + "/" + tokenId + "?_action=logout";
    }
    return logout_url;
};


openamConfig.prototype.openamDebug = function (message) {
    if (this.OPENAM_DEBUG_ENABLED) {
        try {
            console.log(message);
        } catch (err) {
            alert("Debugging will be diabled, your browser does not support it");
            this.OPENAM_DEBUG_ENABLED = false;
        }
    }
};