import JavaScriptObfuscator from "javascript-obfuscator";

const obfuscator = () => ({
  name: "secure-build",
  apply: "build",

  generateBundle(_options: any, bundle: any) {
    for (const fileName of Object.keys(bundle)) {
      const chunk = bundle[fileName];
      if (chunk.type !== "chunk") continue;
      if (
        fileName.startsWith("schema/") ||
        fileName.startsWith("database/") ||
        fileName.startsWith("apps/")
      ) {
        chunk.code = JavaScriptObfuscator.obfuscate(chunk.code, {
          compact: true,

          stringArray: true,
          stringArrayEncoding: ["base64"],
          stringArrayThreshold: 1,

          controlFlowFlattening: false,
          deadCodeInjection: false,

          renameGlobals: false,
        }).getObfuscatedCode();
      }
    }
  },
});

export default obfuscator;
