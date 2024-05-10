import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddWebsiteComponent } from "./add-website/add-website.component";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { BeginEvaluationComponent } from './begin-evaluation/begin-evaluation.component';


@NgModule({
  declarations: [
    AddWebsiteComponent,
    BeginEvaluationComponent,
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
    MatSelectModule,
    MatStepperModule,
    MatListModule,
    MatIconModule,
  ],
})
export class FeaturesModule {}
