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

                        pageToUpdate.evaluation = { modules: pageReport.reports };
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
                return {
                    pageId: page._id.toString(),
                    reports: finalReport
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
                        fail_levels: this.handleModule(module)
                    };
                })
                .reduce((acc, module) => acc.concat([module]), [])
                .flat();
        }).flat();
    }

    handleModule(module) {
        return Object.values(module["assertions"])
            .map(assertion => assertion["metadata"])
            .filter(metadata => metadata["outcome"] === "failed")
            .map(metadata => {
                return metadata["success-criteria"].map(criteria => criteria["level"]);
            })
            .flat();
    }
}

const websitePossStatus = ["Por Avaliar", "Em Avaliação", "Avaliado", "Erro na avaliação"];
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
