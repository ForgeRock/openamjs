## Functions

<dl>
<dt><a href="#printWelcomeAndLogout">printWelcomeAndLogout(element, options)</a> ⇒ <code>undefined</code></dt>
<dd><p>Prints the Welcome message for the &quot;identity&quot; and the logout button in a div</p>
</dd>
<dt><a href="#authenticateUser">authenticateUser(options)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Performs the authentication of the user using the form &quot;options.formId&quot; passed
 in the object options</p>
</dd>
<dt><a href="#formShow">formShow(show)</a></dt>
<dd><p>Shows or hides the loginBox, i.e. it gives the slide down and up effect</p>
</dd>
<dt><a href="#addSocial">addSocial(options)</a> ⇒ <code>String</code></dt>
<dd><p>Add the social modules buttons represented by the comma separated list</p>
</dd>
<dt><a href="#printLoginBox">printLoginBox(element, options)</a></dt>
<dd><p>Renders a login button that can be clicked to create a login box. The login box
may contain the interactive login credentials area plus a social login buttons area
depending on the configuration of the &quot;options&quot; object and the configuration
of the OpenAM being used.</p>
</dd>
<dt><a href="#printLogoutButton">printLogoutButton(element, options)</a></dt>
<dd><p>Renders a logout button that will invoke the logout service when clicked</p>
</dd>
<dt><a href="#printLoginButton">printLoginButton(element, options)</a></dt>
<dd><p>Renders a login button that redirects to the module specified as a parameter</p>
</dd>
</dl>

<a name="printWelcomeAndLogout"></a>

## printWelcomeAndLogout(element, options) ⇒ <code>undefined</code>
Prints the Welcome message for the "identity" and the logout button in a div

**Kind**: global function  
**Returns**: <code>undefined</code> - Does not return anything. It overrides the element DOM  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>String</code> |  |
| options | <code>Object</code> | The object containing the configuration for this function <pre> Example: {     openam: myOpenAM,     message: "Welcome Mr. " } |
| options.openam | <code>Object</code> | The OpenAM Configuration Object. This is  a mandatory attribute. See openam.js documentation for more information |
| options.message | <code>String</code> | The message to be shown as Welcome to the   user/identity |

<a name="authenticateUser"></a>

## authenticateUser(options) ⇒ <code>Boolean</code>
Performs the authentication of the user using the form "options.formId" passed
 in the object options

**Kind**: global function  
**Returns**: <code>Boolean</code> - false  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options to be used for the authentication process |

<a name="formShow"></a>

## formShow(show)
Shows or hides the loginBox, i.e. it gives the slide down and up effect

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| show | <code>Boolean</code> | True if the loginbox wants to be shown |

<a name="addSocial"></a>

## addSocial(options) ⇒ <code>String</code>
Add the social modules buttons represented by the comma separated list

**Kind**: global function  
**Returns**: <code>String</code> - Returns a table with the buttons  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | An object containing the options to use. This could be the OOTB  socialImplementations that come when querying the OpenAM serverinfo URL or a   manually described object that should be called overrideSocialImplementations. |

<a name="printLoginBox"></a>

