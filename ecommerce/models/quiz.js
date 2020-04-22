const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const quizSchema = new mongoose.Schema(
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

        subcategory: {
            type: ObjectId,
            ref: "SubCategory",
            required: true
        },
        description: {
            type: String,
            required: true
        },
        photo: {
            data: Buffer,
            contentType: String
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
