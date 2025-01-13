import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { JournalistHomeComponent } from './components/journalist/journalist-home/journalist-home.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { SignupComponent } from './components/signup/signup.component';
import { DeleteStudentComponent } from './components/student/delete-student/delete-student.component';
import { ListStudentComponent } from './components/student/list-student/list-student.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { EditStudentComponent } from './components/student/edit-student/edit-student.component';
import { CreateNewsletterComponent } from './components/newsletter/create-newsletter/create-newsletter.component';
import { EditNewsletterComponent } from './components/newsletter/edit-newsletter/edit-newsletter.component';
import { ListNewsletterComponent } from './components/newsletter/list-newsletter/list-newsletter.component';



export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuard]},
    {path: 'journalist-home', component: JournalistHomeComponent, canActivate:[AuthGuard]},
    {path: 'student-home', component: StudentHomeComponent, canActivate:[AuthGuard]},
    {path: 'createStudent', component: AddStudentComponent},
    {path: 'deleteStudent', component: DeleteStudentComponent},
    {path: 'updateStudent/:id', component: EditStudentComponent},
    {path: 'listStudents', component: ListStudentComponent},
    {path: 'createNewsletter', component: CreateNewsletterComponent},
    {path: 'editNewsletter/:id', component: EditNewsletterComponent},
    {path: 'listNewsletter', component: ListNewsletterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
