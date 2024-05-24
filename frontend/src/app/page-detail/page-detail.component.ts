import { Component, Inject } from '@angular/core';
import { Page } from '../shared/models/page.model';
import { TableElememt } from '../website-detail/website-detail.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Website } from '../shared/models/website.model';
import { PageEvaluation } from '../shared/models/page-evaluation.model';
import { TestDetailComponent } from '../test-detail/test-detail.component';

export interface TableElememt2{
  position:number;
  module: string;
  level:string[];
  name:string;
  outcome:string;
  moreInfo: [{}]
}

export enum Level{
  A = "A",
  AA = "AA",
  AAA = "AAA",
}

export enum Type{
  ACT = "act-rules",
  WCAG = "wcag-techniques",
}

export enum Outcome{
  PASSED = "passed",
  FAILED = "failed",
  WARNING = "warning",
  INAPPLICABLE = "inapplicable"
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
  data: TableElememt[] = [];
  data2: TableElememt2[] = [];
  dataAux: TableElememt2[] = [];
  dataToBePresented: TableElememt2[] = []
  page ?: Page;
  failed = 0;
  passed = 0;
  warning = 0;
  inapplicable = 0;
  total = 0;

  TypeOfTests = [
    {type:Type.WCAG},
    {type:Type.ACT}];
  TypeOfResults = [
    {outcome:Outcome.PASSED},
    {outcome:Outcome.FAILED},
    {outcome:Outcome.WARNING},
    {outcome:Outcome.INAPPLICABLE}];
  ResultsLevels = [
    {level:Level.A},
    {level:Level.AA},
    {level:Level.AAA},];
  protected activeFilterType?: Type;
  protected activeFilterLevel?: Level;
  protected activeFilterOutcome?: Outcome;
  protected filtros: string[] = [];
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

    this.testToBePresented = page.evaluation.modules

    let i = 1
    this.testToBePresented.forEach(m => { m.tests.forEach(ts => {
      this.data2.push({position: i,module: m.module, level:ts.levels, name: ts.test_name, outcome: ts.outcome, moreInfo: ts.results}),
      i+=1
    })})
    this.dataToBePresented = this.data2
    this.dataAux = this.data2
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


  clearFilter(filter : any) {
    this.dataToBePresented = this.data2
    this.filtros = this.filtros.filter(f => f !== filter)
    this.filtrar()
  }

  onFilterOutcome(outcome: Outcome) {
    this.clearFilter(this.activeFilterOutcome);
    this.activeFilterOutcome = outcome;
    this.filtros.push(outcome);
    this.filtrar();
  }
  onFilterType(type: Type) {
    this.clearFilter(this.activeFilterType);
    this.activeFilterType = type;
    this.filtros.push(type);
    this.filtrar();
  }
  onFilterLevel(level: Level) {
    this.clearFilter(this.activeFilterLevel)
    this.activeFilterLevel=level;
    this.filtros.push(level);
    this.filtrar();
  }

  filtrar(){
    this.filtros.forEach(f=>{
      if(this.activeFilterOutcome == f){
        this.dataAux = this.dataAux.filter(data=>data.outcome==f)
        this.dataToBePresented = this.dataAux
      }
      if(this.activeFilterType == f){

        this.dataAux = this.dataAux.filter(data=>data.module==f)
        this.dataToBePresented = this.dataAux
      }
      if(this.activeFilterLevel == f){

        this.dataAux = this.dataAux.filter(data=>data.level.includes(f))
        this.dataToBePresented = this.dataAux
      }
    })
    this.dataAux = this.data2
  }
}
