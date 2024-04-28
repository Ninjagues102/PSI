const express = require("express");

const Website = require("../models/website");

const router = express.Router();

const website_controller = require("../../controllers/websiteController");
const Page = require("../models/page");

router.get("/", (_, res) => {
    Website.find()
        .then((websites) => {
            res.json(websites);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
});

router.post("/", (req, res) => {
    const { domain, pages } = req.body;

    const pagesSchema = pages.map(page => new Page({
        relativePath: page.relativePath
    }));

    const website = new Website({
        domain: domain,
        pages: pagesSchema,
    });

    website.save({ validateBeforeSave: true })
        .then((newWebsite) => {
            res.json(newWebsite);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
});

router.get("/:id", (req, res) => {
    console.log("here")
    Website.findById(req.params.id)
        .then(website => {
            res.json(website);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
});

module.exports = router;
