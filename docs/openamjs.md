## Functions

<dl>
<dt><a href="#openamConfig">openamConfig(openAMBaseURL, realm, cacheEnabled, openamDebugEnabled, legacyEnabled)</a> ⇒ <code><a href="#openamConfig">openamConfig</a></code></dt>
<dd><p>OpenAM Configuration instance</p>
</dd>
<dt><a href="#getServerinfo">getServerinfo()</a> ⇒ <code>JSON</code></dt>
<dd><p>getServerinfo</p>
</dd>
<dt><a href="#createServerinfoURL">createServerinfoURL(realm)</a> ⇒ <code>String</code></dt>
<dd><p>Creates the proper OpenAM URL for the serverinfo endpoint using the configured parameters</p>
</dd>
<dt><a href="#getLocal">getLocal(storageKey)</a> ⇒ <code>JSON</code></dt>
<dd><p>Check the local session storage</p>
</dd>
<dt><a href="#storeLocal">storeLocal(storageKey, data)</a></dt>
<dd><p>Stores a value &quot;data&quot; in the key &quot;storageKey&quot; in the local session storage</p>
</dd>
<dt><a href="#removeLocal">removeLocal(storageKey)</a></dt>
<dd><p>Removes the specified key from the session storage</p>
</dd>
<dt><a href="#removeAllLocal">removeAllLocal()</a></dt>
<dd><p>Removes all the key-value pairs stored by this library in the local session storage</p>
</dd>
<dt><a href="#authNRedirectModule">authNRedirectModule(module, realm, gotoURL, gotoOnFail, classic)</a></dt>
<dd><p>Redirects for authentication to an OpenAM using the Authentication module specified</p>
</dd>
<dt><a href="#authNRedirectModuleWdw">authNRedirectModuleWdw(module, realm, gotoURL, classic)</a></dt>
<dd><p>Redirects for authentication to an OpenAM using the Authentication module specified using a window instead of redirecting to a new page</p>
</dd>
<dt><a href="#authNRedirectService">authNRedirectService(service, realm, gotoURL, gotoOnFail, classic)</a></dt>
<dd><p>Redirects for authentication to an OpenAM using the Authentication service chain specified</p>
</dd>
<dt><a href="#authNRedirectServiceWdw">authNRedirectServiceWdw(service, realm, gotoURL, classic)</a></dt>
<dd><p>Redirects for authentication to an OpenAM using the Authentication service chain specified using a window instead of a new page</p>
</dd>
<dt><a href="#isUserAuthenticated">isUserAuthenticated()</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if a user is authenticated</p>
</dd>
<dt><a href="#isSessionValid">isSessionValid(tokenId)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if the session that the tokenID represents is valid</p>
</dd>
<dt><a href="#authenticate">authenticate(username, password, realm, module, service)</a> ⇒ <code>String</code> | <code>null</code></dt>
<dd><p>Authenticates an identity using username/password. The realm, module or service can be specified
 but only modules and services with username/password are supported at the moment</p>
</dd>
<dt><a href="#authenticateWithModernOpenAM">authenticateWithModernOpenAM(username, password, realm, module, service)</a> ⇒ <code>String</code> | <code>null</code></dt>
<dd><p>Authenticates an identity using username/password.
 The version of the AM should support the /json/authenticate endpoint.
 The realm, module or service can be specified but only modules and services 
 with username/password are supported at the moment</p>
</dd>
<dt><a href="#authenticateWithLegacyOpenAM">authenticateWithLegacyOpenAM(username, password, realm, module, service)</a> ⇒ <code>String</code> | <code>null</code></dt>
<dd><p>Authenticates an identity using username/password.
The realm, module or service can be specified but only modules and services 
with username/password are supported at the moment. 
NOTE: This function is not implemented!</p>
</dd>
<dt><a href="#createAuthenticationURL">createAuthenticationURL(realm, module, service)</a> ⇒ <code>string</code></dt>
<dd><p>Constructs the URL to be used for the authentication based on the real and module or service provided</p>
</dd>
</dl>

