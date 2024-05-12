import { Component, Inject, OnInit } from "@angular/core";
import { Website } from "../shared/models/website.model";
import { WebsiteService } from "../core/website.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { WebsitesComponent } from "../websites/websites.component";

@Component({
  selector: 'app-website-detail',
  templateUrl: './website-detail.component.html',
  styleUrls: ['./website-detail.component.sass']
})
export class WebsiteDetailComponent implements OnInit {
  website?: Website;
  
  constructor(
    private webService: WebsiteService,
    @Inject(MAT_DIALOG_DATA) public websiteId: string,
    private websitesComponent: WebsitesComponent
  ){}

  ngOnInit(): void {
    this.getWebsite();
  }
  
  getWebsite(): void {
    if (!this.websiteId) return;
    this.webService.getWebsite(this.websiteId)
      .subscribe(website => this.website = website);
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
    this.websitesComponent.removeFromList(website)
    this.getWebsites()
  }
}
