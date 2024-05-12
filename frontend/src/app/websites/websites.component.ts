import { Component, OnInit } from "@angular/core";
import { Website, WebsiteStatus } from "../shared/models/website.model";
import { WebsiteService } from "../core/website.service";
import { MatDialog } from "@angular/material/dialog";
import { WebsiteDetailComponent } from "../website-detail/website-detail.component";
import { BeginEvaluationComponent } from "../features/begin-evaluation/begin-evaluation.component";

export enum SortingKey {
  REGISTRY_DATE = "registryDate",
  EVALUATION_DATE = "lastEvaluationDate"
}

export enum SortingDirection {
  ASC = "asc",
  DESC = "desc"
}

interface SortingInformation {
  key: SortingKey;
  direction: SortingDirection;
}

@Component({
  selector: 'app-websites',
  host: {
    class: "main-content",
  },
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.sass']
})
export class WebsitesComponent implements OnInit {
  filters = [
    { icon: "pending", status: WebsiteStatus.REGISTERED },
    { icon: "sync", status: WebsiteStatus.IN_EVALUATION },
    { icon: "done", status: WebsiteStatus.EVALUATED },
    { icon: "error", status: WebsiteStatus.EVALUATION_ERROR },
  ];
  activeSort: SortingInformation = { key: SortingKey.REGISTRY_DATE, direction: SortingDirection.DESC };
  protected readonly SortingDirection = SortingDirection;
  websites: Website[] = [];
  websitesToBePresented: Website[] = [];
  protected readonly SortingKey = SortingKey;
  protected activeFilter?: WebsiteStatus;

  constructor(private webService: WebsiteService, private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.getWebsites();
  }

  websiteDetails(websiteId?: string): void {
    this.dialog.open(WebsiteDetailComponent, {
      height: "60%",
      width: "50%",
      data: websiteId,
    });
  }

  openEvaluationDialog(websiteId?: string): void {
    const dialogRef = this.dialog.open(BeginEvaluationComponent, {
      height: "65%",
      width: "65%",
      data: websiteId
    });

    dialogRef.afterClosed().subscribe(pages => {
      if (!pages || !websiteId) return;
      this.webService.processPages(websiteId, { pages: pages }).subscribe(status => {
        const website = this.websites.find(website => website._id === websiteId);
        if (!website) return;
        website.status = status;
      });
    })
  }

  getWebsites(): void {
    this.webService.getWebsites()
      .subscribe(websites => {
        this.websites = websites;
        this.websitesToBePresented = websites;
        this.sortData(this.activeSort);
      });
  }

  onFilterChange(status: WebsiteStatus) {
    this.activeFilter = status;
    this.websitesToBePresented = this.websites.filter(website => status === website.status);
  }
  
  clearFilters() {
    this.activeFilter = undefined;
    this.websitesToBePresented = this.websites;
  }

  sortData(sortInfo: SortingInformation) {
    this.activeSort = sortInfo;
    this.websitesToBePresented = this.websitesToBePresented.sort((a, b) => {
      const isAsc = sortInfo.direction === SortingDirection.ASC;
      switch (sortInfo.key) {
        case SortingKey.REGISTRY_DATE:
          return this.compare(a.registryDate!, b.registryDate!, isAsc);
        case SortingKey.EVALUATION_DATE:
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
  
  removeWebsite(website: Website) {
    this.webService.deleteWebsite(website);
    this.removeFromList(website)
    this.getWebsites()
  }

  removeFromList(website : Website){
    this.websites = this.websites.filter(w => w !== website);
  }
}