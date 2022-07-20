import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NoteService } from './../../services/note.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  notes: any;
  imageDirectory = environment.URL + '\\storage\\images\\';

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
    this.showNotes();
  }

  showNotes() {
    this.notes = this.noteService.listNotes().subscribe(response => {
      this.notes = response;
    });
  }
  deleteNote(id: any) {
    this.noteService.deleteNote(id).subscribe(response => {
      this.showNotes();
    }, (err) => {
      window.alert("The given Id is not found")
    });
  }
}
