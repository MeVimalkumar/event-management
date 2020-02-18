import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  xmlParser(string) {
    string = '<address>' + string + '</address>'
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(string, 'text/xml')
    return xmlDoc
  }


  isFormValid(form: NgForm): Boolean {
    for (var name in form.form.controls) {
      if (form.controls[name].invalid) {
        if (!document.getElementById(name)) {
          continue;
        }
        window.setTimeout(function () {
          document.getElementById(name).focus();
        }, 0);
        form.controls[name].markAsDirty();
        form.controls[name].markAsTouched();
        return false;
      }
    }
    return true;
  }
}
