const config = {
  name: "Call Manager",
  theme: {
    color: "#15a494",
    mode: "dark",
  },
  dock: {
    mode: "web",
    placement: "left",
  },
  auth: {
    signup_role: "user",
    signup: true,
    reset: true,
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
