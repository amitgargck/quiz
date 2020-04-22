const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Category = require("../models/category");
const SubCategory = require("../models/subcategory");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.subcategoryById = (req, res, next, id) => {
  SubCategory.findById(id).exec((err, subcategory) => {
    if (err || !subcategory) {
      return res.status(400).json({
        error: "SubCategory does not exist",
      });
    }
    req.subcategory = subcategory;
    next();
  });
};

exports.photo = (req, res, next) => {
  if (req.subcategory.photo.data) {
    res.set("Content-Type", req.subcategory.photo.contentType);
    return res.send(req.subcategory.photo.data);
  }
  next();
};

exports.read = (req, res) => {
  return res.json(req.subcategory);
};

exports.list = (req, res) => {
  SubCategory.find()
    .populate("category")
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
    const { name } = fields;

    if (!name) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let subcategory = new SubCategory(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      subcategory.photo.data = fs.readFileSync(files.photo.path);
      subcategory.photo.contentType = files.photo.type;
    }

    subcategory.save((err, result) => {
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
    const { name } = fields;

    if (!name) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let subcategory = req.subcategory;
    subcategory = _.extend(subcategory, fields);
    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      subcategory.photo.data = fs.readFileSync(files.photo.path);
      subcategory.photo.contentType = files.photo.type;
    }

    subcategory.save((err, result) => {
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
  const subcategory = req.subcategory;
  subcategory.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Subcategory deleted",
    });
  });
};
