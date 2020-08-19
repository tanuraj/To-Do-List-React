const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const db = config.get("mongoURI");

const admin_db_migration = async () => {
  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash("Admin#123", salt);
  let user = await new User({
    email: "admin@yopmail.com",
    first_name: "admin",
    password: password,
    role: [
      {
        user_type: 1
      }
    ]
  });
  await user.save();
};

try {
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  let promise_returned = admin_db_migration();
  promise_returned.then(() => {
    mongoose.disconnect();
    console.log("Admin Created. Email- admin@yopmail.com, Password- Admin#123");
    process.exit(1);
  });
} catch (err) {
  console.log("Unable to create Admin.");
  process.exit(1);
}