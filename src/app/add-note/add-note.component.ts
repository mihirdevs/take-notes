import { Component, Input } from '@angular/core';
import { Note } from '../interface/note';
import { NgForm } from '@angular/forms';
import { NoteService } from '../note-service.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  @Input() note: Note = { id: 0, header: '', message: '' };

  constructor(private noteService: NoteService) {}
  
  submitForm(): void {
    if (this.note.id === 0) {
      this.noteService.addNote({ ...this.note, id: this.generateId() });
    } else {
      this.noteService.editNote(this.note.id, this.note);
    }

    this.note = { id: 0, header: '', message: '' };
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
