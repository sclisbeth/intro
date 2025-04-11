import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appLetters]'
})
export class LettersDirective {

  private regexPattern: RegExp = /^[a-zA-Z\u00C0-\u017F\s]*$/;

  constructor() {
  }

  @HostListener('keydown', ['$event'])
  onInputChange(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    const key: string = event.key;
    const inputWithNewValue = inputValue + key;
    if (key !== 'Backspace' && !this.regexPattern.test(inputWithNewValue)) {
      event.preventDefault();
    }
  }

}
