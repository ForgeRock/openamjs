## Functions

<dl>
<dt><a href="#getMyURLDir">getMyURLDir()</a> ⇒ <code>String</code></dt>
<dd><p>Gets the path/dir of the page running the script</p>
</dd>
<dt><a href="#getMyURL">getMyURL()</a> ⇒ <code>String</code></dt>
<dd><p>Gets the URL of the page running the script</p>
</dd>
<dt><a href="#createCookie">createCookie(name, value, hours, domainName)</a></dt>
<dd><p>Create a Cookie for the domain specified in domainName</p>
</dd>
<dt><a href="#deleteCookie">deleteCookie(name, domainName)</a></dt>
<dd><p>Deletes the coookie</p>
</dd>
<dt><a href="#getCookie">getCookie(name)</a> ⇒ <code>String</code></dt>
<dd><p>Get&#39;s the value of the cookie specified</p>
</dd>
<dt><a href="#getLocal">getLocal(storageKey)</a> ⇒ <code>type</code></dt>
<dd><p>Gets the value stored in the Local session store. Using the key specified by</p>
</dd>
<dt><a href="#storeLocal">storeLocal(storageKey, data)</a></dt>
<dd><p>Stores a value &quot;data&quot; in the key &quot;storageKey&quot; in the local session storage</p>
</dd>
<dt><a href="#removeAlllocal">removeAlllocal()</a> ⇒ <code>undefined</code></dt>
<dd><p>Removes the whole local session storage</p>
</dd>
<dt><a href="#debug">debug(message)</a> ⇒ <code>undefined</code></dt>
<dd><p>Displays a message in the browser&#39;s console (if possible)</p>
</dd>
<dt><a href="#openamConfig">openamConfig(options)</a> ⇒ <code><a href="#openamConfig">openamConfig</a></code></dt>
<dd><p>OpenAM Configuration instance</p>
</dd>
<dt><a href="#authNRedirect">authNRedirect(options)</a></dt>
<dd><p>Redirects for authentication to an OpenAM using the Authentication module specified</p>
</dd>
<dt><a href="#isUserAuthenticated">isUserAuthenticated()</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if a user is authenticated</p>
</dd>
<dt><a href="#isSessionValid">isSessionValid(tokenId)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if the session that the tokenID represents is valid</p>
</dd>
<dt><a href="#authenticate">authenticate(options)</a></dt>
<dd><p>Authenticates an identity using any authentication module
 The version of the AM should support the /json/authenticate endpoint.</p>
</dd>
<dt><a href="#authenticateSimple">authenticateSimple(options)</a></dt>
<dd><p>Authenticates an identity using a one state authentication module by using 
  the values submitted either in the form containing username and password or
  by using credentials submitted in the headers object.
 The version of the AM should support the /json/authenticate endpoint.
 The realm, module or service can be specified but only modules and services 
 with one state are supported.</p>
</dd>
<dt><a href="#getIdentityAttributes">getIdentityAttributes(options)</a> ⇒ <code>JSON</code></dt>
<dd><p>Obtains the values of the profile attributes specified as a comma separated list</p>
</dd>
<dt><a href="#logout">logout([options])</a> ⇒ <code>undefined</code></dt>
<dd><p>Log out the user from the OpenAM</p>
</dd>
</dl>

<a name="getMyURLDir"></a>

## getMyURLDir() ⇒ <code>String</code>
Gets the path/dir of the page running the script

**Kind**: global function  
<a name="getMyURL"></a>

## getMyURL() ⇒ <code>String</code>
Gets the URL of the page running the script

**Kind**: global function  
<a name="createCookie"></a>

## createCookie(name, value, hours, domainName)
Create a Cookie for the domain specified in domainName

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>type</code> | Name of the cookie to be created |
| value | <code>type</code> | Value for the cookie |
| hours | <code>type</code> | Time that the cookie will exist |
| domainName | <code>type</code> | Domain in which the cookie will be created |

<a name="deleteCookie"></a>

## deleteCookie(name, domainName)
Deletes the coookie

**Kind**: global function  
**Deletecookie**:   

| Param | Type | Description |
| --- | --- | --- |
| name | <code>type</code> | Name of the cookie to be deleted |
| domainName | <code>type</code> | Domain where the cookie resides |

