import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Website, WebsiteStatus } from "../shared/models/website.model";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Page, PageProcessDto } from "../shared/models/page.model";
import { DeleteWebsiteComponent } from "../features/delete-website/delete-website.component";
import { MatDialog } from "@angular/material/dialog";
import { WebsitesComponent } from "../websites/websites.component";

@Injectable({
  providedIn: "root",
})
export class WebsiteService {
  private readonly apiUrl: string;
  private websites: BehaviorSubject<Website[]> = new BehaviorSubject<Website[]>([]);
  private readonly headers = new HttpHeaders({
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
  });
  

  constructor(private httpClient: HttpClient, private dialog: MatDialog, private websitesComponent: WebsitesComponent) {
    this.apiUrl = `${environment.backend_url}/website`;
  }
  
  getWebsites(): Observable<Website[]> {
    this.httpClient.get<Website[]>(this.apiUrl, { headers: this.headers }).subscribe(websites => this.websites.next(websites));
    return this.websites;
  }

  getWebsite(id: string): Observable<Website> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Website>(url, { headers: this.headers });
  }

  getPage(id: string): Observable<Page> {
    const url = `${environment.backend_url}/page/${id}`;
    return this.httpClient.get<Page>(url, { headers: this.headers });
  }
  
  addWebsite(website: Website): void {
    this.httpClient.post<Website>(this.apiUrl, website, { headers: this.headers }).subscribe(_ =>
      this.getWebsites(),
    );
  }
  
  processPages(websiteId: string, pages: PageProcessDto): BehaviorSubject<WebsiteStatus> {
    this.httpClient.post<[ Page ]>(`${this.apiUrl}/process/${websiteId}`, pages, { headers: this.headers }).subscribe(_ =>
      this.getWebsites(),
    );
    return new BehaviorSubject<WebsiteStatus>(WebsiteStatus.IN_EVALUATION);
  }
  
  deleteWebsite(website : Website) {
    
    if(website.pages.length > 0){
      const dialogRef = this.dialog.open(DeleteWebsiteComponent, {
        height: "28%",
        width: "28%",
        data: website,
      });
  
      dialogRef.afterClosed().subscribe(_ => {
        this.getWebsites();
        window.location.reload();
      });
      return;
    }
    const url = `${this.apiUrl}/${website._id}/delete`;
    this.httpClient.post<Website>(url, {headers: this.headers }).subscribe(_ =>
      this.getWebsites()
      
    );
    window.location.reload();
  }
}
