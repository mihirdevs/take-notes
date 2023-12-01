import { Injectable } from '@angular/core';
import { Note } from './interface/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private myNotes : Note[] = [{id:1,header:"First Header",message:"First Note"},{id:2,header:"First Header",message:"First Note"},{id:3,header:"First Header",message:"First Note"}]; 
  lastUsedId = 1;
  constructor() { }

  getNotes():Note[]{
    return this.myNotes
  }

  addNote(note:Note){
    note.id = this.generateUniqueId();
    this.myNotes.push(note);
  }

  editNote(id:number, updateNote:Note){
    const index = this.myNotes.findIndex(x=>x.id === id);
    if(index !== -1){
      this.myNotes[index] = updateNote;
    }
  }

  deleteNote(id:number){
    this.myNotes = this.myNotes.filter(x=>x.id !== id);
  }

  private generateUniqueId(): number {
    this.lastUsedId++;
    return this.lastUsedId;
  }
}
