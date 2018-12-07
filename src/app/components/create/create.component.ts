import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Issue } from '../../issue.model';
import { IssueService } from '../../issue.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  selectedStatus: String;

  constructor(private issueService: IssueService, private fb: FormBuilder, private router: Router) {

    this.createForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: '',
      creationDate: ''
    });
  }

  ngOnInit() {
    this.selectedStatus = 'Open';
  }

  addIssue(title, responsible, description, severity, status, creationDate) {
    this.issueService.addIssue(title, responsible, description, severity, status, creationDate).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
}
