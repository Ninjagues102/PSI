const express = require("express");

const Website = require("../models/website");

const router = express.Router();

const website_controller = require("../../controllers/websiteController");

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
    const { domain, status } = req.body;

    const website = new Website({
        domain,
        status,
        registryDate,
        lastEvaluationDate
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

router.get("/website/:id", website_controller.website_detail);

module.exports = router;
