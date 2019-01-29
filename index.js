const http = require("http");
const fs = require("fs");
const { graphql } = require("graphql");
const getRawBody = require("raw-body");
const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require("graphql-tools");

const typeDefs = fs.readFileSync("./schema.graphql", "utf8");
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, preserveResolvers: true });

http
  .createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
      res.end();
    } else {
      const { query, variables: vars } = JSON.parse(await getRawBody(req));

      const variables = typeof vars === "string" ? JSON.parse(vars) : vars;

      const result = await graphql(schema, query, null, {}, variables, null);

      res.end(JSON.stringify(result, null, 2));
    }
  })
  .listen(8080, () => {
    console.log("http://localhost:8080");
  });
