const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
    relativePath: { type: String, required: true },
    status: {
        type: String, 
        required: true,
        enum: ["Por avaliar", "Em avaliação", "Conforme", "Não conforme", "Erro na avaliação"],
        default: "Por avaliar",
    },
    registryDate: { type: Date, required: true, default: () => Date.now() },
    lastEvaluationDate: { type: Date, required: false },
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
