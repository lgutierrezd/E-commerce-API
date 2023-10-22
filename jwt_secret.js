const crypto = require('crypto');
// correr como "node jwt_secret.js" para crear un secreto de jwt
// Genera un buffer aleatorio de 16 bytes (que se convertirá en una cadena de 32 caracteres)
const jwtSecretBuffer = crypto.randomBytes(16);

// Convierte el buffer en una cadena hexadecimal
const jwtSecret = jwtSecretBuffer.toString('hex');

console.log('JWT Secret:', jwtSecret);
