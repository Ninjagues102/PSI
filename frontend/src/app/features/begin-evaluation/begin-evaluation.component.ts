import { Component, Inject, OnInit } from "@angular/core";
import { WebsiteService } from "../../core/website.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Website } from "../../shared/models/website.model";
import { Page } from "../../shared/models/page.model";

@Component({
  selector: "app-begin-evaluation",
  templateUrl: "./begin-evaluation.component.html",
  styleUrls: [ "./begin-evaluation.component.sass" ],
})
export class BeginEvaluationComponent implements OnInit {
  website?: Website;
  pagesToEvaluate?: [Page]

  constructor(private websiteService: WebsiteService,
              @Inject(MAT_DIALOG_DATA) private websiteId: string) {}

  ngOnInit(): void {
    this.websiteService.getWebsite(this.websiteId).subscribe(website => this.website = website);
  }

  modelChange(selectedOptions: any) {
    this.pagesToEvaluate = selectedOptions
  }
}
