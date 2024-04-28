import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Website } from "../shared/models/website.model";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class WebsiteService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${environment.backend_url}/website`;
  }

  getWebsites(): Observable<Website[]> {
    return this.httpClient.get<Website[]>(this.apiUrl);
  }

  getWebsite(id: number): Observable<Website> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Website>(url)
    }

  addWebsite(website: Website): Observable<Website> {
    return this.httpClient.post<Website>(this.apiUrl, website);
  }
}
