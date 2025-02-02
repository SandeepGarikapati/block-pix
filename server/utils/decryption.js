const crypto = require('crypto');

const decryptData = (encryptedData, iv, encryptionKey) => {
    try {
        // Convert IV from Base64 to Buffer if it's in string format
        if (typeof iv === 'string') {
            iv = Buffer.from(iv, 'base64');
        }

        // Validate IV
        if (!iv || !(iv instanceof Buffer) || iv.length !== 16) {
            throw new Error('Invalid IV: Must be a 16-byte Buffer.');
        }

        // Convert encryptedData from Base64 to Buffer if it's in string format
        if (typeof encryptedData === 'string') {
            encryptedData = Buffer.from(encryptedData, 'base64');
        }

        // Validate encryptedData
        if (!encryptedData || !(encryptedData instanceof Buffer)) {
            throw new Error('Invalid encryptedData: Must be a Buffer.');
        }

        // Convert encryptionKey to Buffer if it's in string format
        if (typeof encryptionKey === 'string') {
            encryptionKey = Buffer.from(encryptionKey, 'base64');
        }

        // Validate encryptionKey
        if (!encryptionKey || !(encryptionKey instanceof Buffer) || encryptionKey.length !== 32) {
            throw new Error('Invalid encryptionKey: Must be a 32-byte Buffer for aes-256-cbc.');
        }

        // Create a decipher object
        const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);

        // Decrypt the data
        const decryptedData = Buffer.concat([
            decipher.update(encryptedData),
            decipher.final(),
        ]);

        return decryptedData;
    } catch (error) {
        console.error('Decryption Error:', error.message);
        throw error; // Re-throw the error to handle it in the caller
    }
};

module.exports = { decryptData };
