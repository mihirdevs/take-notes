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
  selectedNote: Note | null = null;

  constructor(public noteService : NoteService){}

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
  }

  editNote(note:Note): void {
    this.selectedNote = {...note}
  }

  saveEdit(updatedNote: Note): void {
    const index = this.notes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = { ...updatedNote };
    }

    this.selectedNote = null;
  }

  cancelEdit(): void {
    this.selectedNote = null;
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id);
    this.notes = this.noteService.getNotes();
  }

  get filteredNotes(): Note[] {
    return this.notes.filter(
      (note) =>
        note.header.toLowerCase().includes(this.searchTerm.trimEnd().toLowerCase()) ||
        note.message.toLowerCase().includes(this.searchTerm.trimEnd().toLowerCase())
    );
  }
}
