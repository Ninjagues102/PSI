import { Component, OnInit } from "@angular/core";
import { Website, WebsiteStatus } from "../shared/models/website.model";
import { WebsiteService } from "../core/website.service";
import { MatChipListboxChange } from "@angular/material/chips";
import { Sort } from "@angular/material/sort";

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

  sortData(event: Sort) {
    if (!event.active || event.direction === "") {
      return;
    }

    this.websitesToBePresented = this.websitesToBePresented.sort((a, b) => {
      const isAsc = event.direction === "asc";
      switch (event.active) {
        case "registryDate":
          return this.compare(a.registryDate!, b.registryDate!, isAsc);
        case "lastEvaluationDate":
          return this.compare(a.lastEvaluationDate, b.lastEvaluationDate, isAsc);
        default:
          return 0;
      }
    });

  }

  compare(a: number | Date | string | undefined, b: number | Date | string | undefined, isAsc: boolean) {
    if (a === undefined) return -1 * (isAsc ? 1 : -1);
    if (b === undefined) return 1 * (isAsc ? 1 : -1);
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

