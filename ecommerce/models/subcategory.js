const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: false
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
