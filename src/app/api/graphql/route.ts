import { createSchema } from "graphql-yoga";
import { createYoga } from "graphql-yoga";

import fs from "fs";
import path from "path";

import { authResolver } from "@/graphql/resolvers/auth.resolver";
import { categoryResolver } from "@/graphql/resolvers/category.resolver";
import { templateResolver } from "@/graphql/resolvers/template.resolver";
import { templateElementResolver } from "@/graphql/resolvers/templateElement.resolver";
import { elementResolver } from "@/graphql/resolvers/element.resolver";
import { userPosterLayoutResolver } from "@/graphql/resolvers/userPosterLayout.resolver";
import { festivalResolver } from "@/graphql/resolvers/festival.resolver";

import { createContext } from "@/graphql/context";

const authSchemaPath = path.join(
  process.cwd(),
  "src/graphql/schema/auth.graphql"
);

const categorySchemaPath = path.join(
  process.cwd(),
  "src/graphql/schema/category.graphql"
);

const templateSchemaPath = path.join(
  process.cwd(),
  "src/graphql/schema/template.graphql"
);

const templateElementSchemaPath = path.join(
  process.cwd(),
  "src/graphql/schema/templateElement.graphql"
);

const userPosterLayoutSchemaPath = path.join(
  process.cwd(),
  "src/graphql/schema/userPosterLayout.graphql"
);
const festivalSchemaPath = path.join(
  process.cwd(),
  "src/graphql/schema/festival.graphql"
);

const authTypeDefs = fs.readFileSync(
  authSchemaPath,
  "utf-8"
);

const categoryTypeDefs = fs.readFileSync(
  categorySchemaPath,
  "utf-8"
);

const templateTypeDefs = fs.readFileSync(
  templateSchemaPath,
  "utf-8"
);

const templateElementTypeDefs = fs.readFileSync(
  templateElementSchemaPath,
  "utf-8"
);

const userPosterLayoutTypeDefs = fs.readFileSync(
  userPosterLayoutSchemaPath,
  "utf-8"
);

const festivalTypeDefs =
  fs.readFileSync(
    festivalSchemaPath,
    "utf-8"
  );

const schema = createSchema({
  typeDefs: `
    ${authTypeDefs}

    ${categoryTypeDefs}

    ${templateTypeDefs}

    ${templateElementTypeDefs}

    ${userPosterLayoutTypeDefs}

    ${festivalTypeDefs}
  `,

  resolvers: [
    authResolver,
    categoryResolver,
    templateResolver,
    templateElementResolver,
    elementResolver,
    userPosterLayoutResolver,
    festivalResolver,
  ],
});

const yoga = createYoga({
  schema,

  graphqlEndpoint: "/api/graphql",

  fetchAPI: {
    Response,
    Request,
    Headers,
  },

  context: async ({ request }) => {
    return createContext(
      request as any
    );
  },
});

export {
  yoga as GET,
  yoga as POST,
};