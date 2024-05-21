const mongoose = require("mongoose");

const pageEvaluationSchema = new mongoose.Schema({
    modules: [
        {
            module: { type: String, required: true },
            fail_levels: { type: [String], required: true, default: [] }
        }
    ],
    tests_info:[
        {
            tests_passed: {type: Number, required: true},
            tests_warning: {type: Number, required: true},
            tests_failed: {type: Number, required: true},
            tests_inapplicable: {type: Number, required: true},
            tests: { type: [String], required: true, default: []}
        }
    ]
});

const PageEvaluation = mongoose.model("PageEvaluation", pageEvaluationSchema);

module.exports = PageEvaluation;
