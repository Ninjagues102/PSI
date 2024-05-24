export interface PageEvaluation{
    modules : [
        {
            module:String,
            tests:[
                {
                    test_name:string,
                    outcome:string,
                    levels:string[],
                    results:[
                        {
                            verdict:string,
                            htmlCode:string[]
                        }
                    ]
                }
            ],
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