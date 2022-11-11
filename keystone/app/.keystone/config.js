"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      subjectId: (0, import_fields.text)({ isIndexed: "unique" }),
      password: (0, import_fields.password)({ validation: { isRequired: false } }),
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Post: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      content: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      author: (0, import_fields.relationship)({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        many: false
      }),
      tags: (0, import_fields.relationship)({
        ref: "Tag.posts",
        many: true,
        ui: {
          displayMode: "cards",
          cardFields: ["name"],
          inlineEdit: { fields: ["name"] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ["name"] }
        }
      })
    }
  }),
  Tag: (0, import_core.list)({
    access: import_access.allowAll,
    ui: {
      isHidden: true
    },
    fields: {
      name: (0, import_fields.text)(),
      posts: (0, import_fields.relationship)({ ref: "Post.tags", many: true })
    }
  })
};

// keystone.ts
var Path = __toESM(require("path"));
var import_session = require("@keystone-6/core/session");
var import_keystone_nextjs_auth = require("@opensaas/keystone-nextjs-auth");
var import_keycloak = __toESM(require("next-auth/providers/keycloak"));
var sessionSecret = process.env.SESSION_SECRET;
var sessionMaxAge = 60 * 60 * 24 * 30;
if (!sessionSecret) {
  throw new Error(
    "The SESSION_SECRET environment variable must be set in production"
  );
}
var auth = (0, import_keystone_nextjs_auth.createAuth)({
  listKey: "User",
  identityField: "subjectId",
  sessionData: `id name email`,
  autoCreate: true,
  resolver: async ({ user, profile }) => {
    const name = user.name;
    const email = profile.email;
    return { email, name };
  },
  keystonePath: "/admin",
  pages: {
    signIn: "/admin/auth/signin"
  },
  sessionSecret,
  providers: [
    (0, import_keycloak.default)({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      issuer: `${process.env.AUTH_DOMAIN_INTERNAL}`,
      wellKnown: `${process.env.AUTH_DOMAIN_INTERNAL}/.well-known/openid-configuration`
    })
  ]
});
var keystone_default = auth.withAuth(
  (0, import_core2.config)({
    server: {
      cors: {
        origin: [process.env.FRONTEND || "http://localhost:7777"],
        credentials: true
      }
    },
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
      publicPages: ["/admin/auth/signin", "/admin/auth/error"],
      getAdditionalFiles: [
        async () => [
          {
            mode: "copy",
            inputPath: Path.resolve("./customPages/signin.js"),
            outputPath: "pages/auth/signin.js"
          },
          {
            mode: "copy",
            inputPath: Path.resolve("./customPages/error.js"),
            outputPath: "pages/auth/error.js"
          }
        ]
      ]
    },
    lists,
    session: (0, import_session.statelessSessions)({
      maxAge: sessionMaxAge,
      secret: sessionSecret
    })
  })
);
