export interface PageEvaluation{
    modules : [
        {
            module:String;
            fail_levels:String[]
        }
    ],
    testes_info?:[
        {
            module?: String,
            tests?:
            [
                {
                    verdict?: String,
                    identificador?: String
                }
            ]
        }
    ],
    percentagens?:[
        {
            passed?:Number,
            warning?: Number,
            failed?: Number,
            inapplicable?: Number,
        }

    ]
}