import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";


interface WebsiteData {
  domain: string;
}

const domainRegex: RegExp = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;

export function domainValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return domainRegex.test(control.value) ? null : { domain: control.value };
  };
}

@Component({
  selector: "app-add-website",
  templateUrl: "./add-website.component.html",
  styleUrls: [ "./add-website.component.sass" ],
})
export class AddWebsiteComponent {
  domainControl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<AddWebsiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WebsiteData,
  ) {
    this.domainControl = new FormControl("", [ Validators.required, domainValidator() ]);
  }

  getErrorMessage(): string {
    if (this.domainControl.hasError("required")) {
      return "The field is mandatory";
    }
    return this.domainControl.hasError("domain") ? "Not a valid domain" : "test";
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
