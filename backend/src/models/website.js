const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
    domain: { type: String, required: true },
    status: { type: String, required: true },
    registryDate: { type: String, required: true},
    lastEvaluationDate: { type: String, required: false},
});

const Website = mongoose.model("Website", websiteSchema);

module.exports = Website;
