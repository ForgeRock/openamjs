# openamjs

##Warning
**This code is not supported by ForgeRock and it is your responsibility to verify that the software is suitable and safe for use.**

##About
A couple of small JavaScript wrappers to do basic REST API calls to OpenAM.

## Synopsis
**openam.js** is a small library/wrapper of some of the REST APIs of OpenAM.
The intention is to provide an easy way to integrate the calls in your Client JavaScript code without needing to implement the REST code yourself.

**openamUtils.js** is another wrapper to render configurable Login Buttons and Login Boxes. It uses openam.js and the css style contained in this repository, of course you can adjust the css to your needs but it should work nicely out of the box. This wrapper does not need JQuery, but of course you can combine it with any other JS UI framework. 

This is a work in progress, and also a JavaScript coding exercise. 
Initially it is leveraging the Authentication and SSO API's but it can be extended to cover the whole set of APIs, inclulding Authorization, OAuth2, OIDC, UMA, STS, etc. with a little help of the community.

This is a community work and it is NOT supported NOR endorsed by ForgeRock. If you feel it is useful, please contribute.

## Motivation
I wanted an easy way to integrate the OpenAM REST calls in JavaScript client code.
The implementation here uses XMLHttpRequest or ActiveXObject (hence it might not work in some browsers), but I have tested it in modern ones.
I can tell you that IE7 does not support CORS and in some cases when using the library you will be accessing an external domain (the OpenAM).


## Installation
Just add the openam.js to your project and start to use it. No jQuery is required, so you can use pure JS or combine it with your favorite framework

## Examples
There are seven examples in here, take a look to them and give them a go. You will need to adjust the openam configuration and be sure that your OpenAM supports CORS.

To try these examples you just need a web container, it could be an apache web server or a tomcat server. These are pure html, css and javascript. No jQuery is used in any of these examples. Your client browser should support CORS and xhr.

* **example0.html**: A web page that uses openam.js in a very simple way. It uses the `openam.authenticateSimple( { module: 'DataStore'} )` method to submit the credentials captured in an HTML form. It also uses the `openam.logout()` method.
* **example1.html**: Similar to example0.html, except that it redirects to OpenAM using a window on top of the current web page. It uses the `authNRedirect({module: 'DataStore'}) ` and the `openam.logout()` methods.
* **example2.html**: Similar to example1.html, except that it redirects to OpenAM using a window on top of the current web page. It uses the `authNRedirect({service: 'FRAuthChain'}) ` and `openam.logout()` methods. In this example the FRAuthChain is an authentication chain containing the DataStore and the ForgeRock Authenticator (Multifactor).
* **example3.html**: This example uses both openam.js and openamUtils.js. It displays a login button that can be used very much in the same form as the examples 1 and 1.1. It uses the method `printLoginButton("myloginButton", {openam: myOpenam})` to render the button. For logout it uses a logout button rendered by the method `printLogoutButton("myLogoutButton", {openam: myOpenam})`. This buttons are rendered by functions in openamUtils.js. openamUtils.css is also needed, as shown in the example. 
* **example4.html**: This example uses both openam.js, openamUtils.js, and also the openamUtils.css. It displays a login box that is rendered based on the information provided by your OpenAM, i.e. if you have configured social authentication modules with the wizard in OpenAM, they will also be displayed in your box. It uses the method `printLoginBox("myLoginButton", {openam: myOpenam});` to render the login box. The authentication chain or module to use in the form can be configured as part of the options in the method, in this example we use the minimal 'configuration'.
* **example5.html**: This example is similar to example3.html, except that we add a service parameter, using 'FRAuthChain', i.e. `printLoginBox("myLoginBox", {openam: myOpenam, service: 'FRAuthChain'})` to make it multifactor and we add another css layout. 
* **example6.html**: This example is similar to example3 and example4, except that we override the social authentication information with our own definition. 
          <pre><code>
          socialImplementations = [{
                    "authnChain": "GoogleSocialAuthenticationService",
                    "displayName": "Google",
                    "iconPath": "images/google.png",
                    "imgStyle": "display: block; max-width: 70% !important;",
                    "valid": true,
                    "buttonText": ''
                },
                {
                    "authnChain": "MicrosoftSocialAuthenticationService",
                    "displayName": "Microsoft",
                    "iconPath": "images/msn.png",
                    "imgStyle": "display: block; max-width: 70% !important;",
                    "valid": true,
                    "buttonText": ''
                },
                {
                    "authnChain": "FacebookSocialAuthenticationService",
                    "displayName": "Facebook",
                    "iconPath": "images/facebook.png",
                    "valid": true,
                    "imgStyle": "display: block; max-width: 70% !important;",
                    "buttonText": ''
                },
                {
                    "authnChain": "linkedInService",
                    "displayName": "LinkedIn",
                    "iconPath": "images/linkedin.png",
                    "imgStyle": "display: block; max-width: 70% !important;",
                    "valid": true,
                    "buttonText": ''
                }
            ];
            printLoginBox("myLoginBox", { 
                    width: '500px',
                    height: '280px',
                    openam: myOpenam,
                    service: 'FRAuthChain',
                    overrideSocialImplementations: socialImplementations
                    });
            </code></pre>


One of the requirements for the examples above is to have your OpenAM properly configured. 
You might need to enable CORS in OpenAM, if you have a question on how to do it, take a look to this blog entry: 
https://forgerock.org/2015/02/openam-with-cors-is-that-a-salad-dessert-or-main-course/.

Configure also the social authentication in your OpenAM if you want to see some of the examples working.

## Documentation

The documentation for openam.js can be found under the docs folder (i.e. [here](/docs/openamjs/openamjs.md))

The documentation for openamUtils.js can be found under the docs folder (i.e. [here](/docs/openamUtils/openamutils.md))

You can also take a look to the examples described above.

Send us your feedback.
