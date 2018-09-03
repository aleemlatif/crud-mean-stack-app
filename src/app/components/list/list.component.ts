import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TableModule} from 'primeng/table';
import {HttpClient} from '@angular/common/http';

import {Issue} from '../../issue.model';
import {IssueService} from '../../issue.service';

export interface Car {
  vin?;
  year?;
  brand?;
  color?;
  price?;
  saleDate?;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  fieldsAndCols: any[];
  cars: Car[];

  constructor(private issueService: IssueService, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.getCars();
    this.fetchIssues();
    this.fieldsAndCols = [{fieldName: 'title', colHeader: 'title'},
      {fieldName: 'responsible', colHeader: 'responsible'},
      {fieldName: 'severity', colHeader: 'severity'},
      {fieldName: 'status', colHeader: 'status'},
      {fieldName: 'actions', colHeader: 'actions'}
    ];
  }

  getCars() {
    return this.http.get<any>('assets/data/cars.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => {
        this.cars = data;
      });
  }

  fetchIssues() {
    this.issueService
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('All Issues: ', this.issues);
      });
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

}
