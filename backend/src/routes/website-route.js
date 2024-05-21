const express = require("express");

const Website = require("../models/website");

const router = express.Router();

const Page = require("../models/page");
const { AccessibilityController } = require("../controllers/AccessibilityController");

const accessibilityController = new AccessibilityController()

const websiteController = require("../controllers/websiteController")

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

router.post("/process/:id", async (req, res) => {
    Website.findById(req.params.id)
        .then(async website => {
            const pagesToProcess = req.body.pages;
            const validPages = pagesToProcess.every(pageToProcess =>
                website.pages.some(page => page._id.toString() === pageToProcess._id));

            if (!validPages) res.status(400).send();

            await accessibilityController.processPages(website._id, website.domain, pagesToProcess);
            res.status(200).send();
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
});

router.get("/:id", (req, res) => {
    Website.findById(req.params.id)
        .then(website => {
            res.json(website);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
});

router.get("/page/:id", (req, res) => {
    Page.findById(req.params.id)
        .then(page => {
            res.json(page);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
});


router.get("/:id/delete", websiteController.website_delete_get);

router.post("/:id/delete", websiteController.website_delete_post);

module.exports = router;
