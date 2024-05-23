import { Component, Inject } from '@angular/core';
import { Page, PageStatus } from '../shared/models/page.model';
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
  
  TypeOfTests = {
    ACT : "Regra ACT",
    WCAG : "Técnica WCAG"
 };

   
 TypeOfResults = {
    PASSED : "Passado",
    WARNNG : "Aviso",
    FAILED : "Falhado",
    NOTAPPLIABLE : "Não aplicável"
  }

  ResultsLevels = {
    A : "A",
    AA : "AA",
    AAA : "AAA",
  }


  displayedColumns: string[] = ['total', 'percentagem', 'type'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: TableElememt[] = [];
  page ?: Page;
  protected activeFilter: string[] = [];
  testToBePresented: any;
  tests: any;
  filters = [{ status:  PageStatus.REGISTERED },
             { status:  PageStatus.NON_COMPLIANT}
  ];

  constructor(
    private webService: WebsiteService,
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
    page.evaluation.percentagens[0].failed
  }
  
  clearFilters() {
    this.activeFilter = this.activeFilter.filter(filter => filter !== status)
    this.testToBePresented = this.tests;
  }
  
  onFilterChange(status: string) {
    this.activeFilter?.push(status);
    this.testToBePresented = this.tests.filter((test: { status: string; }) => status === test.status);
  }
}
