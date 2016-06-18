# Global

## 

### Methods

#### authenticate(options)

Authenticates an identity using any authentication module
The version of the AM should support the /json/authenticate endpoint.

##### Parameters:
Name
Type
Description

`options`
Object
The configuration object to use

    
     The options object is a JSON object, here an example.  
     {
        module: "DataStore",                                         // optional
        service: "ldapService",                                      // optional
        realm: "/",                                                  // optional
        headers: "http://ap.example.com:8880/exampleNRO02.html",     // optional
        data: objectData                                             // optional
     }   
    

###### Properties
Name
Type
Attributes
Default
Description

`module`
String
<optional\>  
OpenAM realm default
The Authentication module 
to use in the left side of the login box.

`service`
String
<optional\>  
OpenAM realm default
The Authentication service
chain to use in the left side of the login box. Notice that service takes 
precedence over module.

`realm`
String
<optional\>  
The one configured in openam.js
Realm where the
authentication will take place

`headers`
Object
Object containing the credentials passed as headers

`data`
Object
<optional\>  
{}
The payload to be submitted to the authentication 
module

**Source:**

> * [openam.js][0], [line 759][1]
> 

#### authenticateSimple(options)

Authenticates an identity using a one state authentication module by using 
the values submitted either in the form containing username and password or
by using credentials submitted in the headers object.
The version of the AM should support the /json/authenticate endpoint.
The realm, module or service can be specified but only modules and services 
with one state are supported.

##### Parameters:
Name
Type
Description

`options`
Object
The configuration object to use

    
     The options object is a JSON object, here an example.  
     {
        module: "DataStore",                                         // optional
        service: "ldapService",                                      // optional
        username: 'usernameField',                                   // optional
        password: 'passwordField',                                   // optional
        headers: myHeaders,                                          // optional
        realm: "/",                                                  // optional
        gotoURL: "https://app.example.com:8080/mypath",              // optional
        gotoOnFail: "https://app.example.com:8080/failed",           // optional
     }   
    

###### Properties
Name
Type
Attributes
Default
Description

`module`
String
<optional\>  
OpenAM realm default
The Authentication module 
to use in the left side of the login box.

`service`
String
<optional\>  
OpenAM realm default
The Authentication service
chain to use in the left side of the login box. Notice that service takes 
precedence over module.

`username`
String
<optional\>  
'username'
The id of the field that
contains the username in the form. Either username and password or headers
must be specified.

`password`
String
<optional\>  
'password'
The id of the field that
contains the password in the form. Either username and password or headers
must be specified.

`headers`
Object
Object containing the credentials passed
as headers

`realm`
String
<optional\>  
The one configured in openam.js
Realm where the
authentication will take place

`headers`
Object
<optional\>  
Object containing the credentials passed
as headers. Either username and password or headers must be specified.

`gotoURL`
String
<optional\>  
Current page
The URL to go to after a
successful authentication.

`gotoOnFail`
String
<optional\>  
Current page
The URL to go to after an
authentication event has failed.

**Source:**

> * [openam.js][0], [line 914][2]
> 

#### authNRedirect(options)

Redirects for authentication to an OpenAM using the Authentication module specified

##### Parameters:
Name
Type
Description

`options`
Object
The configuration object to use

    
     The options object is a JSON object, here an example.  
     {
        openam: myOpenAMConfigObject,
        module: "DataStore",                                         // optional
        service: "ldapService",                                      // optional
        gotoURL: "http://ap.example.com:8880/exampleNRO02.html",     // optional
        gotoOnFail: "http://ap.example.com:8880/exampleNRO02.html",  // optional
        classic: false,                                              // optional
        windowed: true                                               // optional
     }   
    

###### Properties
Name
Type
Attributes
Default
Description

`openam`
Object
|
String
The OpenAM Configuration Object. This is
a mandatory attribute. See openam.js documentation for more information

`module`
String
<optional\>  
OpenAM realm default
The Authentication module 
to use in the left side of the login box.

`service`
String
<optional\>  
OpenAM realm default
The Authentication service
chain to use in the left side of the login box. Notice that service takes 
precedence over module.

