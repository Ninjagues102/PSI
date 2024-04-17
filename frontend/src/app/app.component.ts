import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fluent-angular';

  exampleTextField = '';

  onClick() {
    console.log(this.exampleTextField);
  }
}
