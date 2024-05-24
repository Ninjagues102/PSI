const { QualWeb } = require("@qualweb/core");
const Website = require("../models/website");

const plugins = {
    adBlock: false
};

const clusterOptions = {
    maxConcurrency: 1,
    timeout: 60 * 1000,
    monitor: true
};

const launchOption = {
    args: ['--no-sandbox', '--ignore-certificate-errors']
}

const ignoreModule = "best-practices";

class AccessibilityController {
    async processPages(websiteId, domain, pagesToProcess) {
        try {
            await Website.updateOne({ _id: websiteId }, { $set: { status: getStatus(1, true) } })
                .catch(err => reject(err));

            const pageReports = await this.getPageReports(domain, pagesToProcess);
            
            const now = new Date();

            Website.findById(websiteId)
                .then(async website => {
                    const pages = website.pages;
                    pageReports.forEach(pageReport => {
                        let pageToUpdate = pages.find(page => page._id.toString() === pageReport.pageId);
                        pageToUpdate.lastEvaluationDate = now;

                        if (pageReport.reports == null) {
                            pageToUpdate.status = getStatus(3);
                            return;
                        }

                        if (pageReport.reports.flatMap(report => report.fail_levels).length) {
                            pageToUpdate.status = getStatus(2);
                        } else {
                            pageToUpdate.status = getStatus(1);
                        }

                        pageToUpdate.evaluation = { 
                            modules: pageReport.reports,
                            percentagens: pageReport.per
                         };
                    });

                    website.pages = pages;
                    website.lastEvaluationDate = now;
                    if (pageReports.filter(pageReport => pageReport.reports === null).length) {
                        website.status = getStatus(3, true);
                    } else {
                        website.status = getStatus(2, true);
                    }

                    await website.save();
                })
        } catch (err) {
            console.error(err);
            Website.findById(websiteId)
                .then(website => {
                    website.status = getStatus(3, true);
                    website.save();
                });
        }
    }

    async getPageReports(domain, pages) {
        return await Promise.all(pages.map(async page => {
            try {
                const qualweb = new QualWeb(plugins);
                await qualweb.start(clusterOptions, launchOption);
                const report = await qualweb.evaluate({ url: domain + page.relativePath });
                await qualweb.stop();
                const finalReport = this.buildReport(report);
                const finalPer = this.buildPer(report);

                return {
                    pageId: page._id.toString(),
                    reports: finalReport,
                    per: finalPer
                };
            } catch (err) {
                console.error(err);
                return {
                    pageId: page._id.toString(),
                    reports: null
                };
            }
        }));
    }

    buildReport(report) {
        return Object.entries(report).map(([_, page]) => {
            return Object.entries(page["modules"])
                .filter(([moduleName, _]) => moduleName !== ignoreModule)
                .map(([moduleName, module]) => {
                    return {
                        module: moduleName,
                        tests: this.handleTests(module)
                    };
                })
                .reduce((acc, module) => acc.concat([module]), [])
                .flat();
        }).flat();
        /*console.log("------------------buildReport")
        console.log(ola)
        return ola*/
    }

    handleTests(module){
        return Object.values(module["assertions"])
            .map(assertion => {
                var conformidade = this.removeDups(assertion["metadata"]["success-criteria"].map(criteria => criteria["level"]) )
                return{
                    test_name: assertion["name"],
                    outcome: assertion["metadata"]["outcome"],
                    levels: conformidade,
                    results: this.handleResults(assertion) 
                }
            }).flat();
    }
    
    removeDups(data){
        return data.filter((value,index)=>data.indexOf(value)===index);
    }
    
    handleResults(assertion) {
        return  assertion["results"].map(result=>{
            return {
                verdict: result["verdict"],
                htmlCode: result["elements"].map(element=>element["htmlCode"])
            }
        })
        
    }

    buildPer(report) {
        return Object.entries(report).map(([_, page]) => {
            return{
                passed: Object.entries(page["metadata"])[0][1],
                warning: Object.entries(page["metadata"])[1][1],
                failed: Object.entries(page["metadata"])[2][1],
                inapplicable: Object.entries(page["metadata"])[3][1]
            }
        }).flat()
    }

}

const websitePossStatus = ["Por Avaliar","Em Avaliação", "Avaliado", "Erro na avaliação"];
const pagePossStatus = ["Por Avaliar", "Conforme", "Não conforme", "Erro na avaliação"];
const statusLength = 4;

/**
 * @param {number} statusIndex where:
 *
 * For Website:
 * - 0: Por Avaliar
 * - 1: Em Avaliação
 * - 2: Avaliado
 * - 3: Erro na avaliação
 *
 * For Page:
 * - 0: Por Avaliar
 * - 1: Conforme
 * - 2: Não conforme
 * - 3: Erro na avaliação
 * @param {boolean} isWebsite
 */
function getStatus(statusIndex, isWebsite = false) {
    if (statusIndex < 0 || statusIndex >= statusLength) return;

    if (isWebsite) return websitePossStatus.at(statusIndex);
    return pagePossStatus.at(statusIndex);
}


module.exports = { AccessibilityController };
