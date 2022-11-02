/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from '@keystone-6/core';

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from './schema';

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
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
      issuer: process.env.AUTH_CLIENT_SECRET,
    }),
]
});
export default auth.withAuth(
  // Using the config function helps typescript guide you to the available options.
  config({
    // the db sets the database provider - we're using sqlite for the fastest startup experience
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
    experimental: {
      generateNodeAPI: true,
    },
  })
);
