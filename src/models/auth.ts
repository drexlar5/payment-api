/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import mongoose from "mongoose"

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
}).index({ email: "text", userId: "text" });

export default mongoose.model("User", userSchema);
