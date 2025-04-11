import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phones: new FormArray([])
  })
  constructor() {
    this.userForm.get('name')?.setValue('');
  }

  validForm(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
    } else {
      console.error('invalid form!');
    }
  }

  get phones(): FormArray {
    return this.userForm.get('phones') as FormArray;
  }

  addPhone(): void {
    this.phones.push(new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]));
    this.updateForm();

  }

  deletePhone(index: number): void {
    this.phones.removeAt(index);
    this.updateForm();
  }

  updateForm(): void {
    if (this.phones.length > 0) {
      this.userForm.get('name')?.disable();
    } else {
      this.userForm.get('name')?.enable();
    }
  }
}
