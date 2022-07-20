import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from 'src/app/note';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  note = new Note();
  form: FormGroup;
  currentFile?: File;
  data: any;
  files: any;

  constructor(private noteService: NoteService, private router: Router, private httpClient: HttpClient, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      image: [''],
      title: [''],
      description: ['']
    })
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      image: [null, Validators.required],
      title: ['', Validators.required],
      description: ['']
    })
  }

  imageUpload(event: any) {
    this.files = event.target.files[0];
    var image = document.getElementById('output') as HTMLImageElement | null;
    if (image !== null) {
      image.src = URL.createObjectURL(event.target.files[0]);
    }
  }

  insertNote() {
    const formData = new FormData();
    if (this.form.get('image')?.value == null) {
      formData.append("image", '');
      formData.append("title", this.form.get('title')?.value);
      formData.append("description", this.form.get('description')?.value);
      this.noteService.addNotes(formData).subscribe(response => {
        this.data = response;
        Swal.fire({
          title: 'Hurray!!',
          text: "Successfully added!",
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: false
        });
        window.location.reload();
      }, (err) => {
        window.alert("The given Note details could not be added")
      });
      this.router.navigateByUrl('/');
    }
    formData.append("image", this.files, this.files?.name);
    formData.append("title", this.form.get('title')?.value);
    formData.append("description", this.form.get('description')?.value);
    this.noteService.addNotes(formData).subscribe(response => {
      this.data = response;
      Swal.fire({
        title: 'Hurray!!',
        text: "Successfully added!",
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false
      });
      window.location.reload();
    }, (err) => {
      window.alert("The given Note details could not be added")
    });
    this.router.navigateByUrl('/');
  }

  close() {
    this.router.navigateByUrl('/');
  }
}
