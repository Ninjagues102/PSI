import { Component, Inject, OnInit } from "@angular/core";
import { Website } from "../shared/models/website.model";
import { WebsiteService } from "../core/website.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

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
  ){}

  ngOnInit(): void {
    this.getWebsite();
  }

  getWebsite(): void {
    if (!this.websiteId) return;
    this.webService.getWebsite(this.websiteId)
      .subscribe(website => this.website = website);
  }
}
