import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SplitterModule} from "primeng/splitter";
import {ChipModule} from "primeng/chip";
import {DatePipe} from "@angular/common";
import {CardModule} from "primeng/card";
import {OrderListModule} from "primeng/orderlist";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    SplitterModule,
    ChipModule,
    CardModule,
    OrderListModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
