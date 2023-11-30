import { Component } from '@angular/core';
import { Note } from './interface/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'take-notes';

  selectedNote: Note = { id: 0, header: '', message: '' };

  onEdit(note: Note): void {
    this.selectedNote = { ...note }; // Create a copy of the selected note for editing
  }
}
