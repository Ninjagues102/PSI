import { Component, Inject } from '@angular/core';
import { Page } from '../shared/models/page.model';
import { TableElememt } from '../website-detail/website-detail.component';
import { WebsiteService } from '../core/website.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


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
    @Inject(MAT_DIALOG_DATA) public pageId: string
  ){}

  async ngOnInit(): Promise<void> {
    this.getPage()
  }

  getPage(){
    if (!this.pageId) return;
    this.webService.getPage(this.pageId)
    .subscribe(page =>{
      this.page = page;
      this.getData(page);
    });
  }
  
  getData(page: Page) {
    throw new Error('Method not implemented.');
  }
  
}
