import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Protocol } from "../../shared/models/website.model";


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
  protocolControl: FormControl = new FormControl<Protocol>(Protocol.HTTPS, Validators.required)
  domainControl: FormControl = new FormControl("", [ Validators.required, domainValidator() ]);
  protocolOptions: Protocol[] = [Protocol.HTTP, Protocol.HTTPS]

  constructor(
    public dialogRef: MatDialogRef<AddWebsiteComponent>,
  ) {}

  getErrorMessage(): string {
    if (this.domainControl.hasError("required")) {
      return "O campo é mandatório";
    }
    return this.domainControl.hasError("domain") ? "O domínio não é válido" : "";
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
