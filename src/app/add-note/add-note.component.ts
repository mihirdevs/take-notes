import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../interface/note';
import { NgForm } from '@angular/forms';
import { NoteService } from '../note-service.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {

  @Output() saved = new EventEmitter<Note>();
  @Output() canceled = new EventEmitter<void>();
  @Input() note: Note = { id: 0, header: '', message: '' };

  constructor(private noteService: NoteService) {}
  
  submitForm(noteForm:NgForm): void {
    if(!noteForm.valid){
        alert("Hey you forgot to enter notes")
    }
    else{
      if (this.note.id === 0) {
        this.noteService.addNote({ ...this.note });
      } else {
        this.noteService.editNote(this.note.id, this.note);
      }
      this.saved.emit({ ...this.note });
      this.note = { id: 0, header: '', message: '' };
    }
  }

  cancelForm(noteForm:NgForm):void{
    this.canceled.emit();
    noteForm.resetForm();
  }
}
