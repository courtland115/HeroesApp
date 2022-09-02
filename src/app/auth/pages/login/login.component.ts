import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private router: Router,
               private authService: AuthService) { }

  login(){
    //ir al backend
    //un usuario
    
    this.authService.login()
      .subscribe ( auth => {
        console.log( auth )

        if ( auth.id ) {
          
          console.log('hola')
          this.router.navigate(['./heroes']);
        }

      })
    

  }

  
  

}