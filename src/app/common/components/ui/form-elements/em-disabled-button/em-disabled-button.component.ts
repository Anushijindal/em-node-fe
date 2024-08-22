import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-em-disabled-button',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,MatDividerModule,CommonModule],
  templateUrl: './em-disabled-button.component.html',
  styleUrl: './em-disabled-button.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class EmDisabledButtonComponent {

}