<a name="openamConfig"></a>

## openamConfig(openAMBaseURL, realm, cacheEnabled, openamDebugEnabled, legacyEnabled) ⇒ <code>[openamConfig](#openamConfig)</code>
OpenAM Configuration instance

**Kind**: global function  
**Returns**: <code>[openamConfig](#openamConfig)</code> - An instance of the OpenAM Configuration.  

| Param | Type | Description |
| --- | --- | --- |
| openAMBaseURL | <code>String</code> | The URL where OpenAM is running, example: "https://openam.example.com:443/openam" |
| realm | <code>String</code> | Name of the realm to be used, example: "/" |
| cacheEnabled | <code>Boolean</code> &#124; <code>undefined</code> | IF enabled, session valid status and attributs will be cached in sessionStorage, if possible. Example: false |
| openamDebugEnabled | <code>Boolean</code> &#124; <code>undefined</code> | Enable debug, works for some browser, not for all. Example: true |
| legacyEnabled | <code>Boolean</code> &#124; <code>undefined</code> | Is the OpenAM you are connecting to using the old APIs, then it is legacy. Example: false |


* [openamConfig(openAMBaseURL, realm, cacheEnabled, openamDebugEnabled, legacyEnabled)](#openamConfig) ⇒ <code>[openamConfig](#openamConfig)</code>
    * [.getIdentityAttributes(attributes)](#openamConfig+getIdentityAttributes) ⇒ <code>JSON</code>
    * [.getAttributesFromModernOpenAM(tokenId, attributes)](#openamConfig+getAttributesFromModernOpenAM) ⇒ <code>JSON</code>
    * [.getAttributesFromLegacyOpenAM(tokenId, attributes)](#openamConfig+getAttributesFromLegacyOpenAM) ⇒ <code>JSON</code>
    * [.createAttributesURL(realm)](#openamConfig+createAttributesURL) ⇒ <code>String</code>
    * [.logout(gotoURL, gotoOnFail)](#openamConfig+logout) ⇒ <code>undefined</code>
    * [.logoutWithModernOpenAM()](#openamConfig+logoutWithModernOpenAM) ⇒ <code>Boolean</code>
    * [.logoutWithLegacyOpenAM()](#openamConfig+logoutWithLegacyOpenAM) ⇒ <code>Boolean</code>
    * [.createLogoutURL(tokenId)](#openamConfig+createLogoutURL) ⇒ <code>String</code>
    * [.openamDebug(message)](#openamConfig+openamDebug) ⇒ <code>undefined</code>

<a name="openamConfig+getIdentityAttributes"></a>

### openamConfig.getIdentityAttributes(attributes) ⇒ <code>JSON</code>
Obtains the values of the profile attributes specified as a comma separated list

**Kind**: instance method of <code>[openamConfig](#openamConfig)</code>  
**Returns**: <code>JSON</code> - - Returns the value of the profile attributes requested from the OpenAM  

| Param | Type | Description |
| --- | --- | --- |
| attributes | <code>type</code> | Comma separated list of attributes |

<a name="openamConfig+getAttributesFromModernOpenAM"></a>

### openamConfig.getAttributesFromModernOpenAM(tokenId, attributes) ⇒ <code>JSON</code>
Obtains the values of the profile attributes specified as a comma separated list for an OpenAM version 12 or later

**Kind**: instance method of <code>[openamConfig](#openamConfig)</code>  
**Returns**: <code>JSON</code> - - Returns the value of the profile attributes requested from the OpenAM  

| Param | Type | Description |
| --- | --- | --- |
| tokenId | <code>String</code> | The token id that represents the OpenAM session |
| attributes | <code>String</code> | Comma separated list of attributes |

<a name="openamConfig+getAttributesFromLegacyOpenAM"></a>

### openamConfig.getAttributesFromLegacyOpenAM(tokenId, attributes) ⇒ <code>JSON</code>
Obtains the values of the profile attributes specified as a comma separated list for an OpenAM version 11 or older
NOTE: This function is not yet implemented!

**Kind**: instance method of <code>[openamConfig](#openamConfig)</code>  
**Returns**: <code>JSON</code> - - Returns the value of the profile attributes requested from the OpenAM  

| Param | Type | Description |
| --- | --- | --- |
| tokenId | <code>String</code> | The token id that represents the OpenAM session |
| attributes | <code>String</code> | Comma separated list of attributes |

<a name="openamConfig+createAttributesURL"></a>

### openamConfig.createAttributesURL(realm) ⇒ <code>String</code>
Constructs the proper OpenAM Attributes URL using the configured realm

**Kind**: instance method of <code>[openamConfig](#openamConfig)</code>  
**Returns**: <code>String</code> - - Returns the URL of the attributes end point of the OpenAM  

| Param | Type | Description |
| --- | --- | --- |
| realm | <code>String</code> &#124; <code>undefined</code> | Name of the realm to be used (Default is the one configured in openamConfig) |

<a name="openamConfig+logout"></a>

### openamConfig.logout(gotoURL, gotoOnFail) ⇒ <code>undefined</code>
Log out the user from the OpenAM

**Kind**: instance method of <code>[openamConfig](#openamConfig)</code>  

| Param | Type | Description |
| --- | --- | --- |
| gotoURL | <code>String</code> | The URL to go to after a successful logout. Default is to return to the curent page |
| gotoOnFail | <code>String</code> | The URL to go to in case the logout failed. Default is to return to the curent page |

<a name="openamConfig+logoutWithModernOpenAM"></a>

### openamConfig.logoutWithModernOpenAM() ⇒ <code>Boolean</code>
Logs out a user from a modern OpenAM

**Kind**: instance method of <code>[openamConfig](#openamConfig)</code>  
**Returns**: <code>Boolean</code> - - Returns True if the logout is successful  
<a name="openamConfig+logoutWithLegacyOpenAM"></a>

### openamConfig.logoutWithLegacyOpenAM() ⇒ <code>Boolean</code>
Logs out a user from a legacy OpenAM
NOTE: This function is not implemented yet

**Kind**: instance method of <code>[openamConfig](#openamConfig)</code>  
**Returns**: <code>Boolean</code> - - Returns True if the logout is successful  
<a name="openamConfig+createLogoutURL"></a>

### openamConfig.createLogoutURL(tokenId) ⇒ <code>String</code>
**Kind**: instance method of <code>[openamConfig](#openamConfig)</code>  
**Returns**: <code>String</code> - - Returns The URL of the logout endpoint for a modern OpenAM  

| Param | Type | Description |
| --- | --- | --- |
| tokenId | <code>String</code> | The token id that represents the OpenAM session |

<a name="openamConfig+openamDebug"></a>

### openamConfig.openamDebug(message) ⇒ <code>undefined</code>
Displays a message in the browser's console (if possible)

**Kind**: instance method of <code>[openamConfig](#openamConfig)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>type</code> | Message to display in the console |

<a name="getServerinfo"></a>

## getServerinfo() ⇒ <code>JSON</code>
getServerinfo

**Kind**: global function  
**Returns**: <code>JSON</code> - The value provided by the OpeAM serverinfo endpoint  
<a name="createServerinfoURL"></a>

## createServerinfoURL(realm) ⇒ <code>String</code>
Creates the proper OpenAM URL for the serverinfo endpoint using the configured parameters

**Kind**: global function  
**Returns**: <code>String</code> - The URL of the serverinfo endpoint for the configured OpenAM in the realm provided  

| Param | Type | Description |
| --- | --- | --- |
| realm | <code>String</code> | Name of the realm to be used, example: "/" |

<a name="getLocal"></a>

## getLocal(storageKey) ⇒ <code>JSON</code>
Check the local session storage

**Kind**: global function  
**Returns**: <code>JSON</code> - The value of the attribute requested  

| Param | Type |
| --- | --- |
| storageKey | <code>String</code> | 

<a name="storeLocal"></a>

## storeLocal(storageKey, data)
Stores a value "data" in the key "storageKey" in the local session storage

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| storageKey | <code>type</code> | The key to be used to store the value |
| data | <code>type</code> | The value of the data to be stored |

<a name="removeLocal"></a>

## removeLocal(storageKey)
Removes the specified key from the session storage

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| storageKey | <code>type</code> | The key-value pair to be removed |

<a name="removeAllLocal"></a>

## removeAllLocal()
Removes all the key-value pairs stored by this library in the local session storage

**Kind**: global function  
<a name="authNRedirectModule"></a>

## authNRedirectModule(module, realm, gotoURL, gotoOnFail, classic)
Redirects for authentication to an OpenAM using the Authentication module specified

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>String</code> | Name of the module to be used for the authentication |
| realm | <code>String</code> &#124; <code>undefined</code> | Name of the realm to be used (Default is the one configured in openamConfig) |
| gotoURL | <code>String</code> &#124; <code>undefined</code> | URL to go after the authentication is successful. Default is to go back to the URL that invoked the function |
| gotoOnFail | <code>String</code> &#124; <code>undefined</code> | URL to go if the authentication fails. Default is to go back to the URL that invoked the function |
| classic | <code>Boolean</code> &#124; <code>undefined</code> | Use the Classic Login UI (true) or the XUI (false). Default is to use the XUI |

<a name="authNRedirectModuleWdw"></a>

## authNRedirectModuleWdw(module, realm, gotoURL, classic)
Redirects for authentication to an OpenAM using the Authentication module specified using a window instead of redirecting to a new page

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>String</code> | Name of the module to be used for the authentication |
| realm | <code>String</code> &#124; <code>undefined</code> | Name of the realm to be used (Default is the one configured in openamConfig) |
| gotoURL | <code>String</code> &#124; <code>undefined</code> | URL to go after the authentication is successful. Default is to go back to the URL that invoked the function |
| classic | <code>Boolean</code> &#124; <code>undefined</code> | Use the Classic Login UI (true) or the XUI (false). Default is to use the XUI |

<a name="authNRedirectService"></a>

## authNRedirectService(service, realm, gotoURL, gotoOnFail, classic)
Redirects for authentication to an OpenAM using the Authentication service chain specified

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>String</code> | Name of the service chain to be used for the authentication |
| realm | <code>String</code> &#124; <code>undefined</code> | Name of the realm to be used (Default is the one configured in openamConfig) |
| gotoURL | <code>String</code> &#124; <code>undefined</code> | URL to go after the authentication is successful. Default is to go back to the URL that invoked the function |
| gotoOnFail | <code>String</code> &#124; <code>undefined</code> | URL to go if the authentication fails. Default is to go back to the URL that invoked the function |
| classic | <code>Boolean</code> &#124; <code>undefined</code> | Use the Classic Login UI (true) or the XUI (false). Default is to use the XUI |

<a name="authNRedirectServiceWdw"></a>

## authNRedirectServiceWdw(service, realm, gotoURL, classic)
Redirects for authentication to an OpenAM using the Authentication service chain specified using a window instead of a new page

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>String</code> | Name of the service chain to be used for the authentication |
| realm | <code>String</code> &#124; <code>undefined</code> | Name of the realm to be used (Default is the one configured in openamConfig) |
| gotoURL | <code>String</code> &#124; <code>undefined</code> | URL to go after the authentication is successful. Default is to go back to the URL that invoked the function |
| classic | <code>Boolean</code> &#124; <code>undefined</code> | Use the Classic Login UI (true) or the XUI (false). Default is to use the XUI |

<a name="isUserAuthenticated"></a>

## isUserAuthenticated() ⇒ <code>Boolean</code>
Checks if a user is authenticated

**Kind**: global function  
**Returns**: <code>Boolean</code> - - True if a user is authenticated  
<a name="isSessionValid"></a>

## isSessionValid(tokenId) ⇒ <code>Boolean</code>
Checks if the session that the tokenID represents is valid

**Kind**: global function  
**Returns**: <code>Boolean</code> - - True if the session is valid  

| Param | Type | Description |
| --- | --- | --- |
| tokenId | <code>String</code> | The SSO Token ID (a.k.a the identifier of the session) |

<a name="authenticate"></a>

## authenticate(username, password, realm, module, service) ⇒ <code>String</code> &#124; <code>null</code>
Authenticates an identity using username/password. The realm, module or service can be specified
 but only modules and services with username/password are supported at the moment

**Kind**: global function  
**Returns**: <code>String</code> &#124; <code>null</code> - Returns the token id of the session if the authentication is successful, otherwise it returns null  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | Name of the user(or identity) to be authenticated |
| password | <code>String</code> | The Password to be used to authenticate the user: username |
| realm | <code>String</code> &#124; <code>undefined</code> | The realm to be used during the authentication. Default is the realm used in openamConfig |
| module | <code>String</code> &#124; <code>undefined</code> | AuthN module to be used. Default is the default AuthN module configured in the OpenAM for the realm |
| service | <code>String</code> &#124; <code>undefined</code> | Name of the service chain to be used for the authentication |

<a name="authenticateWithModernOpenAM"></a>

## authenticateWithModernOpenAM(username, password, realm, module, service) ⇒ <code>String</code> &#124; <code>null</code>
Authenticates an identity using username/password.
 The version of the AM should support the /json/authenticate endpoint.
 The realm, module or service can be specified but only modules and services 
 with username/password are supported at the moment

**Kind**: global function  
**Returns**: <code>String</code> &#124; <code>null</code> - Returns the token id of the session if the authentication is successful, otherwise it returns null  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | Name of the user(or identity) to be authenticated |
| password | <code>String</code> | The Password to be used to authenticate the user: username |
| realm | <code>String</code> &#124; <code>undefined</code> | The realm to be used during the authentication. Default is the realm used in openamConfig |
| module | <code>String</code> &#124; <code>undefined</code> | AuthN module to be used. Default is the default AuthN module configured in the OpenAM for the realm |
| service | <code>String</code> &#124; <code>undefined</code> | Name of the service chain to be used for the authentication |

<a name="authenticateWithLegacyOpenAM"></a>

## authenticateWithLegacyOpenAM(username, password, realm, module, service) ⇒ <code>String</code> &#124; <code>null</code>
Authenticates an identity using username/password.
The realm, module or service can be specified but only modules and services 
with username/password are supported at the moment. 
NOTE: This function is not implemented!

**Kind**: global function  
**Returns**: <code>String</code> &#124; <code>null</code> - Returns the token id of the session if the authentication is successful, otherwise it returns null  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | Name of the user(or identity) to be authenticated |
| password | <code>String</code> | The Password to be used to authenticate the user: username |
| realm | <code>String</code> &#124; <code>undefined</code> | The realm to be used during the authentication. Default is the realm used in openamConfig |
| module | <code>String</code> &#124; <code>undefined</code> | AuthN module to be used. Default is the default AuthN module configured in the OpenAM for the realm |
| service | <code>String</code> &#124; <code>undefined</code> | Name of the service chain to be used for the authentication |

<a name="createAuthenticationURL"></a>

## createAuthenticationURL(realm, module, service) ⇒ <code>string</code>
Constructs the URL to be used for the authentication based on the real and module or service provided

**Kind**: global function  
**Returns**: <code>string</code> - - Returns the URL of the authentication endpoint for the realm and module or service provided  

| Param | Type | Description |
| --- | --- | --- |
| realm | <code>String</code> &#124; <code>undefined</code> | The realm to be used during the authentication. Default is the realm used in openamConfig |
| module | <code>String</code> &#124; <code>undefined</code> | AuthN module to be used. Default is the default AuthN module configured in the OpenAM for the realm |
| service | <code>String</code> &#124; <code>undefined</code> | Name of the service chain to be used for the authentication |

