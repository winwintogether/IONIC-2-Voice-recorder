import { Component } from '@angular/core';
import { NavController,AlertController  } from 'ionic-angular';
import { AudioRecorder, AudioRecorderState } from '../../services/audiorecorder';

@Component({
  selector: 'recording-about',
  templateUrl: 'recording.html',
  providers:[AudioRecorder]
})
export class RecordingPage {
	
  AudioRecorderState = AudioRecorderState;

  public recording_time: number;
  public current_date: any;
  public current_month: any;
  public current_year: any;
  public current_day: any;
  public current_hour: any;
  public current_minute:any;
  public current_datetime: any;
  public recording_name: any;
  public timeinterval:any;
  
  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public audioRecorder: AudioRecorder) {

     this.recording_time=0;
       
  }
ngOnInit(){
   
}
ionViewWillEnter(){
   this.showtime();
}
ionViewWillLeave() {

 }

showtime(){
        
        var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var d = new Date();
        this.current_year=d.getFullYear();
        this.current_month=months[d.getMonth()];
        this.current_date=d.getDate();
        this.current_day=days[d.getDay()];
        this.current_hour=d.getHours();
        this.current_minute=d.getMinutes();
        this.current_datetime=this.current_day+" "+this.current_month+" "+this.current_date+","+this.current_year+","+this.current_hour+":"+this.current_minute;
             
 }  
 startRecording() {
    try {
      this.showtime();
      this.audioRecorder.startRecording();
      var that=this;
      this.timeinterval=setInterval(function(){
        that.recording_time=that.recording_time+1;
       },  1000);
      }
    catch (e) {
      this.showAlert('Could not start recording.');
    }
  }

  public count_time(){
    this.recording_time+=1;
    console.log("current_recoding_time:"+this.recording_time);
  }

  stopRecording() {
    try {
      this.audioRecorder.stopRecording();

      clearInterval(this.timeinterval);
      
    }
    catch (e) {
      this.showAlert('Could not stop recording.');
    }
  }

  startPlayback() {
    try {
      this.audioRecorder.startPlayback();
    }
    catch (e) {
      this.showAlert('Could not play recording.');
    }
  }

  stopPlayback() {
    try {
      this.audioRecorder.stopPlayback();
      this.recording_time=0;
    }
    catch (e) {
      this.showAlert('Could not stop playing recording.');
    }
  } 

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
