const fs = require("node:fs");
const path = require("node:path");
const Mustache = require("mustache");
const pdf = require("html-pdf");
const buffer = require("node:buffer");

const dateOptions = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: false
};

const pdfOptions = {
    format: "A4",
    border: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm"
    }
};


class ReportsController {

    constructor() {
        const templatePath = path.join(__dirname, "..", "templates", "report.mustache");
        this.template = fs.readFileSync(templatePath, "utf8");
    }

    getHtmlReport(website) {
        const reportData = {
            websiteUrl: website.domain,
            registryDate: website.registryDate,
            lastEvaluationDate: website.lastEvaluationDate.toLocaleString("pt-PT", dateOptions),
            pages: getPagesInfo(website.pages),
            pageStats: getPageStats(website.pages),
            topErrors: getTopErrors(website.pages, 10)
        };
        return Mustache.render(this.template, reportData);
    }

    getPdfReport(website) {
        return new Promise((resolve, reject) => {
            const html = this.getHtmlReport(website);
            pdf.create(html, pdfOptions).toBuffer((err, buffer) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });

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
    const pagesFails = pages
        .map(page => page.evaluation.modules
            .flatMap(module =>
                module.tests.filter(test =>
                    test.outcome === "failed"
                ).flatMap(test => test.levels)
            )
        );

    const noErrors = pages.filter(page => page.status === "Conforme").length;
    const errors = pagesFails.filter(fails => fails.length !== 0).length;
    const errorsA = pagesFails.filter(fail => fail.some(fail => fail === "A")).length;
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

function getTopErrors(pages, errorLimit) {
    const errors = pages
        .flatMap(page => page.evaluation.modules
            .flatMap(module => module.tests
                .flatMap(test => test.test_name)
            )
        );

    const keyCountMap = errors.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});

    errors.sort((a, b) => {
        return keyCountMap[b] - keyCountMap[a];

    });

    return errors.map(error => {
        return { "error": error };
    }).slice(0, errorLimit);
}

module.exports = { ReportsController };
