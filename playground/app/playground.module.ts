import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { FsExampleModule } from '@firestitch/example';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';

import { AppComponent } from './app.component';
import {
  ColumnComponent,
  ExamplesComponent,
  FormFieldComponent,
  GenericHelpersComponent,
  HeadingsComponent,
  HelpersComponent,
  RowComponent,
  TypographyComponent
} from './components';
import { AppMaterialModule } from './material.module';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    RouterModule.forRoot(routes, {}),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    GenericHelpersComponent,
    TypographyComponent,
    FormFieldComponent,
    HelpersComponent,
    RowComponent,
    ColumnComponent,
    HeadingsComponent,
  ],
})
export class PlaygroundModule {
}
