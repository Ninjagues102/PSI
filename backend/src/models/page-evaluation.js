const mongoose = require("mongoose");

const pageEvaluationSchema = new mongoose.Schema({
    modules: [
        {
            module: { type: String, required: true },
            tests:[
                {
                    test_name: { type: String, required: true },
                    outcome: { type: String, required: true },
                    levels: { type: [String], required: true, default: [] },
                    results: [
                        {
                            verdict: { type: String, required: true },
                            htmlCode: { type: [String], required: true, default: [] },
                        }
                    ]
                }
            ],
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
