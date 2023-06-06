import vm from "vm";
import readlineSync from "readline-sync";
import { pprintAST, pprintDesugaredAST } from "./pprint.js";
import { print } from "../printer/print.js";
import { makeGlobalNameMap } from "../runtime/makeGlobals.js";
import { emitGlobalEnv } from "../emitter/emitGlobalEnv.js";
import { fail } from "../shared/fail.js";
import { build } from "./build.js";
import { compile } from "./compile.js";

const read = (prompt) => readlineSync.question(prompt);

export const repl = (mode = "repl") => {
  // Create global compile environment
  const compileEnv = makeGlobalNameMap();

  // Build global module and instantiate in REPL context
  // This should make all compiled global symbols available
  const globalCode = build(emitGlobalEnv());
  vm.runInThisContext(globalCode);

  let prompt = "wanda> ";

  while (true) {
    try {
      const input = read(prompt);

      switch (input) {
        // If it's a command, execute it
        case ":quit":
          process.exit(0);
        case ":print-ast":
          mode = "printAST";
          break;
        case ":print-d":
          mode = "printDesugared";
          break;
        // If it's code, compile and run it
        default:
          let compiled = compile(input, "stdin", compileEnv);
          let result = vm.runInThisContext(compiled);

          if (mode === "printAST") {
            pprintAST(input);
          } else if (mode === "printDesugared") {
            pprintDesugaredAST(input);
          }

          print(result);
      }
    } catch (e) {
      console.error(e.message);
    }
  }
};
