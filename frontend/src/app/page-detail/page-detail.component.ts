import { Component, Inject } from '@angular/core';
import { Page } from '../shared/models/page.model';
import { TableElememt } from '../website-detail/website-detail.component';
import { WebsiteService } from '../core/website.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Website } from '../shared/models/website.model';


@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.sass']
})
export class PageDetailComponent {
  displayedColumns: string[] = ['total', 'percentagem', 'type'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: TableElememt[] = [];
  page ?: Page;

  constructor(
    private webService: WebsiteService,
    @Inject(MAT_DIALOG_DATA) public info: [string, Website]
  ){}

  async ngOnInit(): Promise<void> {
    this.getPage()
  }

  getPage(){
    if (!this.info[1]) return;
    this.page = this.info[1].pages.find(page => page._id === this.info[0])
  }
  
  getData(page: Page) {
    throw new Error('Method not implemented.');
  }
  
}
