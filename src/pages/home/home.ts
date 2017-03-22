import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { File,MediaPlugin } from 'ionic-native';
import { AudioplayerPage } from '../audioplayer/audioplayer';

declare var cordova: any;
const fs: string = cordova.file.externalRootDirectory;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public Data: Array<any> = [];
  mediaPlugin: MediaPlugin = null;

  constructor(public navCtrl: NavController,public platform: Platform ) {
    platform.ready().then(() => {    		
    });
  }

  ionViewWillEnter(){
      this.showlist();
  }
 
  audioplay(playername){
    this.navCtrl.push(AudioplayerPage,{item:playername});
  }
  showlist(){
     this.Data = [];  
     var that=this;  
        
      File.listDir(fs, 'cordova').then(
        (files) => {
            files.forEach( function( fileEntry, index ) {             
              fileEntry.getMetadata( function(metadata) {                 
                  that.Data.push({name:fileEntry.name, create_time: metadata.modificationTime, duration: (metadata.size)/1000+"KB"});
              }, null);
              setTimeout(function() {
              }, 500);  
                         
            });
        }).catch(
          (err) => {
            console.log("Data push error");
          }
       );
  }
}
