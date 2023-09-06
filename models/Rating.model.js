const { Schema, model } = require("mongoose");

const ratingsSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, "Rating is required."],
    },
    author: { 
      type: Schema.Types.ObjectId, ref: 'User' ,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Rating = model("Rating", ratingsSchema);

module.exports = Rating;