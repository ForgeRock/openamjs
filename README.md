# openamjs
A small JavaScript wrapper to do basic REST API calls to OpenAM

## Synopsis
openam.js is a small library/wrapper of some of the REST APIs of OpenAM.
The intention is to provide an easy way to integrate the calls in your Client JavaScript code without needing to implement the REST code yourself

This is a work in progress, and also a JavaScript coding exercise. 
This is a community work and it is NOT supported NOR endorsed by ForgeRock. If you feel it is useful, please contribute.

## Motivation
I wanted an easy way to integrate the OpenAM REST calls in JavaScript client code.
The implementation here uses XMLHttpRequest or ActiveXObject (hence it might not work in some browsers), but I have tested it in modern ones.
I can tell you that IE7 does not support CORS and in some cases when using the library you will be accessing an external domain (the OpenAM)


## Installation
Just add the openam.js to your project and start to use it. No jQuery is required, so you can use pure JS or combine it with your favorite framework

## Examples
There are seven examples in here, take a look to them and give them a go. You will need to adjust the openam configuration and be sure that your OpenAM supports CORS.

To try these examples you just need a web container, it could be an apache web server or a tomcat server. These are pure html, css and javascript. Also your client browser should support CORS and xhr.

* **example0.html**: A web page that uses openam.js in its simplest form. It uses the openam.authNRedirectModule('DataStore') method to redirect to the OpenAM User Interface using the DataStore authentication module and prompts the user for user name and password. No jQuery is used for this example. 
* **example1.html**: Similar to example0.html, except that it redirects using a window on top of the current web page. It uses the authNRedirectModuleWdw('DataStore') method. No jQuery is used for this example.
* **example2.html***: Displays a login form box that slides down when the user clicks the "login" button. This example uses the openam.authenticate(username, password) method and uses the default authentication method in the configured OpenAM. No jQuery is used for this example either.
* **example3.html**: Similar to example2.html, except that the login form box also shows social authentication options, like facebook, linkedin, google, msn and amazon. The login box with the social authentication buttons is created with html and css, and the code is within the webpage. Of course you need to have your OpenAM configured to do social authentication and use the proper module names in your configuration. If you have not configured these authentication modules, you will see the window open, and an error saying that the module is denied. This example doesn't use jQuery either.
* **example4.html**: This example is similar to example2.html, except that the webpage is simplified by moving several auxiliary script functions, like creating the login box and displaying it, to its own utils.js file. This example doesn't use jQuery either and like in the previous examples the login box is created using html and css.
* **example5.html**: This is similat to example3.html, except that the webpage is simplified by moving several auxiliary script functions, like creating the login box and displaying it, to its own utils.js file. This example doesn't use jQuery either and as in the previous examples the login box is created using html and css. The login box uses the auxiliary function: loginBox(true,"facebook,linkedin,google,msn,amazon"), where "true" means we want to show social authentication options that are listed in the second parameter.
* **example6.html**: This example is similar to example3.html. The difference is that it uses jQuery.


One of the requirements for the examples above is to have your OpenAM properly configured. 
You might need to enable CORS in OpenAM, if you have a question on how to do it, take a look to this blog entry: 
https://forgerock.org/2015/02/openam-with-cors-is-that-a-salad-dessert-or-main-course/.

Configure also the social authentication in your OpenAM if you want to see some of the examples working.

## Documentation

The documentation can be found under the docs folder (i.e. [here](/docs/))

You can also take a look to the examples described above.

Send us your feedback.