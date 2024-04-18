import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-toolbar-item',
  templateUrl: './toolbar-item.component.html',
  styleUrls: ['./toolbar-item.component.sass']
})
export class ToolbarItemComponent {
  @Input() text?: string
  @Input() icon?: string
  @Input() url?: string
}
