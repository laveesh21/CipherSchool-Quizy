import mongoose, { Schema } from "mongoose";
import QuestionSchema from './question.model.js'

const TestSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
  },
  evaluated: {
    type: Boolean,
    default: false,
  },
  questions: [QuestionSchema],
}, { timestamps: true });

const Test = mongoose.model('Test', TestSchema)

export default Test;