`gotoURL`
String
<optional\>  
Current page
The URL to go to after a
successful authentication.

`gotoOnFail`
String
<optional\>  
Current page
The URL to go to after an
authentication event has failed.

`classic`
String
<optional\>  
false
Boolean attribute to specify if we are
using the classic UI (true) or the XUI (false). Default is to use the XUI.

`windowed`
String
<optional\>  
true
Boolean attribute to specify if the
redirect will happen in a pop-up window or not.

**Source:**

> * [openam.js][0], [line 595][3]
> 

#### createCookie(name, value, hours, domainName)

Create a Cookie for the domain specified in domainName

##### Parameters:
Name
Type
Description

`name`
type
Name of the cookie to be created

`value`
type
Value for the cookie

`hours`
type
Time that the cookie will exist

`domainName`
type
Domain in which the cookie will be created

**Source:**

> * [openam.js][0], [line 80][4]
> 

#### debug(message) → {undefined}

Displays a message in the browser's console (if possible)

##### Parameters:
Name
Type
Description

`message`
type
Message to display in the console

**Source:**

> * [openam.js][0], [line 232][5]
> 

##### Returns:

**Type
**

> undefined
> 

#### deleteCookie(name, domainName)

Deletes the coookie

##### Parameters:
Name
Type
Description

`name`
type
Name of the cookie to be deleted

`domainName`
type
Domain where the cookie resides

**Source:**

> * [openam.js][0], [line 109][6]
> 

#### getCookie(name) → {String}

Get's the value of the cookie specified

##### Parameters:
Name
Type
Description

`name`
type
The name of the coookie whose value we want to retrieve

**Source:**

> * [openam.js][0], [line 114][7]
> 

##### Returns:

The value of the cookie

**Type
**

> String
> 

#### getIdentityAttributes(options) → {JSON}

Obtains the values of the profile attributes specified as a comma separated list

##### Parameters:
Name
Type
Description

`options`
Object
The configuration object to get the attributes

    
     The options object is a JSON object, here an example.  
     {
        attributes: "cn, givenName,sn,mail",          
        realm: "/",                          // optional
        prettyprint: true                    // optional
     }   
    

###### Properties
Name
Type
Attributes
Default
Description

`attributes`
String
Comma separated list of attributes

`realm`
String
<optional\>  
The one configured in openam.js
Realm where
the identity resides.

`prettyprint`
Boolean
<optional\>  
false
Return formatted with pretty print(true or false)

**Source:**

> * [openam.js][0], [line 1021][8]
> 

##### Returns:

- Returns the value of the profile attributes requested from the OpenAM

**Type
**

> JSON
> 

#### getLocal(storageKey) → {type}

Gets the value stored in the Local session store. Using the key specified by

##### Parameters:
Name
Type
Description

`storageKey`
type
The key of the value to retrive

**Source:**

> * [openam.js][0], [line 137][9]
> 

##### Returns:

data The value of the value retrieved

**Type
**

> type
> 

#### getMyURL() → {String}

Gets the URL of the page running the script

**Source:**

> * [openam.js][0], [line 67][10]
> 

##### Returns:

**Type
**

> String
> 

#### getMyURLDir() → {String}

Gets the path/dir of the page running the script

**Source:**

> * [openam.js][0], [line 55][11]
> 

##### Returns:

**Type
**

> String
> 

#### isSessionValid(tokenId) → {Boolean}

Checks if the session that the tokenID represents is valid

##### Parameters:
Name
Type
Description

`tokenId`
String
The SSO Token ID (a.k.a the identifier of the session)

**Source:**

> * [openam.js][0], [line 708][12]
> 

##### Returns:

- True if the session is valid

**Type
**

> Boolean
> 

#### isUserAuthenticated() → {Boolean}

Checks if a user is authenticated

**Source:**

> * [openam.js][0], [line 692][13]
> 

##### Returns:

- True if a user is authenticated

**Type
**

> Boolean
> 

#### logout(optionsopt) → {undefined}

Log out the user from the OpenAM

##### Parameters:
Name
Type
Attributes
Description

