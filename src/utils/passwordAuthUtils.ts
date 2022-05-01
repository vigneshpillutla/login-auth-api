import crypto from 'crypto';

const isValidPassword = (password: string, hash: string, salt: string) => {
  let reHashed = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return hash === reHashed;
};

const genHashedPassword = (password: string) => {
  let salt = crypto.randomBytes(32).toString('hex');
  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  return {
    salt,
    hash
  };
};
export { isValidPassword, genHashedPassword };
