import express from "express";

const statics = async (app: express.Express, isDev: boolean) => {
  app.use(
    `/.xanos.icon.png`,
    express.static("xanos.icon.png", {
      maxAge: isDev ? 0 : "1y",
      immutable: true,
    }),
  );

  app.use(
    express.static("public", {
      maxAge: "1y",
      immutable: true,
    }),
  );

  if (!isDev) {
    app.use(
      `/startup.js`,
      express.static(".os/startup.js", {
        maxAge: 0,
        etag: true,
      }),
    );
    app.use(
      "/assets",
      express.static(".os/assets", {
        maxAge: "1y",
        immutable: true,
      }),
    );
    app.use(
      "/apps",
      express.static(".os/apps", {
        maxAge: "1y",
        immutable: true,
      }),
    );
    app.use(
      "/vendor",
      express.static(".os/vendor", {
        maxAge: "1y",
        immutable: true,
      }),
    );

    app.use(
      "/database",
      express.static(".os/database", {
        maxAge: "1y",
        immutable: true,
      }),
    );

    app.use(
      "/schema",
      express.static(".os/schema", {
        maxAge: "1y",
        immutable: true,
      }),
    );
  }
};

export default statics;
