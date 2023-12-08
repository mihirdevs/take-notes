import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Note } from '../interface/note';
import { NgForm } from '@angular/forms';
import { NoteService } from '../note-service.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit{

  @Output() saved = new EventEmitter<Note>();
  @Output() canceled = new EventEmitter<void>();
  @Input() note: Note = { id: 0, header: '', message: '', date:'' };
  @ViewChild('headerInput') headerInput!: ElementRef;
  
  isNoteEditing : boolean  = false

  constructor(private noteService: NoteService) {}
  ngOnInit(): void {
    if(this.note.id !== 0){
      this.isNoteEditing = true;
    }
    else{
      this.isNoteEditing = false;
    }
  }
  
  handleKeyUp(event: Event, form: NgForm): void {
    const keyboardEvent = event as KeyboardEvent;
    const messageValue = this.note.message.trim();
    if (keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey && messageValue !== '') {
      this.submitForm(form);
    }
  }

  submitForm(noteForm:NgForm): void {
    if(!noteForm.valid){
        alert("Hey you forgot to enter notes")
        this.focusOnHeaderInput()
    }
    else{
      if (this.note.id === 0) {
        this.noteService.addNote({ ...this.note });
      } else {
        this.noteService.editNote(this.note.id, this.note);
      }
      this.saved.emit({ ...this.note });
      this.note = { id: 0, header: '', message: '',date:'' };
    }
    this.focusOnHeaderInput()
  }

  cancelForm(noteForm:NgForm):void{
    this.canceled.emit();
    noteForm.resetForm();
    this.focusOnHeaderInput();
  }

  focusOnHeaderInput(): void {
    this.headerInput.nativeElement.focus();
  }
}
