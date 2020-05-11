import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {ValuesComponent} from './values/values.component';
import {FormComponent} from './form/form.component';
import {ResultComponent} from './result/result.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'values', component: ValuesComponent },
  { path: 'form', component: FormComponent },
  { path: 'result', component: ResultComponent, data: {something: 50 } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
