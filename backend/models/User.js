import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    university: { type: String },
    address: { type: String },

    role: {
      type: String,
      enum: ["admin", "member", "guest"],
      default: "member",
      index: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// (optional helper)
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
