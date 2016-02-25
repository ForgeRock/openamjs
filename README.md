# openamjs
A small JavaScript wrapper to do basic REST API calls to OpenAM

## Synopsis
openam.js is a small library/wrapper of some of the REST APIs of OpenAM.
The intention is to provide an easy way to integrate the calls in your Client JavaScript code without needing to implement the REST code yourself

This is a work in progress, and also a JavaScript coding exercise. 
This is a community work and it is NOT supported NOR endorsed by ForgeRock, however if you feel it is useful, please contribute.

## Motivation
I wanted an easy way to integrate the OpenAM REST calls in JavaScript client code.
The implementation here uses XMLHttpRequest or ActiveXObject (hence it might not work in some browsers), but I have tested it in modern ones.
I can tell you that IE7 does not support CORS and in some cases when using the library you will be accessing an external domain (the OpenAM)


## Installation
Just add the openam.js to your project and start to use it. No jQuery is required, so you can use pure JS or combine it with your favorite framework

## Examples
There are five examples in here, take a look and give it a go

One of the requirements of course is to have your OpenAM properly configured. 
You might need to enable CORS in OpenAM, if you have a question on how to do it, take a look to this blog entry: 
https://forgerock.org/2015/02/openam-with-cors-is-that-a-salad-dessert-or-main-course/

## Documentation

// Configure the OpenAM connection
var openam = new openamConfig(
              "http://mac.openrock.org:8080/openam", // openam base url
              "/humans",                             // realm
              "iPlanetDirectoryPro",                 // Session cookie name
              ".openrock.org",                       // Domain name
              false,                                 // Is legacy enabled?
              true);                                 // Is debug enabled (messages to the java console)?

// Redirect to authentication with Module
openam.redirectAuthNWithModule(
        module,                         // The AuthN module to use
        realm, 
        goto, 
        gotoOnFail, 
        classic) 

