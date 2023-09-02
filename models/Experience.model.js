const { Schema, model } = require("mongoose");


const experienceSchema = new Schema({
  title: { 
    type: String, 
    required: [true, "Tittle is required."] 
  },
  location: { 
    type: String, 
    required: [true, "Location is required."]
  },
  experienceType: {
    type: String,
    enum:["Xtreme", "Cultural", "Gastronomic"], 
    required: [true, "Experience type is required"]
  },
  description: { 
    type: String, 
    required: [true, "Description is required."]
  },
  duration: { 
    type: String, 
    required: [true, "Duration is required."]
  },
  price: { 
    type: Number, 
    required: [true, "Price is required."] 
  },
  imageUrl: { 
    type: String, 
    required: [true, "Image is required."] 
  },
  tags: [{ type: String }],
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],

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