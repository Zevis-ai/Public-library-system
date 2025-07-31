import mongoose from "mongoose";


    // name: String;
    // numOfPage : number;
    // author: String;
    // genre: String;
    // publishedYear: number;
    // id: string;
    // isAvailable: boolean;
    // price: number;

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numOfPage : { type: Number, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  price: { type: Number, required: true }
});

const Book = mongoose.model('Book', bookSchema)

export default Book;