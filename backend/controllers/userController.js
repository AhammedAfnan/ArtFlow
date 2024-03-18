require("dotenv").config();
const User = require("../models/user/userModel"),
  jwt = require("jsonwebtoken"),
  catchAsync = require("../util/catchAsync"),
  bcrypt = require("bcrypt"),
  Banner = require("../models/admin/BannerModel"),
  Notification = require("../models/artist/notificationModel"),
  otpTemplate = require("../util/otpTemplate"),
  Mail = require("../util/otpMailer"),
  Artist = require("../models/artist/artistModel"),
  ArtistNotificationModel = require("../models/artist/notificationModel"),
  randomString = require("randomstring"),
  chatModel = require("../models/user/chatModel"),
  chatMessage = require("../models/user/chatMessage");

exports.register = catchAsync(async (req, res) => {
  const { name, mobile, email, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.json({ error: "User already exists" });
  }
  const mobileExists = await User.findOne({ mobile: mobile });
  if (mobileExists) {
    return res.json({ error: "mobile number already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newOtp = randomString.generate({
    length: 4,
    charset: "numeric",
  });

  const user = new User({
    name,
    mobile,
    password: hashedPassword,
    email,
    otp: {
      code: newOtp,
      generatedAt: Date.now(),
    },
  });
  const newUser = await user.save();

  if (newUser) {
    const options = {
      from: process.env.Email,
      to: email,
      subject: "ArtFlow register verification OTP",
      html: otpTemplate(newOtp),
    };
    await Mail.sendMail(options);
    return res.json({ success: "otp sented to mail", email });
  }
});

exports.getCurrentUser = catchAsync(async (req, res) => {
  const currentUser = await User.findById(req.userId);
  if (currentUser.isBlocked) {
    return res.json({ error: "You are blocked by admin", currentUser });
  }
  return res.status(200).json({ success: "ok" });
});

exports.verifyOtp = catchAsync(async (req, res) => {
  if (!req.body.otp) {
    return res.json({ error: "please enter otp" });
  }
  const user = await User.findOne({ email: req.body.email });
  const generatedAt = new Date(user.otp.generatedAt).getTime();
  if (Date.now() - generatedAt <= 60 * 1000) {
    if (req.body.otp === user.otp.code) {
      user.isVerified = true;
      (user.otp.code = ""), (user.otp.generatedAt = null);
      await user.save();
      return res
        .status(200)
        .json({ success: "Otp verified successfully", email: req.body.email });
    } else {
      return res.json({ error: "otp is invalid" });
    }
  } else {
    return res.json({ error: "otp expired" });
  }
});

exports.verifyLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({ error: "User not found" });
  }
  const samePass = await bcrypt.compare(password, user.password);
  if (!samePass) {
    return res.json({ error: "invalid password" });
  }
  if (user.isBlocked) {
    return res.json({ error: "sorry, you are blocked by the Admin!" });
  }
  if (!user.isVerified) {
    await User.findOneAndDelete({ email: email });
    return res.json({ error: "sorry, you are not verified!, sign up again" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return res.status(200).json({ success: "Login Successfull", token, user });
});

exports.ResendOtp = catchAsync(async (req, res) => {
  if (!req.body.email) {
    return res.json({ error: "email not found!" });
  }
  const user = await User.findOne({ email: req.body.email });

  const newOtp = randomString.generate({
    length: 4,
    charset: "numeric",
  });

  const options = {
    from: process.env.Email,
    to: req.body.email,
    subject: "Arthub verification otp",
    html: otpTemplate(newOtp),
  };
  await Mail.sendMail(options)
    .then((res) => console.log("otp sended"))
    .catch((err) => console.log(err.message));

  user.otp.code = newOtp;
  user.otp.generatedAt = Date.now();
  await user.save();
  return res
    .status(200)
    .json({ success: "Otp Resended", email: req.body.email });
});

exports.forgetVerifyEmail = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  const newOtp = randomString.generate({
    length: 4,
    charset: "numeric",
  });

  if (user) {
    const options = {
      from: process.env.EMAIL,
      to: email,
      subject: "ArtFlow Email verification OTP for forget password",
      html: otpTemplate(newOtp),
    };
    await Mail.sendMail(options);
    await User.findOneAndUpdate(
      { email: email },
      { $set: { otp: { code: newOtp, generatedAt: Date.now() } } },
      { new: true }
    );
    return res.status(200).json({ success: "otp sended to your Email", email });
  }
});

exports.updatePassword = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const hashPassword = await bcrypt.hash(password, 10);
  if (user) {
    user.password = hashPassword;
    await user.save();
    return res.status(200).json({ success: "password changed successfully" });
  }
  return res.status(200).json({ error: "password changing failed" });
});

