const mongoose = require("mongoose");

const pageEvaluationSchema = new mongoose.Schema({
    modules: [
        {
            module: { type: String, required: true },
            fail_levels: { type: [String], required: true, default: [] },
            tests:[
                {
                    resultado: { type: String },
                    identificador: { type: String},
                    atributos: { type: [String], default: [] }
                }
            ]
        }
    ],
    tests_info:
        {
            tests_passed: {type: [String, Number],},
            tests_warning: {type: [String, Number],},
            tests_failed: {type: [String, Number],},
            tests_inapplicable: {type: [String, Number],}
        }
    
});

const PageEvaluation = mongoose.model("PageEvaluation", pageEvaluationSchema);

module.exports = PageEvaluation;
