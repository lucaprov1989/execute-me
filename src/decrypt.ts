import { createDecipheriv, privateDecrypt } from "crypto";
import { readFileSync, writeFileSync } from "fs";

const AES_ALGORITHM = "aes-256-ctr";

/**
 * Function decrypts encrypted buffer using given key.
 * Returns decrypted message buffer.
 *
 * @param {Buffer} message
 * @param {Buffer} key
 */
function aesDecrypt(message, key) {
  const iv = Buffer.alloc(16);
  const aes = createDecipheriv(AES_ALGORITHM, key, iv);
  const decryptedBuffer = aes.update(message);
  aes.final();

  return { message: decryptedBuffer };
}

/**
 * Function decrypts message with given private key.
 *
 * @param {Buffer} privateKey
 * @param {Buffer} message
 */
function rsaDecrypt(privateKey, message) {
  return privateDecrypt(privateKey, message);
}
function decrypt(fileToDecript) {
  // Load encrypted file and encrypted key
  const encryptedFile = readFileSync(fileToDecript);
  const encryptedKey = readFileSync(`./keys/${fileToDecript}_decrypter`);
  const privateKeyBuffer = readFileSync("./private.pem");
  // Decrypt key first (this will happen on the attackers side)
  const decryptedKey = rsaDecrypt(privateKeyBuffer, encryptedKey);
  // Using decrypted key decrypt file
  const { message: decryptedMessage } = aesDecrypt(encryptedFile, decryptedKey);
  return decryptedMessage;
}

export default (fileToDecript) => {
  const decryptedMessage = decrypt(fileToDecript);
  // Save decrypted file
  writeFileSync(fileToDecript, decryptedMessage);
};
