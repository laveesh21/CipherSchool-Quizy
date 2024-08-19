export interface User {
  _id: string; // Mongoose automatically assigns an ObjectId, but it's usually accessed as a string
  userId: string;
  username: string;
  email: string;
  password: string;
  fullname?: string;
  aggrement?: boolean;
  summary?: string;
  avatar?: string;
  githubLink?: string;
  linkedLink?: string;
  instagramLink?: string;
  twitterLink?: string;
  uploadedProjects?: string[]; // Array of ObjectId references to Project, represented as strings
  refreshToken?: string;
  createdAt?: Date; // Mongoose adds these fields automatically with timestamps: true
  updatedAt?: Date; // Mongoose adds these fields automatically with timestamps: true
}

