import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVers } from "./env";
import { User } from "../module/user/userModel";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { AiChatModel } from "../module/setting/aiChat/aiChat.model";
import { AppearanceModel } from "../module/setting/appearance/appearance.model";
import { CollaborationModel } from "../module/setting/collaboration/collaboration.model";
import { languageModel } from "../module/setting/language/language.model";
import { NotificationModel } from "../module/setting/notifications/notifications.model";
import { PrivacyModel } from "../module/setting/privacy/privacy.model";
import { ProductivityEnhancements } from "../module/setting/Productivity/productivity.model";
import { ProjectTaskModel } from "../module/setting/projectTask/projectTask.model";


passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, async (email: string, password: string, done: any) => {
  const isExistuser = await User.findOne({ email: email });

  if (!isExistuser) {
    return done(null, false, { message: "User not found" });
  };

  const matchPassword = await bcrypt.compare(password as string, isExistuser?.password as string);

  if (!matchPassword) {
    return done(null, false, { message: "Invalid password" });
  };

  done(null, isExistuser);

}))

passport.use(
  new GoogleStrategy({
    clientID: envVers.PASSPORT.GOOGLE_CLIENT_ID,
    clientSecret: envVers.PASSPORT.GOOGLE_CLINT_SECRATE,
    callbackURL: envVers.PASSPORT.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"]
  }, async (accessToken, refreshToken, profile: Profile, done: VerifyCallback) => {
    try {
      const email = profile.emails?.[0]?.value;

      if (!email) {
        return done(null, false, { message: "Email not found" });
      };

      let user = await User.findOne({ email: email });

      if (!user) {
        user = await User.create({
          username: profile.displayName,
          email: email,
          profile: profile.photos?.[0]?.value,
          isDeleted: false,
          isVerifid: true,
          auths: [
            {
              provider: "Google",
              providerId: profile.id
            }
          ]
        });

        await Promise.all([
          AiChatModel.create({ userId: user._id }),
          AppearanceModel.create({ userId: user._id }),
          CollaborationModel.create({ userId: user._id }),
          languageModel.create({ userId: user._id }),
          NotificationModel.create({ userId: user._id }),
          PrivacyModel.create({ userId: user._id }),
          ProductivityEnhancements.create({ userId: user._id }),
          ProjectTaskModel.create({ userId: user._id }),
        ]);

      };


      return done(null, user);
    } catch (error) {
      console.log("Google Strategy Error", error);
      return done(error);
    }
  })
);


// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: envVers.PASSPORT.GOOGLE_CLIENT_ID,
//       clientSecret: envVers.PASSPORT.GOOGLE_CLINT_SECRATE,
//       callbackURL: envVers.PASSPORT.GOOGLE_CALLBACK_URL,
//       scope: ["profile", "email"],
//     },
//     async (
//       accessToken: string,
//       refreshToken: string,
//       profile: Profile,
//       done: VerifyCallback
//     ) => {
//       const session = await User.startSession();
//       session.startTransaction();

//       try {
//         const email = profile.emails?.[0]?.value;

//         if (!email) {
//           try {
//             await session.abortTransaction();
//             session.endSession();
//             return done(null, false, { message: "Email not found in profile" });
//           } catch (error) {
//             await session.abortTransaction();
//             session.endSession();
//             return done(error);
//           }
//         };

//         if (!profile.id) {
//           await session.abortTransaction();
//           session.endSession();
//           return done(null, false, { message: "Profile id not found" });
//         }


//         let user = await User.findOne({ email }).session(session);

//         console.log(profile);

//         if (!user) {
//           const newUser = await User.create(
//             {
//               username: profile.displayName,
//               email,
//               profile: profile.photos?.[0]?.value,
//               isDeleted: false,
//               isVerifid: true,
//               auths: [
//                 {
//                   provider: "Google",
//                   providerId: profile.id,
//                 },
//               ],
//             },
//             { session }
//           );

//           if (!newUser) {
//             throw new AppError(400, "User creation failed");
//           }

//           const userId = newUser[0]?._id;


//           await Promise.all([
//             AiChatModel.create([{ userId }], { session }),
//             AppearanceModel.create([{ userId }], { session }),
//             CollaborationModel.create([{ userId }], { session }),
//             languageModel.create([{ userId }], { session }),
//             NotificationModel.create([{ userId }], { session }),
//             PrivacyModel.create([{ userId }], { session }),
//             ProductivityEnhancements.create([{ userId }], { session }),
//             ProjectTaskModel.create([{ userId }], { session }),
//           ]);

//           await session.commitTransaction();
//           session.endSession();

//           return done(null, newUser);
//         }


//         await session.commitTransaction();
//         session.endSession();
//         return done(null, user);
//       } catch (error: any) {
//         console.error("Google Strategy Error:", error.message);
//         await session.abortTransaction();
//         session.endSession();
//         return done(error, false, { message: "Google login failed" });
//       }
//     }
//   )
// );


passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id)
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);

  } catch (error) {
    console.log("Pasport de-serialized error", error);
    done(error);
  }
})