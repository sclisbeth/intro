import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any = [];
  constructor(private service: UserService) {

    this.service.getUsers().subscribe((resp) => {
      console.log(resp);
      this.users = resp;
    })
  }

  onSearchBy($event: any): void {
    console.log($event);
    this.service.getUserById($event.id).subscribe((resp) => {
      console.log(resp);
    })
  }
}
