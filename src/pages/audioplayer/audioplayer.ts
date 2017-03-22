import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaPlugin, File} from 'ionic-native';

declare var cordova: any;
const fs: string = cordova.file.externalRootDirectory;

export enum AudioPlayerState {
    Ready,
    Playing,
    Pausing   
}
@Component({
  selector: 'page-audioplayer',
  templateUrl: 'audioplayer.html'
})
export class AudioplayerPage {
  AudioPlayerState = AudioPlayerState;
  filename: any;
  my_media: MediaPlugin = null;
  state: AudioPlayerState= AudioPlayerState.Ready;
  duration:any;
  currentduration:any;
  timerDur: any;
  constructor(public navCtrl: NavController, public params:NavParams) {  
  	this.filename=params.get('item');
  	this.my_media = new MediaPlugin(fs+"cordova/"+this.filename);
  	this.currentduration=0;  	
  }
 
  audiostop(){
  	 this.my_media.stop();
  	 this.state=AudioPlayerState.Ready;
  	 clearTimeout(this.timerDur);
  	 this.currentduration=0;
  }
  audioplay(){
  	this.my_media.play();
  	this.state=AudioPlayerState.Playing; 
  		
	var that=this;
	this.timerDur=setInterval( function(){
		that.duration=Math.floor(that.my_media.getDuration());
		that.currentduration=that.currentduration+1;
		if(that.currentduration>=that.duration){
			that.audiostop();
		}
     },  1000);		
  }
  audiopause(){
  	 this.my_media.pause();
  	 this.state=AudioPlayerState.Ready;
  	 clearTimeout(this.timerDur);
  }
}
