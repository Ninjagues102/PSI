import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCardModule } from "@angular/material/card";
import { WebsitesComponent } from "./websites/websites.component";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { PublicModule } from "./public/public.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FeaturesModule } from "./features/features.module";
import { HttpClientModule } from "@angular/common/http";
import { WebsiteDetailComponent } from "./website-detail/website-detail.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { MatChipsModule } from "@angular/material/chips";
import { MatSortModule } from "@angular/material/sort";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    WebsitesComponent,
    WebsiteDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    PublicModule,
    FeaturesModule,
    HttpClientModule,
    FormsModule,
    MatGridListModule,
    MatListModule,
    MatChipsModule,
    MatSortModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatExpansionModule,
  ],
  providers: [WebsitesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
