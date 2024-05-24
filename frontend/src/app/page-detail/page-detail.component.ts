import { Component, Inject } from '@angular/core';
import { Page } from '../shared/models/page.model';
import { TableElememt } from '../website-detail/website-detail.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  failed = 0;
  passed = 0;
  warning = 0;
  inapplicable = 0;
  total = 0;
  
  TypeOfTests = [{}];
  TypeOfResults = [{}];
  ResultsLevels = [{}];
  protected activeFilters: string[] = [];
  testToBePresented: any;
  tests: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public info: [string, Website]
  ){}
  
  async ngOnInit(): Promise<void> {
    this.getPage()
  }

  getPage(){
    if (!this.info[1]) return;
    this.page = this.info[1].pages.find(page => (
                  page._id === this.info[0],
                  this.getData(page)))
  }
  
  getData(page: Page) {
    this.failed = page.evaluation.percentagens[0].failed
    this.passed = page.evaluation.percentagens[0].passed
    this.warning = page.evaluation.percentagens[0].warning
    this.inapplicable = page.evaluation.percentagens[0].inapplicable
    this.total = this.failed + this.passed + this.warning + this.inapplicable

    this.tests = page.evaluation.testes_info[0].tests[0]
    this.testToBePresented = this.tests

    this.data = [
      {position:1, total: this.passed, percentagem: (this.passed/this.total) * 100, type: "Passed"},
      {position:2, total: this.failed, percentagem: (this.failed/this.total) * 100, type: "Failed"},
      {position:3, total: this.warning, percentagem: (this.warning/this.total) * 100, type: "Warning"},
      {position:4, total: this.inapplicable, percentagem: (this.inapplicable/this.total) * 100, type: "Inapplicable"},
    ]
  }
  
  clearFilter() {}
  
  onFilterChange() {}
}
