import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  donationDetails:any =[]


  today:number=Date.now();
  constructor(private modalCtrl: ModalController,private screenOrientaion:ScreenOrientation) {}
  async addDetails(){
    const modal = await this.modalCtrl.create({
      component:DetailsPage ,
    });

    modal.onDidDismiss().then(newDetails=>{
      console.log(newDetails.data);
      this.donationDetails.push(newDetails.data);
    })

    modal.present();
  }

  async delete(index){
    this.donationDetails.splice(index,1);

  }
  
}
