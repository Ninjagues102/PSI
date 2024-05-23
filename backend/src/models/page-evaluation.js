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
                    identificador: { type: String, required: false }
                }
            ]
        }
    ],
    percentagens:[
        {
            passed: { type: Number, required: false },
            warning: { type: Number, required: false },
            failed: { type: Number, required: false },
            inapplicable: { type: Number, required: false },
        }
    ]
    
});

const PageEvaluation = mongoose.model("PageEvaluation", pageEvaluationSchema);

module.exports = PageEvaluation;
