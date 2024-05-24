import { Component, Inject } from '@angular/core';
import { Page } from '../shared/models/page.model';
import { TableElement } from '../website-detail/website-detail.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Website } from '../shared/models/website.model';
import { PageEvaluation } from '../shared/models/page-evaluation.model';
import { TestDetailComponent } from '../test-detail/test-detail.component';

export interface TableElememt2{
  position:number;
  name:string;
  outcome:string;
  moreInfo: [{}]
}

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.sass']
})

export class PageDetailComponent {

  displayedColumns: string[] = ['total', 'percentagem', 'type'];
  displayedColumns2: string[] = ['name', 'outcome', "moreInfo"];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  columnsToDisplay2: string[] = this.displayedColumns2.slice();
  data: TableElement[] = [];
  data2: TableElememt2[] = [];
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
  testToBePresented ?: PageEvaluation["modules"];
  tests ?: PageEvaluation["modules"];

  constructor(
    @Inject(MAT_DIALOG_DATA) public info: [string, Website],
    private dialog: MatDialog
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

    this.data = [
      {position:1, total: this.passed, percentagem: (this.passed/this.total) * 100, type: "Passed"},
      {position:2, total: this.failed, percentagem: (this.failed/this.total) * 100, type: "Failed"},
      {position:3, total: this.warning, percentagem: (this.warning/this.total) * 100, type: "Warning"},
      {position:4, total: this.inapplicable, percentagem: (this.inapplicable/this.total) * 100, type: "Inapplicable"},
    ]

    this.tests = page.evaluation.modules
    this.testToBePresented = this.tests

    let i = 1
    this.testToBePresented.forEach(m => { m.tests.forEach(ts => {
      this.data2.push({position: i, name: ts.test_name, outcome: ts.outcome, moreInfo: ts.results}),
      i+=1
    })})
  }

  moreInfo(results:any) {
    const dialogRef = this.dialog.open(TestDetailComponent, {
      height: "65%",
      width: "80%",
      data: results,
    });
    dialogRef.afterClosed().subscribe(_ => {
    })
  }


  clearFilter() {}

  onFilterChange() {}
}
