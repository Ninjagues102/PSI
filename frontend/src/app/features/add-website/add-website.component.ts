import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Protocol } from "../../shared/models/website.model";


interface WebsiteData {
  domain: string;
}

const domainRegex: RegExp = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;

const pageRegex: RegExp = /^\/(?:[^\/]+\/?)*$/;

@Component({
  selector: "app-add-website",
  templateUrl: "./add-website.component.html",
  styleUrls: [ "./add-website.component.sass" ],
})
export class AddWebsiteComponent {
  pagesToAdd: string[] = [];

  protocolOptions = [ { name: "HTTPS", prefix: Protocol.HTTPS }, { name: "HTTP", prefix: Protocol.HTTP } ];

  websiteGroupControl = this.formBuilder.group({
    protocolControl: new FormControl(Protocol.HTTPS, Validators.required),
    domainControl: new FormControl("", [ Validators.required, Validators.pattern(domainRegex) ]),
  });

  pagesGroupControl = this.formBuilder.group({
    pageControl: new FormControl("", [ Validators.required, Validators.pattern(pageRegex), this.pageUniqueValidator() ]),
  });



  constructor(
    public dialogRef: MatDialogRef<AddWebsiteComponent>,
    private formBuilder: FormBuilder,
  ) {}

  pageUniqueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.pagesToAdd.some(page => page === control.value)) {
        return { unique: control.value };
      }

      return null;
    };
  }

  getWebsiteErrorMessage(): string {
    if (this.websiteGroupControl.controls.domainControl.hasError("required")) {
      return "O campo é obrigatório";
    }

    if (this.websiteGroupControl.controls.domainControl.hasError("domain")) {
      return "O domínio não é válido";
    }

    if (this.pagesGroupControl.controls.pageControl.hasError("page")) {
      return "O path relativo não é válido";
    }

    return this.pagesGroupControl.controls.pageControl.hasError("unique") ? "Cada path só pode ser registado uma vez" : "";
  }

  addPage() {
    this.pagesToAdd.push(this.pagesGroupControl.controls.pageControl.value!);
    this.pagesGroupControl.controls.pageControl.reset();
  }

  removePage(index: number) {
    this.pagesToAdd.splice(index, 1);
  }

  onSubmit() {
    this.pagesToAdd.map(path => ({ relativePath: path }));

    const websiteControls = this.websiteGroupControl.controls;
    return {
      domain: websiteControls.protocolControl.value?.concat(websiteControls.domainControl.value!),
      pages: this.pagesToAdd.map(path => ({ relativePath: path })),
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
