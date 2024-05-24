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
            module: { type: String, required: false},
            tests:[
                {
                    verdict: { type: String, required: false },
                    identificador: [{ type: String, required: false }]
                }
            ]
        }
    ],
    percentagens:[
        {
            passed: { type: Number, required: true, default: 0 },
            warning: { type: Number, required: true, default: 0 },
            failed: { type: Number, required: true, default: 0 },
            inapplicable: { type: Number, required: true, default: 0 },
        }
    ]
    
});

const PageEvaluation = mongoose.model("PageEvaluation", pageEvaluationSchema);

module.exports = PageEvaluation;