<a name="getCookie"></a>

## getCookie(name) ⇒ <code>String</code>
Get's the value of the cookie specified

**Kind**: global function  
**Returns**: <code>String</code> - The value of the cookie  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>type</code> | The name of the coookie whose value we want to retrieve |

<a name="getLocal"></a>

## getLocal(storageKey) ⇒ <code>type</code>
Gets the value stored in the Local session store. Using the key specified by

**Kind**: global function  
**Returns**: <code>type</code> - data The value of the value retrieved  

| Param | Type | Description |
| --- | --- | --- |
| storageKey | <code>type</code> | The key of the value to retrive |

<a name="storeLocal"></a>

## storeLocal(storageKey, data)
Stores a value "data" in the key "storageKey" in the local session storage

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| storageKey | <code>type</code> | The key to be used to store the value |
| data | <code>type</code> | The value of the data to be stored |

<a name="removeAlllocal"></a>

## removeAlllocal() ⇒ <code>undefined</code>
Removes the whole local session storage

**Kind**: global function  
<a name="debug"></a>

## debug(message) ⇒ <code>undefined</code>
Displays a message in the browser's console (if possible)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>type</code> | Message to display in the console |

<a name="openamConfig"></a>

## openamConfig(options) ⇒ <code>[openamConfig](#openamConfig)</code>
OpenAM Configuration instance

