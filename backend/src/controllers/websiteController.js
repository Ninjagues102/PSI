const Website = require("../models/website");
const asyncHandler = require("express-async-handler");

exports.website_detail = asyncHandler(async (req, res, next) => {
    const website  = await Website.findById(req.params.id)
        .populate("website")
        .exec();

    if (website === null) {
        const err = new Error("Website not found");
        err.status = 404;
        return next(err);
    }

    res.render("website_detail", {
        title: "Website:",
        website: website,
      });
});


exports.website_delete_get = asyncHandler(async (req, res, next) => {
    
    const [website, allWebsitePages] = await Promise.all([
      Website.findById(req.params.id).exec(),
      Website.findById(req.params.id).pages,
    ]);
  });
  


exports.website_delete_post = asyncHandler(async (req, res, next) => {
    
    const [website, allWebsitePages] = await Promise.all([
        Website.findById(req.params.id).exec(),
        Website.findById(req.params.id).pages,
    ]);

    await Website.findByIdAndDelete(website.id);
  });
  
  