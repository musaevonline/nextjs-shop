module.exports = {
  client: {
    includes: ["src/**/*.ts", "src/**/*.tsx"],
    excludes: ["**/__tests__/**/*"],
    addTypename: true,
    name: "dashboard",
    service: {
      // localSchemaFile: "schema.graphql",
      name: "stroylux",
      url: "http://localhost:8000/graphql/",
    }
  },
};