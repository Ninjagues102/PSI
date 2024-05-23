const mongoose = require("mongoose");

const pageEvaluationSchema = new mongoose.Schema({
    modules: [
        {
            module: { type: String, required: true },
            fail_levels: { type: [String], required: true, default: [] },
        }
    ],
    tests_info:[
        {
            module: { type: String},
            tests:[
                {
                    verdict: { type: String},
                    identificador: { type: String}
                }
            ]
        }
    ]
    
});

const PageEvaluation = mongoose.model("PageEvaluation", pageEvaluationSchema);

module.exports = PageEvaluation;
