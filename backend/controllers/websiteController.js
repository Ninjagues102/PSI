const Website = require("../models/website");
const asyncHandler = require("express-async-handler");

exports.website_detail = asyncHandler(async (req, res, next) => {
    const  website  = await Website.findBYId(req.params.id)
        .populate("website")
        .exec();

    if (website === null) {
        const err = new Error("Website not found");
        err.status = 404;
        return next(err);
    }

    res.render("bookinstance_detail", {
        title: "Website:",
        website: website,
      });
});