const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Category = require("../models/category");
const Quiz = require("../models/quiz");
const SubCategory = require("../models/subcategory");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.quizById = (req, res, next, id) => {
  Quiz.findById(id).exec((err, quiz) => {
    if (err || !quiz) {
      return res.status(400).json({
        error: "Quiz does not exist",
      });
    }
    req.quiz = quiz;
    next();
  });
};

exports.photo = (req, res, next) => {
  if (req.quiz.photo.data) {
    res.set("Content-Type", req.quiz.photo.contentType);
    return res.send(req.quiz.photo.data);
  }
  next();
};

exports.read = (req, res) => {
  return res.json(req.quiz);
};

exports.list = (req, res) => {
  Quiz.find()
    .populate("category")
    .populate("subcategory")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    const { name, description } = fields;

    if (!name || !description) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let quiz = new Quiz(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      quiz.photo.data = fs.readFileSync(files.photo.path);
      quiz.photo.contentType = files.photo.type;
    }

    quiz.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    const { name, description } = fields;

    if (!name || !description) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let quiz = req.quiz;
    quiz = _.extend(quiz, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      quiz.photo.data = fs.readFileSync(files.photo.path);
      quiz.photo.contentType = files.photo.type;
    }

    quiz.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  const quiz = req.quiz;
  quiz.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Quiz deleted",
    });
  });
};
