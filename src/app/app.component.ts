import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonEngine } from '@angular/ssr';
import { Router } from 'express';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'magazine';
}
