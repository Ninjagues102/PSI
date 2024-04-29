import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Website } from "../shared/models/website.model";
import { Observable, Subject } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebsiteService {
  private readonly apiUrl: string;
  private websites: Subject<Website[]> = new Subject<Website[]>();

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.backend_url}/website`;
  }

  getWebsites(): Observable<Website[]> {
    this.httpClient.get<Website[]>(this.apiUrl).subscribe(value => this.websites.next(value));
    return this.websites;
  }

  getWebsite(id: string): Observable<Website> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Website>(url)
    }

  addWebsite(website: Website): void {
    this.httpClient.post<Website>(this.apiUrl, website).subscribe(_ => {
      this.getWebsites();
    });
  }
}
