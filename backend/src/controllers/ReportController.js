import * as fs from "node:fs";

class ReportController {
    constructor() {
        const template = fs.readFileSync("./templates/report.mustache", "utf8");
    }

    getHtmlReport(website) {
        const reportData = {
            websiteUrl: website.domain,
            registryDate: website.registryDate,
            lastEvaluationDate: website.lastEvaluationDate,
            pages: getPagesInfo(website.pages),
            pageStats: getPageStats(website.pages)
        };
    }
}

function getPagesInfo(pages) {
    return pages.map(page => {
        return {
            path: page.relativePath,
            lastEvaluationDate: page.lastEvaluationDate,
            status: page.status
        };
    });
}

function getPageStats(pages) {
    const pagesFails = pages.map(page => page.evaluation.modules.flatMap(module => module.fail_levels));

    const noErrors = pagesFails.filter(fails => fails.length === 0).length;
    const errors = pagesFails.filter(fails => fails.length !== 0).length;
    const errorsA = pagesFails.filter(fails => fails.some(fail => fail === "A")).length;
    const errorsAA = pagesFails.filter(fails => fails.some(fail => fail === "AA")).length;
    const errorsAAA = pagesFails.filter(fails => fails.some(fail => fail === "AAA")).length;

    return {
        noErrors: noErrors,
        errors: errors,
        errorsA: errorsA,
        errorsAA: errorsAA,
        errorsAAA: errorsAAA,
        noErrorsPercentage: (noErrors / pagesFails.length) * 100,
        errorsPercent: (errors / pagesFails.length) * 100,
        errorsAPercent: (errorsA / pagesFails.length) * 100,
        errorsAAPercent: (errorsAA / pagesFails.length) * 100,
        errorsAAAPercent: (errorsAAA / pagesFails.length) * 100
    };
}
