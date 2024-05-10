const mongoose = require("mongoose");
const Page = require("./page");

const websiteSchema = new mongoose.Schema({
    domain: { type: String, required: true },
    status: { 
        type: String, 
        required: true,
        enum: ["Por Avaliar", "Em Avaliação", "Avaliado", "Erro na avaliação"],
        default: "Por Avaliar",
    },
    pages: [Page.schema],
    registryDate: { type: Date, required: true, default: () => Date.now()},
    lastEvaluationDate: { type: Date, required: false},
});

const Website = mongoose.model("Website", websiteSchema);

module.exports = Website;
