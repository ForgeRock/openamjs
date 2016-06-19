[OpenAMUtils.js Documentation](openamUtils.md)
======

openamUtils.js is another wrapper to render configurable Login Buttons and Login Boxes using OpenAM. It requires openam.js and the css style contained in this repository, of course you can adjust the css to your needs but it should work nicely out of the box. This wrapper does not need JQuery, but of course you can combine it with any other JS UI framework.


### Table of Contents

-   [addSocial](#addsocialoptions--string)
-   [authenticateUser](#authenticateuseroptions--boolean)
-   [formShow](#formshowshow)
-   [printLoginBox](#printloginboxelement-options)
-   [printLoginButton](#printloginbuttonelement-options)
-   [printLogoutButton](#printlogoutbuttonelement-options)
-   [printWelcomeAndLogout](#printwelcomeandlogoutelement-options--undefined)

### Methods

#### <span class="type-signature"></span>addSocial<span class="signature">(options)</span><span class="type-signature"> → {String}</span>

Add the social modules buttons represented by the comma separated list

##### Parameters:

| Name      | Type                                   | Description                                                                                                                                                                                                                 |
|-----------|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `options` | <span class="param-type">Object</span> | An object containing the options to use. This could be the OOTB socialImplementations that come when querying the OpenAM serverinfo URL or a manually described object that should be called overrideSocialImplementations. |

Source:  
-   [openamUtils.js](openamUtils.js.html), [line 162](openamUtils.js.html#line162)

##### Returns:

Returns a table with the buttons

 Type   
<span class="param-type">String</span>

#### <span class="type-signature"></span>authenticateUser<span class="signature">(options)</span><span class="type-signature"> → {Boolean}</span>

Performs the authentication of the user using the form "options.formId" passed in the object options

##### Parameters:

| Name      | Type                                   | Description                                           |
|-----------|----------------------------------------|-------------------------------------------------------|
| `options` | <span class="param-type">Object</span> | The options to be used for the authentication process |

Source:  
-   [openamUtils.js](openamUtils.js.html), [line 76](openamUtils.js.html#line76)

##### Returns:

false

 Type   
<span class="param-type">Boolean</span>

#### <span class="type-signature"></span>formShow<span class="signature">(show)</span><span class="type-signature"></span>

Shows or hides the loginBox, i.e. it gives the slide down and up effect

##### Parameters:

| Name   | Type                                    | Description                            |
|--------|-----------------------------------------|----------------------------------------|
| `show` | <span class="param-type">Boolean</span> | True if the loginbox wants to be shown |

Source:  
-   [openamUtils.js](openamUtils.js.html), [line 143](openamUtils.js.html#line143)

#### <span class="type-signature"></span>printLoginBox<span class="signature">(element, options)</span><span class="type-signature"></span>

Renders a login button that can be clicked to create a login box. The login box may contain the interactive login credentials area plus a social login buttons area depending on the configuration of the "options" object and the configuration of the OpenAM being used.

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
<td><code>element</code></td>
<td><span class="param-type">HTMLElement</span> | <span class="param-type">String</span></td>
<td>the DOM element object where the button will be rendered</td>
</tr>
<tr class="even">
<td><code>options</code></td>
<td><span class="param-type">Object</span> | <span class="param-type">String</span></td>
<td>The configuration object to use.
<pre><code> The options object is a JSON object, here an example.  
 {
    openam: myOpenAMConfigObject,
    module: &quot;DataStore&quot;,                                         // optional
    service: &quot;ldapService&quot;,                                      // optional
    width: &quot;600px&quot;,                                              // optional
    height: &quot;300px&quot;,                                             // optional
    formId: &quot;amLoginForm&quot;,                                       // optional
    gotoURL: &quot;http://ap.example.com:8880/exampleNRO02.html&quot;,     // optional
    social: true,                                                // optional
    overrideSocialImplementations: mySocialImplementationsObject  // optional
 }   
 </code></pre>
<h6 id="properties">Properties</h6>
<table>
<colgroup>
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="20%" />
</colgroup>
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
<td><code>width</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>270px or as defined in openamUtils.css</td>
<td>The Login Box width in px.</td>
</tr>
<tr class="odd">
<td><code>height</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>620px or as defined in openamUtils.css</td>
<td>The Login Box height in px.</td>
</tr>
<tr class="even">
<td><code>formId</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>amLoginForm</td>
<td>The id of the form to be used to capture the credentials. It is recommended not to change it, unless there is a form Id colision in your HTML code.</td>
</tr>
<tr class="odd">
<td><code>gotoURL</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>Current page</td>
<td>The URL to go to after a successful authentication.</td>
</tr>
<tr class="even">
<td><code>social</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>true</td>
<td>Boolean attribute to turn off the display of the social authentication buttons, if the OpenAM has been configured to show the social implementations in the login page.</td>
</tr>
<tr class="odd">
<td><code>overrideSocialImplementations</code></td>
<td><span class="param-type">Array.&lt;Object&gt;</span></td>
<td>&lt;optional&gt;<br />
</td>
<td></td>
<td>This array of objects will override the socialImplementations array that is returned from the OpenAM serverinfo URL.
<pre><code> Here an example of the overrideSocialImplementations object:
 [
     {
         &quot;authnChain&quot;: &quot;GoogleSocialAuthenticationService&quot;,
         &quot;displayName&quot;: &quot;Google&quot;,
         &quot;iconPath&quot;: &quot;images/google.png&quot;,
         &quot;imgStyle&quot;: &quot;display: block; max-width: 80% !important;&quot;,
         &quot;valid&quot;: true,
         &quot;buttonText&quot;: &#39;&#39;
     },
     {       
         &quot;authnChain&quot;: &quot;MicrosoftSocialAuthenticationService&quot;,
         &quot;displayName&quot;: &quot;Microsoft&quot;,
         &quot;iconPath&quot;: &quot;images/msn.png&quot;,
         &quot;imgStyle&quot;: &quot;display: block; max-width: 80% !important;&quot;,
         &quot;valid&quot;: true,
         &quot;buttonText&quot;: &#39;&#39;
     }
 ]
 </code></pre>
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
<td><code>authnChain</code></td>
<td><span class="param-type">String</span></td>
<td></td>
<td></td>
<td>The name of the authentication chain that implements the specified social authentication</td>
</tr>
<tr class="even">
<td><code>displayName</code></td>
<td><span class="param-type">String</span></td>
<td></td>
<td></td>
<td>The name to be displayed for the specified social authentication</td>
</tr>
<tr class="odd">
<td><code>iconPath</code></td>
<td><span class="param-type">String</span></td>
<td></td>
<td></td>
<td>The location of the icon to be displayed within the button for the specified social authentication</td>
</tr>
<tr class="even">
<td><code>imgStyle</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>&quot;float: left;&quot;</td>
<td>The CSS style to be applied to the image referred in the iconPath attribute</td>
</tr>
<tr class="odd">
<td><code>valid</code></td>
<td><span class="param-type">Boolean</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>true</td>
<td>Flag to specify if the socialImplementation object should be used or not</td>
</tr>
<tr class="even">
<td><code>buttonText</code></td>
<td><span class="param-type">String</span></td>
<td>&lt;optional&gt;<br />
</td>
<td>Sign in with &lt;displayName&gt;</td>
<td>The text to be written within the button for the specified social authentication</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Source:  
-   [openamUtils.js](openamUtils.js.html), [line 602](openamUtils.js.html#line602)

#### <span class="type-signature"></span>printLoginButton<span class="signature">(element, options)</span><span class="type-signature"></span>

Renders a login button that redirects to the module specified as a parameter

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
<td><code>element</code></td>
<td><span class="param-type">HTMLElement</span> | <span class="param-type">String</span></td>
<td>the DOM element object where the button will be rendered</td>
</tr>
<tr class="even">
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
    classic: false                                               // optional
    windowed: true,                                              // optional
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
<td>Boolean attribute to specify if we are using the classic UI or the XUI. Default is to use the XUI.</td>
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
-   [openamUtils.js](openamUtils.js.html), [line 742](openamUtils.js.html#line742)

#### <span class="type-signature"></span>printLogoutButton<span class="signature">(element, options)</span><span class="type-signature"></span>

Renders a logout button that will invoke the logout service when clicked

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
<td><code>element</code></td>
<td><span class="param-type">HTMLElement</span> | <span class="param-type">String</span></td>
<td>the DOM element object where the button will be rendered</td>
</tr>
<tr class="even">
<td><code>options</code></td>
<td><span class="param-type">Object</span></td>
<td>The configuration object to use
<pre><code> The options object is a JSON object, here an example.  
 {
    openam: myOpenAMConfigObject
 }   
 </code></pre>
<h6 id="properties-3">Properties</h6>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>openam</code></td>
<td><span class="param-type">Object</span> | <span class="param-type">String</span></td>
<td>The OpenAM Configuration Object. This is a mandatory attribute. See openam.js documentation for more information</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Source:  
-   [openamUtils.js](openamUtils.js.html), [line 709](openamUtils.js.html#line709)

#### <span class="type-signature"></span>printWelcomeAndLogout<span class="signature">(element, options)</span><span class="type-signature"> → {undefined}</span>

Prints the Welcome message for the "identity" and the logout button in a div

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
<td><code>element</code></td>
<td><span class="param-type">String</span></td>
<td></td>
</tr>
<tr class="even">
<td><code>options</code></td>
<td><span class="param-type">Object</span></td>
<td>The object containing the configuration for this function
<pre><code>Example:
{
    openam: myOpenAM,
    message: &quot;Welcome Mr. &quot;
}</code></pre>
<h6 id="properties-4">Properties</h6>
<table>
<thead>
<tr class="header">
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>openam</code></td>
<td><span class="param-type">Object</span></td>
<td>The OpenAM Configuration Object. This is a mandatory attribute. See openam.js documentation for more information</td>
</tr>
<tr class="even">
<td><code>message</code></td>
<td><span class="param-type">String</span></td>
<td>The message to be shown as Welcome to the user/identity</td>
</tr>
</tbody>
</table></td>
</tr>
</tbody>
</table>

Source:  
-   [openamUtils.js](openamUtils.js.html), [line 25](openamUtils.js.html#line25)

##### Returns:

Does not return anything. It overrides the element DOM

 Type   
<span class="param-type">undefined</span>




Documentation generated by [JSDoc 3.4.0](https://github.com/jsdoc3/jsdoc) and converted to markdown with [pandoc 1.17.0.3](https://github.com/jgm/pandoc) and some Patience.
