import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvaluation } from '../shared/models/page-evaluation.model';

export interface TableElememt{
  position:number;
  resultado:string;
  html:string[]
}

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.sass']
})
export class TestDetailComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public results: PageEvaluation["modules"][0]["tests"][0]["results"],
  ){}
  displayedColumns = ['resultado', 'html']
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: TableElememt[] = [{position:1, resultado: this.results[0].verdict, html: this.results[0].htmlCode}]
}
