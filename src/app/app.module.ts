import { HotToastModule } from '@ngneat/hot-toast';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { LayoutModule } from './component/layout/layout.module';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

//ngx-translate
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { TranslateLoader,TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



@NgModule({
  declarations: [
    AppComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatFormFieldModule,
    LayoutModule,
    MatInputModule,
    HotToastModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
     loader:{
      provide:TranslateLoader,
      useFactory: httpTranslateLoader,
      deps:[HttpClient]
     }
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//AOT compilation support
export function httpTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http)
}
