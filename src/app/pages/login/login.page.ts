import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  password:string;
  email:string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    
  }

  getInWithEmail(){
    this.auth.loginWithEmail(this.email,this.password).then(res => {
      if (res.user.emailVerified) {
        /* this.alertLogin("Login successfully");
        console.log(res); */
        this.router.navigate(['tabs']);
      }else{
        this.alertLogin("Your email has not been verified => "+res.emailVerified);
        console.log(res);
      }
    }).catch(error => {
      this.alertLogin("You dont have an acount please register");
    });
  }

  async alertLogin(message){
    let alert = await this.alertController.create({
      header: "Login messages",
      message: message,
      buttons: ["Ok"]
    });

    alert.present();
  }

}
