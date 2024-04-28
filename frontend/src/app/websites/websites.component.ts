import { Component } from '@angular/core';
import { Website } from '../shared/models/website.model';
import { Page } from '../shared/models/page.model';
import { WebsiteService } from '../core/website.service';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.sass']
})
export class WebsitesComponent {

  constructor(private webService: WebsiteService){}

  websites: Website[] = [];
  pages: Page[] = [];

  getWebsites(): void {
    this.webService.getWebsites()
        .subscribe(websites => this.websites = websites);
  }

  ngOnInit(): void {
    this.getWebsites();
  }
}

