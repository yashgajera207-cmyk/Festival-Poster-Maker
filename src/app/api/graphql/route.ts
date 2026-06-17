import { createSchema } from "graphql-yoga";
import { createYoga } from "graphql-yoga";

import fs from "fs";
import path from "path";

import { authResolver } from "@/graphql/resolvers/auth.resolver";
import { createContext } from "@/graphql/context";

const schemaPath = path.join(
  process.cwd(),
  "src/graphql/schema/auth.graphql"
);

const typeDefs =
  fs.readFileSync(
    schemaPath,
    "utf-8"
  );

const schema = createSchema({
  typeDefs,

  resolvers: [
    authResolver,
  ],
});

const yoga = createYoga({
  schema,

  graphqlEndpoint:
    "/api/graphql",

  fetchAPI: {
    Response,
    Request,
    Headers,
  },

  context: async ({
    request,
  }) => {
    return createContext(
      request as any
    );
  },
});

export {
  yoga as GET,
  yoga as POST,
};