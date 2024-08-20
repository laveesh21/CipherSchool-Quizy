import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  selectedAnswer: {
    type: String,
  },
  options: {
    type: [String],
    required: true,
  },
});

export default QuestionSchema;

