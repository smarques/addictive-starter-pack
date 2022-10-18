// import { Issuer } from 'openid-client';
const { Issuer } = require("openid-client"); 
const config = { 
  PORT: parseInt(process.env.PORT) || 7070,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET
}

config.loadIssuer = async () => {
  // const Issuer = require('openid-client').Issuer;
  
  console.log(`auth domain: ${config.AUTH0_DOMAIN}`)
  try {
  const openIdIssuer = await Issuer.discover('http://keycloak:8080/realms/addictive'+'/');
  console.log('Discovered issuer %s %O', openIdIssuer.issuer, openIdIssuer.metadata);
  // return Promise.resolve(openIdIssuer);
  } catch (e) {
    console.log("auth0 error",e);
  } 

 
}


module.exports = config;