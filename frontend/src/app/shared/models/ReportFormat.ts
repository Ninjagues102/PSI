export enum ReportFormat {
  HTML = "html",
  PDF = "pdf"
}

export interface HTMLReport {
  report: string
}

export interface PDFReport {
  report: {
    type: string,
    data: []
  }
}
