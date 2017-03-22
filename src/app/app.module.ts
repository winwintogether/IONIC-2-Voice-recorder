import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { RecordingPage } from '../pages/recording/recording';
import { SettingPage } from '../pages/setting/setting';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AudioplayerPage } from '../pages/audioplayer/audioplayer';

@NgModule({
  declarations: [
    MyApp,
    RecordingPage,
    SettingPage,
    HomePage,
    AudioplayerPage,
    TabsPage
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecordingPage,
    SettingPage,
    HomePage,
    AudioplayerPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
