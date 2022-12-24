import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Vibration} from '@ionic-native/vibration/ngx'
import {Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  cameraOption: CameraOptions={
    quality:100,
    allowEdit:true,
    correctOrientation:true,
    destinationType:this.c.DestinationType.FILE_URI,
    encodingType:this.c.EncodingType.JPEG,
    mediaType:this.c.MediaType.PICTURE,   
  }

  galleryOption: CameraOptions={
    sourceType:this.c.PictureSourceType.PHOTOLIBRARY,
    quality:100,
    allowEdit:true,
    correctOrientation:true,
    destinationType:this.c.DestinationType.FILE_URI,
    encodingType:this.c.EncodingType.JPEG,
    mediaType:this.c.MediaType.PICTURE, 
  }



  photo:any=''
  foodType
  totalMeal
  fullName
  Phone
  Address1
  
  quantity
  Location
  detailsObj
  constructor(public modalCtrl:ModalController,
     private w:WebView,
     private c:Camera,
     private a:AlertController,
     private v:Vibration,private n:NativeGeocoder,private g:Geolocation) {
    this.g.getCurrentPosition()

   }
vibrate(){
  this.v.vibrate(5);
  this.donateFood();
}
ngOnInit() {
  }
  async locate() {
    const coordinates = await this.g.getCurrentPosition();
    this.Location = coordinates.coords.latitude+"--"+coordinates.coords.longitude;
  }
  
  donateFood(){
  
    this.detailsObj=({foodType:this.foodType,name:this.fullName,quantity:this.totalMeal,no:this.Phone,address1:this.Address1,
      location:this.Location})
    console.log(this.detailsObj);
    this.closeModal();
  
    //this.closeModal();
}


async closeModal(){
    await this.modalCtrl.dismiss(this.detailsObj);
  }

  async choosePhoto(){
    let alertBox = await this.a.create({
      header:'Choose From',
      buttons:[
        {
          text:'Camera',
          handler:()=>{
            this.c.getPicture(this.cameraOption).then((res)=>{
              console.log('response =',res);
              let finalImg= this.w.convertFileSrc(res)
              this.photo=finalImg;
            })
          }
        },
        {
          text:'Gallery',
          handler:()=>{
            this.c.getPicture(this.galleryOption).then((res)=>{
              console.log('response =',res);
              let finalImg= this.w.convertFileSrc(res)
              this.photo=finalImg;
            })
          }
        },
      ],
    })
    await alertBox.present();

  }

}
