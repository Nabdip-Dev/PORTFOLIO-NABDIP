import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, maxlength: 300 },
    content: { type: String, required: true },
    coverImage: { url: String, publicId: String },
    tags: [{ type: String }],
    published: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

postSchema.index({ title: "text", content: "text" });

export const Post = model("Post", postSchema);
export default Post;
