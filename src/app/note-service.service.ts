import { Injectable } from '@angular/core';
import { Note } from './interface/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private myNotes : Note[] = []
  todayDate:Date = new Date();

  lastUsedId = 1;
  constructor() {
    this.myNotes.push({
      id: this.generateUniqueId(),
      header: 'Sample Note Header',
      message: 'Sample Note',
      date: this.getDate(),
    });

    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this.myNotes = JSON.parse(storedNotes);
    }
   }

  getNotes():Note[]{
    return this.myNotes
  }

  addNote(note:Note){
    note.id = this.generateUniqueId();
    note.date = this.getDate()
    this.myNotes.push(note);
    this.saveNotesToLocalStorage();
  }

  editNote(id:number, updateNote:Note){
    const index = this.myNotes.findIndex(x=>x.id === id);
    if(index !== -1){
      this.myNotes[index] = updateNote;
      this.saveNotesToLocalStorage();
    }
  }

  deleteNote(id:number){
    this.myNotes = this.myNotes.filter(x=>x.id !== id);
    this.saveNotesToLocalStorage();
  }

  private generateUniqueId(): number {
    this.lastUsedId++;
    return this.lastUsedId;
  }

  private saveNotesToLocalStorage(): void {
    localStorage.setItem('notes', JSON.stringify(this.myNotes));
  }

  private getDate() : string{
    return `${this.todayDate.getDate().toString().padStart(2, '0')}/${(this.todayDate.getMonth() + 1).toString().padStart(2, '0')}/${this.todayDate.getFullYear()}`.toString();
  }
}
