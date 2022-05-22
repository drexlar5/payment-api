/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import mongoose from "mongoose"

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
  },  
  paymentDescription: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
},{
  timestamps : true
}).index({ paymentId: "text", userId: "text" });

export default mongoose.model("Payment", paymentSchema);
