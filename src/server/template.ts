const template = (isProd = false) => {
  let file = isProd ? "/startup.js" : "/xanos.startup.ts";

  const template = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div id="xroot"></div>
        <script type="module" src="${file}"></script>
      </body>
    </html>
    `;
  return template;
};

export default template;
