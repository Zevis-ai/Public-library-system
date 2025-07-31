import mongoose from "mongoose";

// name: string;
// age: number;
// phone: string;
// email: string;
// id: ObjectID;
// password: hashedd;
// isHaveABook: boolean;
// book: ObjectId (Books)

// Optional:
// Amount of money / חוב



const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isHaveABook: { type: Boolean, default: false },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  amountOfMoney: { type: Number, default: 0 },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});




const User = mongoose.model("User", userSchema);

export default User