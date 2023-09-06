const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const staffSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    occupation: {
        type: String,
        required: [true, "Name is required."],
      },
    
    img: {
        type: String,
        required: [true, 'Image is required.'],
    },
},
);

const Staff = model("Staff", staffSchema);

module.exports = Staff;