import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditNoteComponent } from './components/edit-note/edit-note.component';
import { AddNoteComponent } from './components/add-note/add-note.component';

const routes: Routes = [
  {
    path: 'new', component: AddNoteComponent
  },
  {
    path: 'edit/:noteId', component: EditNoteComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
