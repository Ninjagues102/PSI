import { Component, Inject, OnInit } from "@angular/core";
import { Website } from "../shared/models/website.model";
import { WebsiteService } from "../core/website.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Page, PageStatus } from "../shared/models/page.model";

@Component({
  selector: 'app-website-detail',
  templateUrl: './website-detail.component.html',
  styleUrls: ['./website-detail.component.sass']
})
export class WebsiteDetailComponent implements OnInit {
  website?: Website;
  pagess: Page[] = [];
  a_error: Page[] = [];
  aa_error: Page[] = [];
  aaa_error: Page[] = [];
  error: Page[] = [];
  no_error: Page[] = [];

  constructor(
    private webService: WebsiteService,
    @Inject(MAT_DIALOG_DATA) public websiteId: string,
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
      if(page.status==PageStatus.COMPLIANT){
        this.no_error.push(page);
      }
      else{
        this.error.push(page);
        page.evaluation.modules.forEach(module => {
          module.fail_levels.forEach(level => {
            if(level=="A" && !this.a_error.some(p => p === page)){
              this.a_error.push(page);
            }else if(level=="AA" && !this.aa_error.some(p => p === page)){
              this.aa_error.push(page);
            }else if(level=="AAA" && !this.aaa_error.some(p => p === page)){
              this.aaa_error.push(page);
            }
          });
        });
      }
    });
  }


}
