module.exports = {
  client: {
    includes: ["src/**/*.ts", "src/**/*.tsx"],
    excludes: ["**/__tests__/**/*"],
    addTypename: true,
    name: "frontend",
    service: {
      // localSchemaFile: "schema.graphql",
      name: "shop",
      url: "http://localhost:8000/graphql/",
    }
  },
};