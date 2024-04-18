import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddWebsiteComponent } from "./add-website/add-website.component";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";


@NgModule({
  declarations: [
    AddWebsiteComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class FeaturesModule {}
