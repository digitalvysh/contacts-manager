const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const SECRET = "contact123"

async function genHash(password) {
    return new Promise((res, rej) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) {
                rej(err);
            } else {
                res(hash);
            }
        });
    })
};

async function comparePassword(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
}

function genToken(isuserExists) {
    const token = jwt.sign({
        email: isuserExists.email,
    }, SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = {genHash,comparePassword,genToken}