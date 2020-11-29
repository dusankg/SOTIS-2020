import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/permissions/register/register.component';
import { TestsPreviewComponent } from './components/tests-preview/tests-preview.component';
import { LoginComponent } from './components/permissions/login/login.component';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { TestPreviewComponent } from './components/test-preview/test-preview.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { NewTestComponent } from './new-test/new-test.component';
 
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TestsPreviewComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    TestPreviewComponent,
    NewTestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MatPaginatorModule,
    MatButtonModule,
    MatListModule,
    FormsModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
