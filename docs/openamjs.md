[OpenAMJS](openamjs.ms)
======

OpenAMJS is a JavaScript wrapper around the ForgeRock OpenAM REST APIs. Initially it is leveraging the Authentication and SSO API's but it can be extended to cover the whole set of APIs, inclulding Authorization, OAuth2, OIDC, UMA, STS, etc.

This wrapper is not supported nor endorsed by ForgeRock, but the community is welcome to develop it further.


### Table of contents

-   [authenticate](#authenticateoptions)
-   [authenticateSimple](#authenticatesimpleoptions)
-   [authNRedirect](#authnredirectoptions)
-   [createCookie](#createcookiename-value-hours-domainname)
-   [debug](#debugmessage--undefined)
-   [deleteCookie](#deletecookiename-domainname)
-   [getCookie](#getcookiename--string)
-   [getIdentityAttributes](#getidentityattributesoptions--json)
-   [getLocal](#getlocalstoragekey--type)
-   [getMyURL](#getmyurl--string)
-   [getMyURLDir](#getmyurldir--string)
-   [isSessionValid](#issessionvalidtokenid--boolean)
-   [isUserAuthenticated](#isuserauthenticated--boolean)
-   [logout](#logoutoptionsopt--undefined)
-   [openamConfig](#openamconfigoptions--openamconfig)
-   [removeAlllocal](#removealllocal--undefined)
-   [storeLocal](#storelocalstoragekey-data)


### Methods

#### <span class="type-signature"></span>authenticate<span class="signature">(options)</span><span class="type-signature"></span>

Authenticates an identity using any authentication module The version of the AM should support the /json/authenticate endpoint.

##### Parameters:

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>options</code></td>
<td><span class="param-type">Object</span></td>
<td>The configuration object to use
<pre><code> The options object is a JSON object, here an example.  
 {
    module: &quot;DataStore&quot;,                                         // optional
    service: &quot;ldapService&quot;,                                      // optional
    realm: &quot;/&quot;,                                                  // optional
    headers: &quot;http://ap.example.com:8880/exampleNRO02.html&quot;,     // optional
    data: objectData                                             // optional
 }   </code></pre>
<h6 id="properties">Properties</h6>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Attributes</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>module</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>OpenAM realm default</td>
<td>The Authentication module to use in the left side of the login box.</td>
</tr>
<tr class="even">
<td><code>service</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>OpenAM realm default</td>
<td>The Authentication service chain to use in the left side of the login box. Notice that service takes precedence over module.</td>
</tr>
<tr class="odd">
<td><code>realm</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>The one configured in openam.js</td>
<td>Realm where the authentication will take place</td>
</tr>
<tr class="even">
<td><code>headers</code></td>
<td><span class="param-type">Object</span></td>
<td></td>
<td></td>
<td>Object containing the credentials passed as headers</td>
</tr>
<tr class="odd">
<td><code>data</code></td>
<td><span class="param-type">Object</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>{}</td>
<td>The payload to be submitted to the authentication module</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Source:  
-   [openam.js](openam.js.html), [line 759](openam.js.html#line759)

#### <span class="type-signature"></span>authenticateSimple<span class="signature">(options)</span><span class="type-signature"></span>

Authenticates an identity using a one state authentication module by using the values submitted either in the form containing username and password or by using credentials submitted in the headers object. The version of the AM should support the /json/authenticate endpoint. The realm, module or service can be specified but only modules and services with one state are supported.

##### Parameters:

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>options</code></td>
<td><span class="param-type">Object</span></td>
<td>The configuration object to use
<pre><code> The options object is a JSON object, here an example.  
 {
    module: &quot;DataStore&quot;,                                         // optional
    service: &quot;ldapService&quot;,                                      // optional
    username: &#39;usernameField&#39;,                                   // optional
    password: &#39;passwordField&#39;,                                   // optional
    headers: myHeaders,                                          // optional
    realm: &quot;/&quot;,                                                  // optional
    gotoURL: &quot;https://app.example.com:8080/mypath&quot;,              // optional
    gotoOnFail: &quot;https://app.example.com:8080/failed&quot;,           // optional
 }   </code></pre>
<h6 id="properties-1">Properties</h6>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Attributes</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>module</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>OpenAM realm default</td>
<td>The Authentication module to use in the left side of the login box.</td>
</tr>
<tr class="even">
<td><code>service</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>OpenAM realm default</td>
<td>The Authentication service chain to use in the left side of the login box. Notice that service takes precedence over module.</td>
</tr>
<tr class="odd">
<td><code>username</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>'username'</td>
<td>The id of the field that contains the username in the form. Either username and password or headers must be specified.</td>
</tr>
<tr class="even">
<td><code>password</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>'password'</td>
<td>The id of the field that contains the password in the form. Either username and password or headers must be specified.</td>
</tr>
<tr class="odd">
<td><code>headers</code></td>
<td><span class="param-type">Object</span></td>
<td></td>
<td></td>
<td>Object containing the credentials passed as headers</td>
</tr>
<tr class="even">
<td><code>realm</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>The one configured in openam.js</td>
<td>Realm where the authentication will take place</td>
</tr>
<tr class="odd">
<td><code>headers</code></td>
<td><span class="param-type">Object</span></td>
<td>&lt;optional&gt;<br />
</td>
<td></td>
<td>Object containing the credentials passed as headers. Either username and password or headers must be specified.</td>
</tr>
<tr class="even">
<td><code>gotoURL</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>Current page</td>
<td>The URL to go to after a successful authentication.</td>
</tr>
<tr class="odd">
<td><code>gotoOnFail</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>Current page</td>
<td>The URL to go to after an authentication event has failed.</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Source:  
-   [openam.js](openam.js.html), [line 914](openam.js.html#line914)

#### <span class="type-signature"></span>authNRedirect<span class="signature">(options)</span><span class="type-signature"></span>

Redirects for authentication to an OpenAM using the Authentication module specified

##### Parameters:

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>options</code></td>
<td><span class="param-type">Object</span></td>
<td>The configuration object to use
<pre><code> The options object is a JSON object, here an example.  
 {
    openam: myOpenAMConfigObject,
    module: &quot;DataStore&quot;,                                         // optional
    service: &quot;ldapService&quot;,                                      // optional
    gotoURL: &quot;http://ap.example.com:8880/exampleNRO02.html&quot;,     // optional
    gotoOnFail: &quot;http://ap.example.com:8880/exampleNRO02.html&quot;,  // optional
    classic: false,                                              // optional
    windowed: true                                               // optional
 }   </code></pre>
<h6 id="properties-2">Properties</h6>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Attributes</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>openam</code></td>
<td><span class="param-type">Object</span> | <span class="param-type">String</span></td>
<td></td>
<td></td>
<td>The OpenAM Configuration Object. This is a mandatory attribute. See openam.js documentation for more information</td>
</tr>
<tr class="even">
<td><code>module</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>OpenAM realm default</td>
<td>The Authentication module to use in the left side of the login box.</td>
</tr>
<tr class="odd">
<td><code>service</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>OpenAM realm default</td>
<td>The Authentication service chain to use in the left side of the login box. Notice that service takes precedence over module.</td>
</tr>
<tr class="even">
<td><code>gotoURL</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>Current page</td>
<td>The URL to go to after a successful authentication.</td>
</tr>
<tr class="odd">
<td><code>gotoOnFail</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>Current page</td>
<td>The URL to go to after an authentication event has failed.</td>
</tr>
<tr class="even">
<td><code>classic</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>false</td>
<td>Boolean attribute to specify if we are using the classic UI (true) or the XUI (false). Default is to use the XUI.</td>
</tr>
<tr class="odd">
<td><code>windowed</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>true</td>
<td>Boolean attribute to specify if the redirect will happen in a pop-up window or not.</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Source:  
-   [openam.js](openam.js.html), [line 595](openam.js.html#line595)

#### <span class="type-signature"></span>createCookie<span class="signature">(name, value, hours, domainName)</span><span class="type-signature"></span>

Create a Cookie for the domain specified in domainName

##### Parameters:

| Name         | Type                                 | Description                                |
|--------------|--------------------------------------|--------------------------------------------|
| `name`       | <span class="param-type">type</span> | Name of the cookie to be created           |
| `value`      | <span class="param-type">type</span> | Value for the cookie                       |
| `hours`      | <span class="param-type">type</span> | Time that the cookie will exist            |
| `domainName` | <span class="param-type">type</span> | Domain in which the cookie will be created |

Source:  
-   [openam.js](openam.js.html), [line 80](openam.js.html#line80)

#### <span class="type-signature"></span>debug<span class="signature">(message)</span><span class="type-signature"> → {undefined}</span>

Displays a message in the browser's console (if possible)

##### Parameters:

| Name      | Type                                 | Description                       |
|-----------|--------------------------------------|-----------------------------------|
| `message` | <span class="param-type">type</span> | Message to display in the console |

Source:  
-   [openam.js](openam.js.html), [line 232](openam.js.html#line232)

##### Returns:

 Type   
<span class="param-type">undefined</span>

#### <span class="type-signature"></span>deleteCookie<span class="signature">(name, domainName)</span><span class="type-signature"></span>

Deletes the coookie

##### Parameters:

| Name         | Type                                 | Description                      |
|--------------|--------------------------------------|----------------------------------|
| `name`       | <span class="param-type">type</span> | Name of the cookie to be deleted |
| `domainName` | <span class="param-type">type</span> | Domain where the cookie resides  |

Source:  
-   [openam.js](openam.js.html), [line 109](openam.js.html#line109)

#### <span class="type-signature"></span>getCookie<span class="signature">(name)</span><span class="type-signature"> → {String}</span>

Get's the value of the cookie specified

##### Parameters:

| Name   | Type                                 | Description                                             |
|--------|--------------------------------------|---------------------------------------------------------|
| `name` | <span class="param-type">type</span> | The name of the coookie whose value we want to retrieve |

Source:  
-   [openam.js](openam.js.html), [line 114](openam.js.html#line114)

##### Returns:

The value of the cookie

 Type   
<span class="param-type">String</span>

#### <span class="type-signature"></span>getIdentityAttributes<span class="signature">(options)</span><span class="type-signature"> → {JSON}</span>

Obtains the values of the profile attributes specified as a comma separated list

##### Parameters:

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>options</code></td>
<td><span class="param-type">Object</span></td>
<td>The configuration object to get the attributes
<pre><code> The options object is a JSON object, here an example.  
 {
    attributes: &quot;cn, givenName,sn,mail&quot;,          
    realm: &quot;/&quot;,                          // optional
    prettyprint: true                    // optional
 }   </code></pre>
<h6 id="properties-3">Properties</h6>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Attributes</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>attributes</code></td>
<td><span class="param-type">String</span></td>
<td></td>
<td></td>
<td>Comma separated list of attributes</td>
</tr>
<tr class="even">
<td><code>realm</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>The one configured in openam.js</td>
<td>Realm where the identity resides.</td>
</tr>
<tr class="odd">
<td><code>prettyprint</code></td>
<td><span class="param-type">Boolean</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>false</td>
<td>Return formatted with pretty print(true or false)</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Source:  
-   [openam.js](openam.js.html), [line 1021](openam.js.html#line1021)

##### Returns:

- Returns the value of the profile attributes requested from the OpenAM

 Type   
<span class="param-type">JSON</span>

#### <span class="type-signature"></span>getLocal<span class="signature">(storageKey)</span><span class="type-signature"> → {type}</span>

Gets the value stored in the Local session store. Using the key specified by

##### Parameters:

| Name         | Type                                 | Description                     |
|--------------|--------------------------------------|---------------------------------|
| `storageKey` | <span class="param-type">type</span> | The key of the value to retrive |

Source:  
-   [openam.js](openam.js.html), [line 137](openam.js.html#line137)

##### Returns:

data The value of the value retrieved

 Type   
<span class="param-type">type</span>

#### <span class="type-signature"></span>getMyURL<span class="signature">()</span><span class="type-signature"> → {String}</span>

Gets the URL of the page running the script

Source:  
-   [openam.js](openam.js.html), [line 67](openam.js.html#line67)

##### Returns:

 Type   
<span class="param-type">String</span>

#### <span class="type-signature"></span>getMyURLDir<span class="signature">()</span><span class="type-signature"> → {String}</span>

Gets the path/dir of the page running the script

Source:  
-   [openam.js](openam.js.html), [line 55](openam.js.html#line55)

##### Returns:

 Type   
<span class="param-type">String</span>

#### <span class="type-signature"></span>isSessionValid<span class="signature">(tokenId)</span><span class="type-signature"> → {Boolean}</span>

Checks if the session that the tokenID represents is valid

##### Parameters:

| Name      | Type                                   | Description                                            |
|-----------|----------------------------------------|--------------------------------------------------------|
| `tokenId` | <span class="param-type">String</span> | The SSO Token ID (a.k.a the identifier of the session) |

Source:  
-   [openam.js](openam.js.html), [line 708](openam.js.html#line708)

##### Returns:

- True if the session is valid

 Type   
<span class="param-type">Boolean</span>

#### <span class="type-signature"></span>isUserAuthenticated<span class="signature">()</span><span class="type-signature"> → {Boolean}</span>

Checks if a user is authenticated

Source:  
-   [openam.js](openam.js.html), [line 692](openam.js.html#line692)

##### Returns:

- True if a user is authenticated

 Type   
<span class="param-type">Boolean</span>

#### <span class="type-signature"></span>logout<span class="signature">(options<span class="signature-attributes">opt</span>)</span><span class="type-signature"> → {undefined}</span>

Log out the user from the OpenAM

##### Parameters:

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Attributes</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>options</code></td>
<td><span class="param-type">Object</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>The object describing the options for the logout
<pre><code> The options object is a JSON object, here an example.  
 {
    gotoURL: &quot;https://app.example.com:8080/mypath&quot;,              // optional
    gotoOnFail: &quot;https://app.example.com:8080/failed&quot;,           // optional
 }   </code></pre>
<h6 id="properties-4">Properties</h6>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Attributes</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>gotoURL</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>Current page</td>
<td>The URL to go to after a successful authentication.</td>
</tr>
<tr class="even">
<td><code>gotoOnFail</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>Current page</td>
<td>The URL to go to after an authentication event has failed.</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Source:  
-   [openam.js](openam.js.html), [line 1121](openam.js.html#line1121)

##### Returns:

 Type   
<span class="param-type">undefined</span>

#### <span class="type-signature"></span>openamConfig<span class="signature">(options)</span><span class="type-signature"> → {[openamConfig](global.html#openamConfig)}</span>

OpenAM Configuration instance

##### Parameters:

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>options</code></td>
<td><span class="param-type">Object</span></td>
<td>The OpenAM Configuration JSON object.
<pre><code> Here an example.  
 {
      baseurl: &quot;http://openam1.example.com:8080/openam&quot;,
      realm: &quot;/&quot;,                                        // optional    
      cachetime: 3,                                      // optional 
      debugenabled: true                                 // optional
 }   </code></pre>
<h6 id="properties-5">Properties</h6>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Attributes</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>baseurl</code></td>
<td><span class="param-type">String</span></td>
<td></td>
<td></td>
<td>The URL where OpenAM is running, example: &quot;https://openam.example.com:443/openam&quot;</td>
</tr>
<tr class="even">
<td><code>realm</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>The default realm for the baseurl used</td>
<td>Name of the realm to be used, example: &quot;/&quot;</td>
</tr>
<tr class="odd">
<td><code>cachetime</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>3</td>
<td>Time in minutes the session valid response and attributes are cached in the session store (if possible). To disable caching set the time to 0. Example of caching for 3 minutes: 3</td>
</tr>
<tr class="even">
<td><code>debugenabled</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>false</td>
<td>Enable debug, works for some browser, not for all. Example: true</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Source:  
-   [openam.js](openam.js.html), [line 336](openam.js.html#line336)

##### Returns:

An instance of the OpenAM Configuration.

 Type   
<span class="param-type">[openamConfig](global.html#openamConfig)</span>

#### <span class="type-signature"></span>removeAlllocal<span class="signature">()</span><span class="type-signature"> → {undefined}</span>

Removes the whole local session storage

Source:  
-   [openam.js](openam.js.html), [line 215](openam.js.html#line215)

##### Returns:

 Type   
<span class="param-type">undefined</span>

#### <span class="type-signature"></span>storeLocal<span class="signature">(storageKey, data)</span><span class="type-signature"></span>

Stores a value "data" in the key "storageKey" in the local session storage

##### Parameters:

| Name         | Type                                 | Description                           |
|--------------|--------------------------------------|---------------------------------------|
| `storageKey` | <span class="param-type">type</span> | The key to be used to store the value |
| `data`       | <span class="param-type">type</span> | The value of the data to be stored    |

Source:  
-   [openam.js](openam.js.html), [line 178](openam.js.html#line178)




Documentation generated by [JSDoc 3.4.0](https://github.com/jsdoc3/jsdoc) and converted with [pandoc](https://github.com/jgm/pandoc)