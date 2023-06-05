import { ROOT_PATH } from "../../root.js";
import { makeGlobal } from "../runtime/makeGlobals.js";

export const emitGlobalEnv = () => {
  const globalEnv = makeGlobal();
  let code = `import { makeGlobal } from "${ROOT_PATH}/src/runtime/makeGlobals.js"

const globalEnv = makeGlobal();
`;

  for (let [k] of globalEnv) {
    code += `const ${k} = globalEnv.get(${k});\n`;
  }

  code += "\n";

  return code;
};