`options`
Object
<optional\>  
The object describing the options for the logout

    
     The options object is a JSON object, here an example.  
     {
        gotoURL: "https://app.example.com:8080/mypath",              // optional
        gotoOnFail: "https://app.example.com:8080/failed",           // optional
     }   
    

###### Properties
Name
Type
Attributes
Default
Description

`gotoURL`
String
<optional\>  
Current page
The URL to go to after a
successful authentication.

`gotoOnFail`
String
<optional\>  
Current page
The URL to go to after an
authentication event has failed.

**Source:**

> * [openam.js][0], [line 1121][14]
> 

##### Returns:

**Type
**

> undefined
> 

#### openamConfig(options) → {[openamConfig][15]}

OpenAM Configuration instance

##### Parameters:
Name
Type
Description

`options`
Object
The OpenAM Configuration JSON object.

    
     Here an example.  
     {
          baseurl: "http://openam1.example.com:8080/openam",
          realm: "/",                                        // optional    
          cachetime: 3,                                      // optional 
          debugenabled: true                                 // optional
     }   
    

###### Properties
Name
Type
Attributes
Default
Description

`baseurl`
String
The URL where OpenAM is running, example: 
"https://openam.example.com:443/openam"

`realm`
String
<optional\>  
The default realm for the baseurl used
Name
of the realm to be used, example: "/"

`cachetime`
String
<optional\>  
3
Time in minutes the session valid response
and attributes are cached in the session store (if possible). To disable caching
set the time to 0\. Example of caching for 3 minutes: 3

`debugenabled`
String
<optional\>  
false
Enable debug, works for some browser,
not for all. Example: true

**Source:**

> * [openam.js][0], [line 336][16]
> 

##### Returns:

An instance of the OpenAM Configuration.

**Type
**

> [openamConfig][15]
> 

#### removeAlllocal() → {undefined}

Removes the whole local session storage

**Source:**

> * [openam.js][0], [line 215][17]
> 

##### Returns:

**Type
**

> undefined
> 

#### storeLocal(storageKey, data)

Stores a value "data" in the key "storageKey" in the local session storage

##### Parameters:
Name
Type
Description

`storageKey`
type
The key to be used to store the value

`data`
type
The value of the data to be stored

**Source:**

> * [openam.js][0], [line 178][18]
> 

## [Home][19]

### Global

* [authenticate][20]
* [authenticateSimple][21]
* [authNRedirect][22]
* [createCookie][23]
* [debug][24]
* [deleteCookie][25]
* [getCookie][26]
* [getIdentityAttributes][27]
* [getLocal][28]
* [getMyURL][29]
* [getMyURLDir][30]
* [isSessionValid][31]
* [isUserAuthenticated][32]
* [logout][33]
* [openamConfig][15]
* [removeAlllocal][34]
* [storeLocal][35]
  

Documentation generated by [JSDoc 3.4.0][36] on Sat Jun 18 2016 15:41:02 GMT+0200 (CEST)


[0]: openam.js.html
[1]: openam.js.html#line759
[2]: openam.js.html#line914
[3]: openam.js.html#line595
[4]: openam.js.html#line80
[5]: openam.js.html#line232
[6]: openam.js.html#line109
[7]: openam.js.html#line114
[8]: openam.js.html#line1021
[9]: openam.js.html#line137
[10]: openam.js.html#line67
[11]: openam.js.html#line55
[12]: openam.js.html#line708
[13]: openam.js.html#line692
[14]: openam.js.html#line1121
[15]: global.html#openamConfig
[16]: openam.js.html#line336
[17]: openam.js.html#line215
[18]: openam.js.html#line178
[19]: index.html
[20]: global.html#authenticate
[21]: global.html#authenticateSimple
[22]: global.html#authNRedirect
[23]: global.html#createCookie
[24]: global.html#debug
[25]: global.html#deleteCookie
[26]: global.html#getCookie
[27]: global.html#getIdentityAttributes
[28]: global.html#getLocal
[29]: global.html#getMyURL
[30]: global.html#getMyURLDir
[31]: global.html#isSessionValid
[32]: global.html#isUserAuthenticated
[33]: global.html#logout
[34]: global.html#removeAlllocal
[35]: global.html#storeLocal
[36]: https://github.com/jsdoc3/jsdoc