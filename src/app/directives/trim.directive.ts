import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTrim]'
})
export class TrimDirective {
  @Output() ngModelChange = new EventEmitter();
  constructor(private el: ElementRef) { }
  @HostListener('focusout')
  onFocusOut() {
    (this.el.nativeElement as HTMLInputElement).value = (this.el.nativeElement as HTMLInputElement).value.trim();
    this.ngModelChange.emit(this.el.nativeElement.value);
  }
}
