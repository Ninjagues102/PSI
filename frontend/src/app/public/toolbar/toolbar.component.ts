import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddWebsiteComponent } from "../../features/add-website/add-website.component";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: [ "./toolbar.component.sass" ],
})
export class ToolbarComponent {
  constructor(private dialog: MatDialog) {}

  addWebsite(): void {
    const dialogRef = this.dialog.open(AddWebsiteComponent, {
      height: "50%",
      width: "50%",
      data: { domain: "this.name", animal: "this.animal" },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed ${result ?? "successfully"}.`);
    });
  }
}
