import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { RecordingPage } from '../recording/recording';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {  
  tab1Root: any = HomePage;
  tab2Root: any = RecordingPage;
  tab3Root: any = SettingPage;
  constructor() {

  }
 
 }
