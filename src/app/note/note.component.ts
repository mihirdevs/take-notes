import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note-service.service';
import { Note } from '../interface/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit{

  notes : Note[] = [];
  searchTerm: string = '';

  constructor(public noteService : NoteService){}

  ngOnInit(): void {
    this.noteService.getNotes();
    console.log(this.notes);
  }

  editNote(id: number): void {
    // Handle edit logic here
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id);
    this.notes = this.noteService.getNotes();
  }
}
