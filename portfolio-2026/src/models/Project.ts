import mongoose, { Schema, Document, model, models } from 'mongoose';

// 1. Define the TypeScript Interface for the Project
export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
  createdAt: Date;
}

// 2. Define the Mongoose Schema
const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    githubUrl: { type: String },
    liveUrl: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// 3. Export the Model
// Note: We check if the model already exists (models.Project) to prevent 
// re-defining it during Next.js Hot Module Replacement.
const Project = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;