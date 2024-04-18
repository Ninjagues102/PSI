import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ToolbarItemComponent } from './toolbar-item/toolbar-item.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";


@NgModule({
  declarations: [
    DashboardComponent,
    ToolbarItemComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  exports: [
    DashboardComponent,
    ToolbarItemComponent,
  ],
})
export class PublicModule {}
