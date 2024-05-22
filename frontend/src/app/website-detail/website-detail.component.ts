import { Component, Inject, OnInit } from "@angular/core";
import { Website, WebsiteStatus } from "../shared/models/website.model";
import { WebsiteService } from "../core/website.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { WebsitesComponent } from "../websites/websites.component";
import { PageStatus } from "../shared/models/page.model";

export interface TableElement {
  position: number;
  total: number;
  percentagem: number;
  type: String;
}


@Component({
  selector: 'app-website-detail',
  templateUrl: './website-detail.component.html',
  styleUrls: ['./website-detail.component.sass']
})
export class WebsiteDetailComponent implements OnInit {
  website?: Website;
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
  displayedColumns: string[] = ['total', 'percentagem', 'type'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: TableElement[] = [];

  constructor(
    private webService: WebsiteService,
    @Inject(MAT_DIALOG_DATA) public websiteId: string,
    private websitesComponent: WebsitesComponent
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
  protected readonly WebsiteStatus = WebsiteStatus;

  removeWebsite(website:Website) {
    this.webService.deleteWebsite(website);
    this.websitesComponent.removeFromList(website);
    this.webService.getWebsites();
  }

  getData(website: Website){
    website.pages.forEach(page => {
      let has_a = false;
      let has_aa = false;
      let has_aaa = false;
      if (page.status == PageStatus.COMPLIANT) {
        this.no_error += 1;
      }
      else{
        this.error += 1;
        page.evaluation.modules.forEach(m => {
          m.fail_levels.forEach(level => {
            if (level == "A" && !has_a) {
              has_a=true;
              this.a_error += 1;
            } else if (level == "AA" && !has_aa) {
              has_aa=true;
              this.aa_error += 1;
            } else if (level == "AAA" && !has_aaa) {
              has_aaa=true;
              this.aaa_error += 1;
            }
          });
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
  }
}
