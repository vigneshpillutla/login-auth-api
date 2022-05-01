import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
import { User } from '../../models/user';
import { isValidPassword } from '../../utils/passwordAuthUtils';

const fieldOptions = {
  usernameField: 'email',
  passwordField: 'password'
};

const localStrategy = new LocalStrategy(
  fieldOptions,
  (username, password, done) => {
    User.findOne({ email: username })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        const { hash, salt } = user;
        if (!isValidPassword(password, hash, salt)) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err) => done(err, false));
  }
);

export default localStrategy;
