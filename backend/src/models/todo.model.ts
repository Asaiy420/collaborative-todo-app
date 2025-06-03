import mongoose, { Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  status: boolean;
  dueDate: Date;
  owner: mongoose.Types.ObjectId;
  collaborators: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new mongoose.Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
