import { Component, Inject, OnInit } from "@angular/core";
import { Website } from "../shared/models/website.model";
import { WebsiteService } from "../core/website.service";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { WebsitesComponent } from "../websites/websites.component";
import { Page, PageStatus } from "../shared/models/page.model";
import { PageDetailComponent } from "../page-detail/page-detail.component";
import { HTMLReport, PDFReport } from "../shared/models/ReportFormat";

export interface TableElememt{
  position:number;
  total:number;
  percentagem:number;
  type:String;
}


@Component({
  selector: 'app-website-detail',
  templateUrl: './website-detail.component.html',
  styleUrls: ['./website-detail.component.sass']
})
export class WebsiteDetailComponent implements OnInit {
  website?: Website;
  pagess: Page[] = [];
  a_error = 0;
  aa_error = 0;
  aaa_error = 0;
  error = 0;
  no_error = 0;
  per_a = 0;
  per_aa = 0;
  per_aaa = 0;
  per_error = 0;
  per_no_error = 0;
  tests_errors = new Map<string, number>();
  testsToPresent: string[] = [];
  displayedColumns: string[] = ['total', 'percentagem', 'type'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: TableElememt[] = [];

  constructor(
    private webService: WebsiteService,
    @Inject(MAT_DIALOG_DATA) public websiteId: string,
    private websitesComponent: WebsitesComponent,
    private dialog: MatDialog
  ){}

  async ngOnInit(): Promise<void> {
    this.getWebsite()
  }

  getWebsite(){
    if (!this.websiteId) return;
    this.webService.getWebsite(this.websiteId)
    .subscribe(website =>{
      this.website = website;
      this.getData(website);
    });
  }

  getData(website: Website){
    website.pages.forEach(page =>{
      var has_a = false;
      var has_aa = false;
      var has_aaa = false;
      if(page.status==PageStatus.COMPLIANT){
        this.no_error+=1;
      }
      else{
        this.error+=1;
        page.evaluation.modules.forEach(m => {
          m.tests.forEach(
            t => {
              if(t.outcome=="failed"){
                var contagem = this.tests_errors.get(t.test_name)||0;
                this.tests_errors.set(t.test_name,contagem+1)
                t.levels.forEach(level => {
                if(level=="A" && !has_a){
                  has_a=true;
                    this.a_error+=1;
                  }else if(level=="AA" && !has_aa){
                    has_aa=true;
                    this.aa_error+=1;
                  }else if(level=="AAA" && !has_aaa){
                    has_aaa=true;
                    this.aaa_error+=1;
                  }
                });

              }
            })



        });
      }
    });
    this.per_a = (this.a_error / website.pages.length)*100;
    this.per_aa = (this.aa_error / website.pages.length)*100;
    this.per_aaa = (this.aaa_error / website.pages.length)*100;
    this.per_error = (this.error / website.pages.length)*100;
    this.per_no_error = (this.no_error / website.pages.length)*100;
    this.data = [
      {position:1, total: this.no_error, percentagem: this.per_no_error, type: "Sem erro"},
      {position:2, total: this.error, percentagem: this.per_error, type: "erro"},
      {position:3, total: this.a_error, percentagem: this.per_a, type: "A"},
      {position:4, total: this.aa_error, percentagem: this.per_aa, type: "AA"},
      {position:5, total: this.aaa_error, percentagem: this.per_aaa, type: "AAA"},
    ]
    let sortedArray = Array.from(this.tests_errors);
    sortedArray.sort((a, b) => b[1] - a[1]);
    sortedArray = sortedArray.slice(0, 10);
    this.tests_errors = new Map(sortedArray);
    this.testsToPresent = Array.from(this.tests_errors.keys())
  }



  getWebsites(): void {
    this.webService.getWebsites()
      .subscribe(websites => {
        this.websitesComponent.websites = websites;
        this.websitesComponent.websitesToBePresented = websites;
        this.websitesComponent.sortData(this.websitesComponent.activeSort);
      });
    }

    removeWebsite(website:Website) {
      this.webService.deleteWebsite(website);
      this.websitesComponent.removeFromList(website);
  }

  evaluationDetails(page: Page) {
    const dialogRef = this.dialog.open(PageDetailComponent, {
      height: "65%",
      width: "100%",
      data: [page._id, this.website],
    });
    dialogRef.afterClosed().subscribe(_ => {
    })
  }

  downloadHtml() {
    this.webService.getHtmlReport(this.websiteId).subscribe((htmlReport: HTMLReport) => {
      const a = document.createElement("a");
      a.href = `data:text/html;charset=utf-8,${encodeURIComponent(htmlReport.report)}`;
      a.target = '_blank';
      a.setAttribute("download", `report_${this.website?.domain}.html`)
      a.dispatchEvent(new MouseEvent('click'));
    })
  }

  downloadPdf() {
    this.webService.getPdfReport(this.websiteId).subscribe((pdfReport: PDFReport) => {
      const pdfBlob = new Blob([new Uint8Array(pdfReport.report.data)], { type: "application/pdf" });

      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.target = '_blank';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
