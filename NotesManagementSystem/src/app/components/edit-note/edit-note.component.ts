import { NoteService } from '../../services/note.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/note';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  imageDirectory = environment.URL + '\\storage\\images\\';
  noteId: any;
  note: any;
  routeSub: any;
  noteModel = new Note();
  image: any;
  constructor(private route: ActivatedRoute, private router: Router, private noteService: NoteService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.noteId = params['noteId']
    });
    this.getNoteDetails();
  }

  getNoteDetails() {
    this.noteService.getNoteByID(this.noteId).subscribe(response => {
      this.note = response;
      this.noteModel = this.note;
    }, (err) => {
      window.alert("The Note is not found")
    });
  }

  updateNote() {
    this.noteService.updateNote(this.noteId, this.noteModel).subscribe(response => {
      window.location.reload();
    });
    this.router.navigateByUrl('/');
  }

  close() {
    this.router.navigateByUrl('/');
  }
}
