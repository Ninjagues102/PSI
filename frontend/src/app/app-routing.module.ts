import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WebsitesComponent } from "./websites/websites.component";
import { WebsitesMonitorizadosComponent } from "./websites-monitorizados/websites-monitorizados.component";
import { DashboardComponent } from "./public/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'websites', component: WebsitesComponent},
  { path: 'websites_monitorizados', component: WebsitesMonitorizadosComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: "**", redirectTo: "/dashboard", pathMatch: "full" }, // TODO - Does this make sense instead of an error page?
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
