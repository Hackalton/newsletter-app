import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListStudentComponent } from "../../student/list-student/list-student.component";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ListStudentComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
