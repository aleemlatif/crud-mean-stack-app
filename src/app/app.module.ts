import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule
} from '@angular/material';

import {DataTableModule, SharedModule, OrderListModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {EditorModule} from 'primeng/editor';
import {CalendarModule} from 'primeng/calendar';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ListComponent} from './components/list/list.component';
import {CreateComponent} from './components/create/create.component';
import {EditComponent} from './components/edit/edit.component';

import {IssueService} from './issue.service';

const routes: Routes = [
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'list', component: ListComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    DataTableModule,
    OrderListModule,
    SharedModule,
    TableModule,
    EditorModule,
    CalendarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