## printLoginBox(element, options)
Renders a login button that can be clicked to create a login box. The login box
may contain the interactive login credentials area plus a social login buttons area
depending on the configuration of the "options" object and the configuration
of the OpenAM being used.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>HTMLElement</code> &#124; <code>String</code> |  | the DOM element object where the button will be rendered |
| options | <code>Object</code> &#124; <code>String</code> |  | The configuration object to use. <pre>  The options object is a JSON object, here an example.    {     openam: myOpenAMConfigObject,     module: "DataStore",                                         // optional     service: "ldapService",                                      // optional     width: "600px",                                              // optional     height: "300px",                                             // optional     formId: "amLoginForm",                                       // optional     gotoURL: "http://ap.example.com:8880/exampleNRO02.html",     // optional     social: true,                                                // optional     overrideSocialImplementations: mySocialImplementationsObject  // optional  }     </pre> |
| options.openam | <code>Object</code> &#124; <code>String</code> |  | The OpenAM Configuration Object. This is  a mandatory attribute. See openam.js documentation for more information |
| [options.module] | <code>String</code> | <code>OpenAM realm default</code> | The Authentication module   to use in the left side of the login box. |
| [options.service] | <code>String</code> | <code>OpenAM realm default</code> | The Authentication service  chain to use in the left side of the login box. Notice that service takes   precedence over module. |
| [options.width] | <code>String</code> | <code>270px or as defined in openamUtils.css</code> | The   Login Box width in px. |
| [options.height] | <code>String</code> | <code>620px or as defined in openamUtils.css</code> | The   Login Box height in px. |
| [options.formId] | <code>String</code> | <code>amLoginForm</code> | The id of the form to be used to  capture the credentials. It is recommended not to change it, unless there is  a form Id colision in your HTML code. |
| [options.gotoURL] | <code>String</code> | <code>Current page</code> | The URL to go to after a  successful authentication. |
| [options.social] | <code>String</code> | <code>true</code> | Boolean attribute to turn off the display  of the social authentication buttons, if the OpenAM has been configured to  show the social implementations in the login page. |
| [options.overrideSocialImplementations] | <code>Array.&lt;Object&gt;</code> |  | This array of objects  will override the socialImplementations array that is returned from the  OpenAM serverinfo URL.   <pre>  Here an example of the overrideSocialImplementations object:  [      {          "authnChain": "GoogleSocialAuthenticationService",          "displayName": "Google",          "iconPath": "images/google.png",          "imgStyle": "display: block; max-width: 80% !important;",          "valid": true,          "buttonText": ''      },      {                     "authnChain": "MicrosoftSocialAuthenticationService",              "displayName": "Microsoft",              "iconPath": "images/msn.png",              "imgStyle": "display: block; max-width: 80% !important;",              "valid": true,              "buttonText": ''      }  ]  </pre> |
| options.overrideSocialImplementations[].authnChain | <code>String</code> |  | The name    of the authentication chain that implements the specified social authentication |
| options.overrideSocialImplementations[].displayName | <code>String</code> |  | The name    to be displayed for the specified social authentication |
| options.overrideSocialImplementations[].iconPath | <code>String</code> |  | The location    of the icon to be displayed within the button for the specified social authentication |
| [options.overrideSocialImplementations[].imgStyle] | <code>String</code> | <code>&quot;float: left;&quot;</code> | The CSS style   to be applied to the image referred in the iconPath attribute |
| [options.overrideSocialImplementations[].valid] | <code>Boolean</code> | <code>true</code> | Flag to    specify if the socialImplementation object should be used or not |
| [options.overrideSocialImplementations[].buttonText] | <code>String</code> | <code>Sign in with &lt;displayName&gt;</code> | The text    to be written within the button for the specified social authentication |

<a name="printLogoutButton"></a>

## printLogoutButton(element, options)
Renders a logout button that will invoke the logout service when clicked

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> &#124; <code>String</code> | the DOM element object where the button   will be rendered |
| options | <code>Object</code> | The configuration object to use <pre>  The options object is a JSON object, here an example.    {     openam: myOpenAMConfigObject  }     </pre> |
| options.openam | <code>Object</code> &#124; <code>String</code> | The OpenAM Configuration Object. This is  a mandatory attribute. See openam.js documentation for more information |

<a name="printLoginButton"></a>

## printLoginButton(element, options)
Renders a login button that redirects to the module specified as a parameter

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>HTMLElement</code> &#124; <code>String</code> |  | the DOM element object where the button will be rendered |
| options | <code>Object</code> |  | The configuration object to use <pre>  The options object is a JSON object, here an example.    {     openam: myOpenAMConfigObject,     module: "DataStore",                                         // optional     service: "ldapService",                                      // optional     gotoURL: "http://ap.example.com:8880/exampleNRO02.html",     // optional     gotoOnFail: "http://ap.example.com:8880/exampleNRO02.html",  // optional     classic: false                                               // optional     windowed: true,                                              // optional  }    </pre> |
| options.openam | <code>Object</code> &#124; <code>String</code> |  | The OpenAM Configuration Object. This is  a mandatory attribute. See openam.js documentation for more information |
| [options.module] | <code>String</code> | <code>OpenAM realm default</code> | The Authentication module   to use in the left side of the login box. |
| [options.service] | <code>String</code> | <code>OpenAM realm default</code> | The Authentication service  chain to use in the left side of the login box. Notice that service takes   precedence over module. |
| [options.gotoURL] | <code>String</code> | <code>Current page</code> | The URL to go to after a  successful authentication. |
| [options.gotoOnFail] | <code>String</code> | <code>Current page</code> | The URL to go to after an authentication event has failed. |
| [options.classic] | <code>String</code> | <code>false</code> | Boolean attribute to specify if we are  using the classic UI or the XUI. Default is to use the XUI. |
| [options.windowed] | <code>String</code> | <code>true</code> | Boolean attribute to specify if the  redirect will happen in a pop-up window or not. |

