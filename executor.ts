import { spawn } from "child_process";

(function executor() {
  const toExecute = process.argv.slice(2)[0] as "encrypter" | "decrypter";
  const child = spawn("ts-node", ["execute-me.ts", toExecute], {
    detached: true,
    stdio: "ignore",
  });

  child.unref();
})();
