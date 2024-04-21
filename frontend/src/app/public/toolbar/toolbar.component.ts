import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddWebsiteComponent } from "../../features/add-website/add-website.component";
import { WebsiteService } from "../../core/website.service";
import { Website, WebsiteRegistration, WebsiteStatus } from "../../shared/models/website.model";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: [ "./toolbar.component.sass" ],
})
export class ToolbarComponent {
  constructor(private dialog: MatDialog, private websiteService: WebsiteService) {}

  addWebsite(): void {
    const dialogRef = this.dialog.open(AddWebsiteComponent, {
      height: "50%",
      width: "50%",
    });

    dialogRef.afterClosed().subscribe((data: WebsiteRegistration) => {
    const currentDate = new Date().toDateString();

    dialogRef.afterClosed().subscribe((domain: string) => {
      const website: Website = {
        protocol: data.protocol,
        domain: data.domain,
        status: WebsiteStatus.REGISTERED,
        registryDate: currentDate,
        lastEvaluationDate: undefined
      };

      this.websiteService.addWebsite(website).subscribe(_ => {});
    });
  }
}
