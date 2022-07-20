import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteComponent } from './components/note/note.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { SearchComponent } from './components/search/search.component';
import { AddNoteComponent } from './components/add-note/add-note.component';



@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    EditNoteComponent,
    SearchComponent,
    AddNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
