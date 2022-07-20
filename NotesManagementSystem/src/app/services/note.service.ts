import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  id: any;
  pasredInt!: number;
  check: any;
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json'
    })
  }
  listNotes() {
    return this.httpClient.get<any>(environment.URL + `/api/notes`);
  }

  addNotes(note: any): Observable<any> {
    // let headers: HttpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    //   'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    // });
    return this.httpClient.post<any>(environment.URL + `/api/note`, note);
  }

  find(id: number): Observable<any> {
    let check = this.httpClient.get<any>(environment.URL + `/api/note/` + id);
    return check;

  }

  getNoteByID(id: any) {
    return this.httpClient.get<any>(environment.URL + `/api/note/` + id);
  }

  getNoteByTitle(title: any) {
    return this.httpClient.get<any>(environment.URL + `/api/note/` + title);
  }

  searchNote(title: any) {
    return this.httpClient.get<any>(environment.URL + `/api/searchnotes/search_notes?search_notes=` + title);
  }

  updateNote(id: any, note: Note): Observable<any> {
    return this.httpClient.put<any>(environment.URL + `/api/note/` + id, note, this.httpOptions);
  }

  deleteNote(id: any): Observable<any> {
    return this.httpClient.delete<any>(environment.URL + `/api/note/` + id, this.httpOptions);
  }
}
