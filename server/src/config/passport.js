import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { _config } from "./config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: _config.GOOGLE_CLIENT_ID_OAUTH,
      clientSecret: _config.GOOGLE_CLIENT_SECRET_OAUTH,
      callbackURL: _config.GOOGLE_CLIENT_CALLBACK_OAUTH,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        return done(null, profile);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

export default passport;
