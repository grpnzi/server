const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is required."],
    },
    author: { 
      type: Schema.Types.ObjectId, ref: 'User' ,
      required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],  // ponemos brackets ya que es una lista
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;