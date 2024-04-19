const express = require("express");

const Website = require("../models/website");

const router = express.Router();

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

module.exports = router;
