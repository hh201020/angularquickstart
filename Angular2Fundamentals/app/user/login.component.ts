import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  templateUrl: 'app/user/login.component.html',
  styles: [`
    em { float:right; color:#E05C65; padding-left:10px; }
  `]
})
export class LoginComponent {
  constructor( private router:Router) {

  }

  login(formValues) {
    console.log(formValues);
  }

  cancel() {
    this.router.navigate(['events'])
  }
}