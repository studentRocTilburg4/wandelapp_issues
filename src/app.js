import {hikingapp} from './hikingapp';

// Server that stores route data
const localbackendserver = 'http://localhost:8081';
const remotebackendserver = 'https://nodejs-mongo-persistent-wandelappbackend-v4.a3c1.starter-us-west-1.openshiftapps.com';
const backendserver = remotebackendserver;
// const backendserver = localbackendserver;

document.addEventListener('DOMContentLoaded', () => {
    //Load the app with the REST server
    hikingapp(backendserver);
});
