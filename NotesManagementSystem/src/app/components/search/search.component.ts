import { NoteService } from '../../services/note.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Note } from 'src/app/note';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  note: any;
  displaySearch!: boolean;
  imageDirectory = environment.URL + '\\storage\\images\\';
  form: FormGroup;
  constructor(private noteService: NoteService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['']
    });
  }
  ngOnInit(): void {
  }
  searchNote() {
    this.noteService.searchNote(this.form.get('title')?.value).subscribe((response: Note) => {
      this.note = response;
    },
      (err) => {
        window.alert("Please enter the (valid) title to look for it!");
      });
  }

  displaySearchFun() {
    this.displaySearch = true;
  }

  close() {
    this.displaySearch = false;
  }
}
