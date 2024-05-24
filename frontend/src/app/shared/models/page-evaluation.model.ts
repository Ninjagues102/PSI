export interface PageEvaluation{
    modules : [
        {
            module:String;
            fail_levels:String[]
        }
    ],
    testes_info:[
        {
            module: string,
            tests:
            [
                {
                    verdict: string,
                    identificador: string
                }
            ]
        }
    ],
    percentagens:[
        {
            passed:number,
            warning: number,
            failed: number,
            inapplicable: number,
        }

    ]
}