exports.updateUserProfile = catchAsync(async (req, res) => {
  const { name, mobile } = req.body;
  if (req.body.userProfile) {
    const updateUser = await User.findByIdAndUpdate(
      { _id: req.userId },
      {
        $set: {
          name,
          mobile,
          profile: req.body.userProfile,
        },
      },
      { new: true }
    );
    if (updateUser) {
      return res
        .status(200)
        .json({ success: "profile updated successfully", updateUser });
    }
  }
  if (!req.body.userProfile) {
    const updateUser = await User.findByIdAndUpdate(
      { _id: req.userId },
      {
        $set: {
          name,
          mobile,
        },
      },
      { new: true }
    );
    if (updateUser) {
      return res
        .status(200)
        .json({ success: "profile updated successfully", updateUser });
    }
  }
  return res.status(200).json({ error: "profile updating failed" });
});

exports.getAllBanners = catchAsync(async (req, res) => {
  const banners = await Banner.find({ isDeleted: false }).sort({
    createdAt: -1,
  });
  if (banners) {
    return res.status(200).json({ success: "ok", banners });
  }
  return res.json({ error: "failed to get banners" });
});

exports.followArtist = catchAsync(async (req, res) => {
  const { artistId } = req.body;
  const updatedArtist = await Artist.findByIdAndUpdate(
    artistId,
    { $push: { followers: req.userId } },
    { new: true }
  );

  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { $push: { followings: artistId } },
    { new: true }
  );

  // to send notification to artist
  const Notify = {
    receiverId: artistId,
    senderId: req.userId,
    notificationMessage: `${updatedUser.name} started following you`,
    date: new Date(),
  };
  const newNotification = new ArtistNotificationModel(Notify);
  newNotification.save();

  if (updatedArtist && updatedUser) {
    return res.status(200).json({ success: "ok", updatedUser, updatedArtist });
  }
  return res.status(200).json({ error: "failed" });
});

exports.unFollowArtist = catchAsync(async (req, res) => {
  const { artistId } = req.body;
  const updatedArtist = await Artist.findByIdAndUpdate(
    artistId,
    { $pull: { followers: req.userId } },
    { new: true }
  );
  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { $pull: { followings: artistId } },
    { new: true }
  );

  // to send notification to artist
  const Notify = {
    receiverId: artistId,
    senderId: req.userId,
    notificationMessage: `${updatedUser.name} has stopped following you`,
    date: new Date(),
  };
  const newNotification = new ArtistNotificationModel(Notify);
  newNotification.save();

  if (updatedArtist && updatedUser) {
    return res.status(200).json({ success: "ok", updatedUser, updatedArtist });
  }
  return res.status(200).json({ error: "failed" });
});

exports.getAllArtists = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 3; // Adjust the page size as needed
  const query = {
    isApproved: true,
    isBlocked: false,
    isVerified: true,
    // isSubscribed: true
  };

  const totalArtists = await Artist.countDocuments(query);
  const totalPages = Math.ceil(totalArtists / pageSize);

  const artists = await Artist.find(query)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({
      "ratings.rating": -1, // Sort in descending order of rating
      createdAt: -1, // Secondary sort by createdAt in descending order
    });

  if (artists) {
    return res.status(200).json({
      success: "ok",
      artists,
      currentPage: page,
      totalPages,
    });
  }

  return res.status(200).json({ error: "failed to fetch artists" });
});

exports.getArtistFollowers = catchAsync(async (req, res) => {
  const artist = await Artist.findById(req.body.artistId).populate("followers");
  const followers = artist.followers;
  if (followers.length) {
    return res.status(200).json({ success: "ok", followers });
  }
  return res.status(200).json({ error: "No followers found" });
});

exports.getUserFollowings = catchAsync(async (req, res) => {
  const user = await User.findById(req.userId).populate("followings");
  const followings = user.followings;
  if (followings.length) {
    return res.status(200).json({ success: "ok", followings });
  }
  return res.status(200).json({ error: "No followings found" });
});

exports.getUserFollowings = catchAsync(async (req, res) => {
  const user = await User.findById(req.userId).populate("followings");
  const followings = user.followings;
  if (followings.length) {
    return res.status(200).json({ success: "ok", followings });
  }
  return res.status(200).json({ error: "No followings found" });
});


//notifications

exports.getNotificationCount = catchAsync(async (req, res) => {
  const userId = req.userId;
  const count = await Notification.countDocuments({
    receiverId: userId,
    seen: false,
  });
  const messagesCount = await chatMessage
    .find({ userId: userId, isUserSeen: false })
    .countDocuments();
  return res.status(200).json({ success: true, count, messagesCount });
});


exports.getUserNotifications = catchAsync(async (req, res) => {
  const userId = req.userId;

  // Update notifications to mark them as seen
  await Notification.updateMany(
    { receiverId: userId, seen: false },
    { $set: { seen: true } }
  );

  // Fetch notifications with populated relatedPostId, comments, and their postedBy
  const notifications = await Notification.find({ receiverId: userId })
    .sort({ date: -1 })
    .populate({
      path: "relatedPostId",
      populate: [
        {
          path: "postedBy",
          model: "artist",
        },
        {
          path: "comments.postedBy",
          model: "user",
        },
      ],
    });

  return res.status(200).json({ notifications, success: true });
});
