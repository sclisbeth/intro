import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() showImg: boolean = true;
  @Input() user: any = null;
  @Output() searchById: EventEmitter<any> = new EventEmitter<any>();


  moreInfo(id: any): void {
    this.searchById.emit({ id: id });
  }
}
