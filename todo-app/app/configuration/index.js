// import { Issuer } from 'openid-client';
const { Issuer } = require("openid-client"); 
let cachedClient = false;
const config = { 
  PORT: parseInt(process.env.PORT) || 7070,
  // AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
  AUTH_REALM: process.env.AUTH_REALM,
  AUTH_CLIENT_SECRET: process.env.AUTH_CLIENT_SECRET,
  AUTH_DISCOVERY_URL: process.env.AUTH_DISCOVERY_URL,
  APP_URL: process.env.APP_URL
}

config.loadOpenIDClient = async () => {
  if(!cachedClient){
    const authDiscovery = `${config.AUTH_DISCOVERY_URL}/realms/${config.AUTH_REALM}/`
    console.log(`auth discovery: ${authDiscovery}`)
    const openIdIssuer = await Issuer.discover(authDiscovery);
    console.log('Discovered issuer %s %O', openIdIssuer.issuer, openIdIssuer.metadata)
    cachedClient = new openIdIssuer.Client({
      client_id: config.AUTH_CLIENT_ID,
      client_secret: config.AUTH_CLIENT_SECRET,
      //redirect_uris: ['http://localhost:3000/cb'],
      response_types: ['code'],
      // id_token_signed_response_alg (default "RS256")
      // token_endpoint_auth_method (default "client_secret_basic")
    }); // => Client
  } 
  return cachedClient;
}


module.exports = config;