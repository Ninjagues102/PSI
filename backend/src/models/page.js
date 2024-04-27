const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
    domain: { type: String, required: true },
    website: { type: Schema.Types.ObjectId, ref: "Website", required: true},
    status: { 
        type: String, 
        required: true,
        enum: ["Por avaliar", "Em avaliação", "Conforme", "Não conforme", "Erro na avaliação"],
        default: "Por avaliar",
    },
});

const Website = mongoose.model("Page", pageSchema);

module.exports = Website;
