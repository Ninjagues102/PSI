import { Component, Input } from '@angular/core';
import {Website} from '../website';

@Component({
  selector: 'app-website-detail',
  templateUrl: './website-detail.component.html',
  styleUrls: ['./website-detail.component.sass']
})
export class WebsiteDetailComponent {
  @Input() website?: Website;
}
