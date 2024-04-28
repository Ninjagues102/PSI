import { Component, Input } from '@angular/core';
import { Website } from '../shared/models/website.model';
import { WebsiteService } from '../core/website.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-website-detail',
  templateUrl: './website-detail.component.html',
  styleUrls: ['./website-detail.component.sass']
})
export class WebsiteDetailComponent {
  constructor(
    private webService: WebsiteService,
    private route: ActivatedRoute
  ){}

  website?: Website;

  getWebsite(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("id: " + id)
    if (!id) return
    this.webService.getWebsite(id)
      .subscribe(website => this.website = website);
  }

  ngOnInit(): void {
    this.getWebsite();
  }
}
