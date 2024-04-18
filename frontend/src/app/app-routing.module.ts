import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsitesComponent } from './websites/websites.component';
import { WebsitesMonitorizadosComponent } from './websites-monitorizados/websites-monitorizados.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'websites', component: WebsitesComponent},
  { path: 'websites_monitorizados', component: WebsitesMonitorizadosComponent},
  { path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
