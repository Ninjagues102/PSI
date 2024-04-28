import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WebsitesComponent } from "./websites/websites.component";
import { DashboardComponent } from "./public/dashboard/dashboard.component";
import { WebsiteDetailComponent } from "./website-detail/website-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: WebsitesComponent},
  { path: 'websiteDetail/:id', component: WebsiteDetailComponent},
  { path: "**", redirectTo: "/dashboard", pathMatch: "full" }, // TODO - Does this make sense instead of an error page?
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
