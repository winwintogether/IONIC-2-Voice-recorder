import { Injectable } from '@angular/core';
import { MediaPlugin, File } from 'ionic-native';
import {Platform} from 'ionic-angular';

declare var cordova: any;
const fs: string = cordova.file.externalRootDirectory;

export enum AudioRecorderState {
    Ready,
    Recording,
    Recorded,
    Playing
}

@Injectable()
export class AudioRecorder {
  mediaPlugin: MediaPlugin = null;
  recording_name: any;
  state: AudioRecorderState = AudioRecorderState.Ready;

  MediaPlugin(){
   if (this.mediaPlugin == null) {

     if(!this.recording_name){
      var d = new Date();
      this.recording_name=(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getFullYear()+"-"+d.getHours()+"-"+d.getMinutes()+"-"+d.getSeconds();
      }

      File.createDir(fs, "cordova", false)
      .then(function (success) {
         console.log("new directory : success");
      }, function (error) {
         console.log("new directory : error");
      });

      this.mediaPlugin = new MediaPlugin(fs+"cordova/"+this.recording_name+".wav");  
    }
    return this.mediaPlugin;
  }

  startRecording() {
    this.MediaPlugin();
    this.mediaPlugin.startRecord();
    this.state = AudioRecorderState.Recording;
  }

  stopRecording() {
    this.mediaPlugin.stopRecord();
    this.state = AudioRecorderState.Recorded;
  }

  startPlayback() {
    this.mediaPlugin.play();
    this.state = AudioRecorderState.Playing;
  }

  stopPlayback() {
    this.mediaPlugin.stop(); 
    this.mediaPlugin=null;
    this.recording_name="";
    this.state = AudioRecorderState.Ready;
  }

}