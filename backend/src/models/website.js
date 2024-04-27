const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
    domain: { type: String, required: true },
    status: { 
        type: String, 
        required: true,
        enum: ["Por avaliar", "Em avaliação", "Avaliado", "Erro na avaliação"],
        default: "Por avaliar",
    }
});

const Website = mongoose.model("Website", websiteSchema);

module.exports = Website;
