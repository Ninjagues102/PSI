import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Website } from 'src/app/shared/models/website.model';
import { WebsitesComponent } from 'src/app/websites/websites.component';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-delete-website',
  templateUrl: './delete-website.component.html',
  styleUrls: ['./delete-website.component.sass']
})
export class DeleteWebsiteComponent{


  private readonly apiUrl: string;
  private readonly headers = new HttpHeaders({
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
  });

  constructor( 
    @Inject(MAT_DIALOG_DATA) public website: Website, 
    private websitesComponent: WebsitesComponent,
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<DeleteWebsiteComponent>,){

      this.apiUrl = `${environment.backend_url}/website`;
    }
  
    
  deleteWebsite(): any {
    this.websitesComponent.removeFromList(this.website)
    const url = `${this.apiUrl}/${this.website._id}/delete`;
    this.httpClient.post<Website>(url, {headers: this.headers }).subscribe();
    this.close()
  }

  close() {
    this.dialogRef.close()
  }

}
