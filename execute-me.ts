import * as runner from "./src";

(function executeMe() {
  const toExecute = process.argv.slice(2)[0] as "encrypter" | "decrypter";
  runner[toExecute]();
})();
