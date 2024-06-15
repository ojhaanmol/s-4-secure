// Function to compute the Greatest Common Divisor (GCD) using Euclidean Algorithm
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Function to compute the modular inverse using Extended Euclidean Algorithm
function modInverse(e, phi) {
  let [a, m] = [e, phi];
  let [m0, x0, x1] = [m, 0, 1];

  if (m === 1) return 0;

  while (a > 1) {
    let q = Math.floor(a / m);
    [m, a] = [a % m, m];
    [x0, x1] = [x1 - q * x0, x0];
  }

  if (x1 < 0) x1 += phi;

  return x1;
}

// Function to generate RSA keys
function generateRSAKeys() {
  const p = 61; // First prime number
  const q = 53; // Second prime number
  const n = p * q; // Modulus
  const phi = (p - 1) * (q - 1); // Totient

  let e = 3; // Choose an integer e such that 1 < e < phi and gcd(e, phi) == 1
  while (gcd(e, phi) !== 1) {
    e++;
  }

  const d = modInverse(e, phi); // Compute the modular inverse of e

  return {
    publicKey: { e, n },
    privateKey: { d, n },
  };
}

// Function to encrypt a message
function encrypt(message='', publicKey) {
    const m = message;
    const { e, n } = publicKey;
    let eb = m.split('').map(char=> Number(BigInt(char.charCodeAt(0))  ** BigInt(e) % BigInt(n)) );
    return eb;
}

// Function to decrypt a message
function decrypt(ciphertext, privateKey) {
    const { d, n } = privateKey;
    let re = ciphertext.map(num=> String.fromCharCode(Number(BigInt(num)  ** BigInt(d) % BigInt(n))) ).join('');
    return re;
}

function symmetricEnc (message='', key) {
  return message.split('').map(char => Number( BigInt(char.charCodeAt(0)) * BigInt(key) ));
}

function symmetricDec (buffer=[], key) {
  return buffer.map(num => String.fromCharCode(Number(BigInt(num)/BigInt(key))) ).join('');
}

module.exports = {generateRSAKeys, encrypt, decrypt, symmetricEnc, symmetricDec}

/** 
// Generate RSA keys
const { publicKey, privateKey } = generateRSAKeys();

console.log('Public Key:', publicKey);
console.log('Private Key:', privateKey);

// Message to be encrypted
const message = "Hello, RSA using Euclidean Math!";

// Encrypt the message with the public key
const encryptedMessage = encrypt(message, publicKey);
console.log('Encrypted Message:', encryptedMessage);

// Decrypt the message with the private key
const decryptedMessage = decrypt(encryptedMessage, privateKey);
console.log('Decrypted Message:', decryptedMessage);
*/
