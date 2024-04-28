import { Component, OnInit } from "@angular/core";
import { Website, WebsiteStatus } from "../shared/models/website.model";
import { WebsiteService } from "../core/website.service";
import { MatChipListboxChange } from "@angular/material/chips";

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.sass']
})
export class WebsitesComponent implements OnInit {

  constructor(private webService: WebsiteService){}

  websites: Website[] = [];
  websitesToBePresented: Website[] = [];

  protected readonly Object = Object;
  protected readonly WebsiteStatus = WebsiteStatus;
  isSelected: boolean = false;

  getWebsites(): void {
    this.webService.getWebsites()
      .subscribe(websites => {
        this.websites = websites;
        this.websitesToBePresented = websites;
      });
  }

  ngOnInit(): void {
    this.getWebsites();
  }

  onFilterChange(event: MatChipListboxChange) {
    if (event.value.length === 0) {
      this.websitesToBePresented = this.websites;
      return;
    }

    this.websitesToBePresented = this.websites.filter(website => event.value.some((status: WebsiteStatus) => status === website.status));
  }
}

