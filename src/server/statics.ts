import express from "express";

const statics = async (app: express.Express) => {
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
    "/chunks",
    express.static(".os/chunks", {
      maxAge: "1y",
      immutable: true,
    }),
  );
  app.use(
    express.static("public", {
      maxAge: "1y",
      immutable: true,
    }),
  );
};

export default statics;
