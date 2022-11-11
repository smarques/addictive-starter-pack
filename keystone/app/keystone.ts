// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';
import { KeystoneContext } from '@keystone-6/core/types';
// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';
import * as Path from 'path';
// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@opensaas/keystone-nextjs-auth';
import KeycloakProvider from "next-auth/providers/keycloak";

let sessionSecret = process.env.SESSION_SECRET;
const sessionMaxAge = 60 * 60 * 24 * 30; // 30 days
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
  // resolver: async ({user, profile, account}) => {
  //   const username = user.name as string;
  //   const email = user.email as string;
  //   return { email, username };
  // },
  resolver: async ({ user, profile }: { user: any; profile: any }) => {
    const name = user.name as string;
    const email = profile.email as string;
    return { email, name };
  },
  keystonePath: '/admin',
  pages: {
    signIn: '/admin/auth/signin',
  },
  sessionSecret,
  providers: [
    KeycloakProvider({
      clientId: process.env.AUTH_CLIENT_ID as string,
      clientSecret: process.env.AUTH_CLIENT_SECRET as string,
      issuer: `${process.env.AUTH_DOMAIN_INTERNAL}`,
      wellKnown: `${process.env.AUTH_DOMAIN_INTERNAL}/.well-known/openid-configuration`,
    }),
]
});

export default auth.withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND || 'http://localhost:7777'],
        credentials: true,
      },
    },
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    ui:{
      isAccessAllowed: (context: KeystoneContext) => !!context.session?.data,
      publicPages: ['/admin/auth/signin', '/admin/auth/error'],
      getAdditionalFiles: [
        async () => [
          {
            mode: 'copy',
            inputPath: Path.resolve('./customPages/signin.js'),
            outputPath: 'pages/auth/signin.js',
          },
          {
            mode: 'copy',
            inputPath: Path.resolve('./customPages/error.js'),
            outputPath: 'pages/auth/error.js',
          },
        ],
      ]
    },
    lists,
    session: statelessSessions({
      maxAge: sessionMaxAge,
      secret: sessionSecret,
    }),
  })
);
