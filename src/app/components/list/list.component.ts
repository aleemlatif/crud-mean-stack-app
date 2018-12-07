import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TableModule} from 'primeng/table';
import {HttpClient} from '@angular/common/http';

import {Issue} from '../../issue.model';
import {IssueService} from '../../issue.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  fieldsAndCols: any[];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];
  first = 0;
  constructor(private issueService: IssueService, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchIssues();
    this.fieldsAndCols = [{fieldName: 'title', colHeader: 'title'},
      {fieldName: 'responsible', colHeader: 'responsible'},
      {fieldName: 'severity', colHeader: 'severity'},
      {fieldName: 'status', colHeader: 'status'},
      {fieldName: 'actions', colHeader: 'actions'}
    ];
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
