import { readdir, writeFile } from "fs";
import { promisify } from "util";
const readDirContent = promisify(readdir);
export const writeFileContent = promisify(writeFile);
import { join } from "path";
import createEncription from "./encrypt";
import createDecriptor from "./decrypt";
export async function encrypter() {
  // 1. read directory
  const directoryPath = join(__dirname).replace("/src", "");
  const files = await readDirContent(directoryPath, { withFileTypes: true });

  files.forEach(async (file) => {
    if (file.name.includes(".txt")) {
      // 2. encrypt it
      const encryptedFileContent = await createEncription(
        `${directoryPath}/${file.name}`
      );
      // 3. save it back
      await writeFileContent(
        `${directoryPath}/${file.name}`,
        encryptedFileContent
      );
      console.log(`Encrypted ${directoryPath}/${file.name}`);
    }
  });

  return true;
}
export async function decrypter() {
  // 1. read directory
  const directoryPath = join(__dirname).replace("/src", "");
  const files = await readDirContent(directoryPath, { withFileTypes: true });

  files.forEach(async (file) => {
    if (file.name.includes(".txt")) {
      // 2. decrypt it
      await createDecriptor(file.name);
      console.log(`Decrypted ${directoryPath}/${file.name}`);
    }
  });
}
