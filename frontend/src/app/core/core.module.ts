import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WebsiteService } from "./website.service";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    WebsiteService,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    WebsiteService,
  ],
})
export class CoreModule {}
