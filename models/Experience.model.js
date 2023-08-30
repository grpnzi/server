const { Schema, model } = require("mongoose");


const experienceSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  experienceType: {enum:["Xtreme", "Cultural", "Gastronomic"]},
  description: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  tags: [{ type: String }],
  ratings: { type: Schema.Types.ObjectId, ref: 'User'},
  },
  {
    timestamps: true
  }

);

experienceSchema.virtual("averageRating").get(function () {
    if (this.ratings.length === 0) {
      return 0; // Return 0 if there are no reviews
    }
  
    const totalScore = this.ratings.reduce((sum, review) => {
      return sum + review.score;
    }, 0);
  
    const score = totalScore / this.reviews.length;
    const scoreDecimal = Math.round(score*10)/10
    return scoreDecimal
  });

const Experience = model('Experience', experienceSchema);

module.exports = Experience;