const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
 
const imageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
      },
    img: {
        data: Buffer,
        contentType: String
    }
});

imageSchema.plugin(mongoosePaginate)
const Image = mongoose.model('Image', imageSchema);
module.exports.Image = Image;