**Kind**: global function  
**Returns**: <code>[openamConfig](#openamConfig)</code> - An instance of the OpenAM Configuration.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The OpenAM Configuration JSON object. <pre>  Here an example.    {       baseurl: "http://openam1.example.com:8080/openam",       realm: "/",                                        // optional           cachetime: 3,                                      // optional        debugenabled: true                                 // optional  }    </pre> |
| options.baseurl | <code>String</code> |  | The URL where OpenAM is running, example:   "https://openam.example.com:443/openam" |
| [options.realm] | <code>String</code> | <code>The default realm for the baseurl used</code> | Name  of the realm to be used, example: "/" |
| [options.cachetime] | <code>String</code> | <code>3</code> | Time in minutes the session valid response  and attributes are cached in the session store (if possible). To disable caching  set the time to 0. Example of caching for 3 minutes: 3 |
| [options.debugenabled] | <code>String</code> | <code>false</code> | Enable debug, works for some browser,  not for all. Example: true |

<a name="authNRedirect"></a>

## authNRedirect(options)
Redirects for authentication to an OpenAM using the Authentication module specified

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The configuration object to use <pre>  The options object is a JSON object, here an example.    {     openam: myOpenAMConfigObject,     module: "DataStore",                                         // optional     service: "ldapService",                                      // optional     gotoURL: "http://ap.example.com:8880/exampleNRO02.html",     // optional     gotoOnFail: "http://ap.example.com:8880/exampleNRO02.html",  // optional     classic: false,                                              // optional     windowed: true                                               // optional  }    </pre> |
| options.openam | <code>Object</code> &#124; <code>String</code> |  | The OpenAM Configuration Object. This is  a mandatory attribute. See openam.js documentation for more information |
| [options.module] | <code>String</code> | <code>OpenAM realm default</code> | The Authentication module   to use in the left side of the login box. |
| [options.service] | <code>String</code> | <code>OpenAM realm default</code> | The Authentication service  chain to use in the left side of the login box. Notice that service takes   precedence over module. |
| [options.gotoURL] | <code>String</code> | <code>Current page</code> | The URL to go to after a  successful authentication. |
| [options.gotoOnFail] | <code>String</code> | <code>Current page</code> | The URL to go to after an authentication event has failed. |
| [options.classic] | <code>String</code> | <code>false</code> | Boolean attribute to specify if we are  using the classic UI (true) or the XUI (false). Default is to use the XUI. |
| [options.windowed] | <code>String</code> | <code>true</code> | Boolean attribute to specify if the  redirect will happen in a pop-up window or not. |

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

## authenticate(options)
Authenticates an identity using any authentication module
 The version of the AM should support the /json/authenticate endpoint.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The configuration object to use <pre>  The options object is a JSON object, here an example.    {     module: "DataStore",                                         // optional     service: "ldapService",                                      // optional     realm: "/",                                                  // optional     headers: "http://ap.example.com:8880/exampleNRO02.html",     // optional     data: objectData                                             // optional  }    </pre> |
| [options.module] | <code>String</code> | <code>OpenAM realm default</code> | The Authentication module   to use in the left side of the login box. |
| [options.service] | <code>String</code> | <code>OpenAM realm default</code> | The Authentication service  chain to use in the left side of the login box. Notice that service takes   precedence over module. |
| [options.realm] | <code>String</code> | <code>The one configured in openam.js</code> | Realm where the   authentication will take place |
| options.headers | <code>Object</code> |  | Object containing the credentials passed as headers |
| [options.data] | <code>Object</code> | <code>{}</code> | The payload to be submitted to the authentication   module |

<a name="authenticateSimple"></a>

## authenticateSimple(options)
Authenticates an identity using a one state authentication module by using 
  the values submitted either in the form containing username and password or
  by using credentials submitted in the headers object.
 The version of the AM should support the /json/authenticate endpoint.
 The realm, module or service can be specified but only modules and services 
 with one state are supported.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The configuration object to use <pre>  The options object is a JSON object, here an example.    {     module: "DataStore",                                         // optional     service: "ldapService",                                      // optional     username: 'usernameField',                                   // optional     password: 'passwordField',                                   // optional     headers: myHeaders,                                          // optional     realm: "/",                                                  // optional     gotoURL: "https://app.example.com:8080/mypath",              // optional     gotoOnFail: "https://app.example.com:8080/failed",           // optional  }    </pre> |
| [options.module] | <code>String</code> | <code>OpenAM realm default</code> | The Authentication module   to use in the left side of the login box. |
| [options.service] | <code>String</code> | <code>OpenAM realm default</code> | The Authentication service  chain to use in the left side of the login box. Notice that service takes   precedence over module. |
| [options.username] | <code>String</code> | <code>&#x27;username&#x27;</code> | The id of the field that  contains the username in the form. Either username and password or headers   must be specified. |
| [options.password] | <code>String</code> | <code>&#x27;password&#x27;</code> | The id of the field that  contains the password in the form. Either username and password or headers   must be specified. |
| options.headers | <code>Object</code> |  | Object containing the credentials passed  as headers |
| [options.realm] | <code>String</code> | <code>The one configured in openam.js</code> | Realm where the   authentication will take place |
| [options.headers] | <code>Object</code> |  | Object containing the credentials passed  as headers. Either username and password or headers must be specified. |
| [options.gotoURL] | <code>String</code> | <code>Current page</code> | The URL to go to after a  successful authentication. |
| [options.gotoOnFail] | <code>String</code> | <code>Current page</code> | The URL to go to after an authentication event has failed. |

<a name="getIdentityAttributes"></a>

## getIdentityAttributes(options) ⇒ <code>JSON</code>
Obtains the values of the profile attributes specified as a comma separated list

**Kind**: global function  
**Returns**: <code>JSON</code> - - Returns the value of the profile attributes requested from the OpenAM  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | The configuration object to get the attributes <pre>  The options object is a JSON object, here an example.    {     attributes: "cn, givenName,sn,mail",               realm: "/",                          // optional     prettyprint: true                    // optional  }    </pre> |
| options.attributes | <code>String</code> |  | Comma separated list of attributes |
| [options.realm] | <code>String</code> | <code>The one configured in openam.js</code> | Realm where   the identity resides. |
| [options.prettyprint] | <code>Boolean</code> | <code>false</code> | Return formatted with pretty print(true or false) |

<a name="logout"></a>

## logout([options]) ⇒ <code>undefined</code>
Log out the user from the OpenAM

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | The object describing the options for the logout <pre>  The options object is a JSON object, here an example.    {     gotoURL: "https://app.example.com:8080/mypath",              // optional     gotoOnFail: "https://app.example.com:8080/failed",           // optional  }    </pre> |
| [options.gotoURL] | <code>String</code> | <code>Current page</code> | The URL to go to after a   successful authentication. |
| [options.gotoOnFail] | <code>String</code> | <code>Current page</code> | The URL to go to after an     authentication event has failed. |

