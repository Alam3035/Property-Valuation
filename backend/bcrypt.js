const bcrypt = require('bcrypt');

module.exports.hashPassword = (plainTextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            if (err) {
                reject(err);
            }

            bcrypt.hash(plainTextPassword, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};


module.exports.checkPassword = (plainTextPassword, hashedPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainTextPassword, hashedPassword, (err, match) => {
            if(err) {
                reject(err);
            }

            resolve(match);
        });
    });
};
