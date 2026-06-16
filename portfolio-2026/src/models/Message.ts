import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { 
      type: String, 
      required: [true, 'Name field is strictly required.'],
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, 'Email field is strictly required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email structure.'],
      trim: true 
    },
    message: { 
      type: String, 
      required: [true, 'Message content cannot be empty.'],
      trim: true 
    },
  },
  { timestamps: true }
);

const Message = models.Message || model<IMessage>('Message', MessageSchema);

export default Message;