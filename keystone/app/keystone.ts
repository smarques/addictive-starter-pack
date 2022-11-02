// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

import { createAuth } from '@opensaas/keystone-nextjs-auth';
import KeycloakProvider from "next-auth/providers/keycloak";

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    throw new Error(
      'The SESSION_SECRET environment variable must be set in production'
    );
}
const auth = createAuth({
  listKey: 'User',
  identityField: 'subjectId',
  sessionData: `id name email`,
  autoCreate: true,
  resolver: async ({user, profile, account}) => {
    const username = user.name as string;
    const email = user.email as string;
    return { email, username };
  },
  keystonePath: '/',
  sessionSecret,
  providers: [
    KeycloakProvider({
      clientId: process.env.AUTH_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_SECRET as string,
      issuer: 'https://keycloak:8080/realms/addictive',
      wellKnown: `http://keycloak:8080/realms/addictive/.well-known/openid-configuration`,
    }),
]
});

export default auth.withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    session,
  })
);
