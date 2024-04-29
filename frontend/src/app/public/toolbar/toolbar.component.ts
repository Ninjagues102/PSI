import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddWebsiteComponent } from "../../features/add-website/add-website.component";
import { WebsiteService } from "../../core/website.service";
import { Website } from "../../shared/models/website.model";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: [ "./toolbar.component.sass" ],
})
export class ToolbarComponent {
  constructor(private dialog: MatDialog, private websiteService: WebsiteService) {}

  addWebsite(): void {
    const dialogRef = this.dialog.open(AddWebsiteComponent, {
      height: "65%",
      width: "65%",
    });


    dialogRef.afterClosed().subscribe((website: Website) => {
      this.websiteService.addWebsite(website);
    });
  }
}
