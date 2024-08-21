import { Component, ViewEncapsulation } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-em-button',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,MatDividerModule,CommonModule],
  templateUrl: './em-button.component.html',
  styleUrl: './em-button.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class EmButtonComponent {

}
