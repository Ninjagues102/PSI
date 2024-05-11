import { Component, Inject, OnInit } from '@angular/core';
import { WebsiteService } from 'src/app/core/website.service';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Website } from 'src/app/shared/models/website.model';
import { WebsitesComponent } from 'src/app/websites/websites.component';


@Component({
  selector: 'app-delete-website',
  templateUrl: './delete-website.component.html',
  styleUrls: ['./delete-website.component.sass']
})
export class DeleteWebsiteComponent implements OnInit{

  constructor( 
    @Inject(MAT_DIALOG_DATA) public websiteId: string, 
    private websitesComponent: WebsitesComponent,
    private webService : WebsiteService){}

    website !: Website;

    ngOnInit(): void {
      this.getWebsite();
    }
    
    getWebsite(): void {
      if (!this.websiteId) return;
      this.webService.getWebsite(this.websiteId)
        .subscribe(website => this.website = website);
    }

  deleteWebsite(): any {
    this.websitesComponent.removeWebsite(this.website);
  }

}
