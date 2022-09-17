## Description
A back-end Node application that uses the Express framework to return a hardcoded list of phonebook entries. Its API accepts GET, DELETE, & POST requests.

The project is deployed here: https://mysterious-island-88506.herokuapp.com/

## Demo
![demo](pbdemo.gif)

## Features
* POST requests are not allowed to succeed, if:
    * Name property is missing.
    * Number property is missing.
    * Name property already exists (applies only to what is already stored in API)
* Uses `morgan` module to log all requests sent to the server.

## Optimizations
* I would like to add error handling when a POST request submits a duplicate number property.

## Technologies
<img src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" height="50" /><img src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" /><img src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" height="40" /><img src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="NodeJS" height="50" />
<img src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" height="50" /><img src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" alt="Git" height="50" />

## Do you want to build this project?
https://fullstackopen.com/en/part3/node_js_and_express#exercises-3-1-3-6