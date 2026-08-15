const config = {
  name: "Call Manager",
  theme: {
    color: "#FED480",
    mode: "dark",
  },
  dock: {
    mode: "web",
    placement: "left",
  },
  database: {
    engine: "sqlite",
    sqlite: "db.sqlite",
    mysql: {},
    postgres: {},
  },
  files: "./public/uploads",
  customApps: [],
};

export default config;
