import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { JournalistHomeComponent } from './components/journalist/journalist-home/journalist-home.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { SignupComponent } from './components/signup/signup.component';



export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch:'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuard]},
    {path: 'journalist-home', component: JournalistHomeComponent, canActivate:[AuthGuard]},
    {path: 'student-home', component: StudentHomeComponent, canActivate:[AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
