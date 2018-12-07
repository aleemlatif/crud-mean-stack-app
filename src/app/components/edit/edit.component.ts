import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

import {IssueService} from '../../issue.service';
import {Issue} from '../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: String;
  selectedSeverity: String;
  selectedStatus: String;
  descriptionEditor: string;
  issue: any = {};
  updateForm: FormGroup;

  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('severity').setValue(this.issue.severity);
        this.updateForm.get('status').setValue(this.issue.status);
        this.updateForm.get('creationDate').setValue(this.issue.creationDate);

        this.selectedSeverity = this.issue.severity;
        this.selectedStatus = this.issue.status;
      });
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: '',
      creationDate: ''
    });
  }

  updateIssue(title, responsible, description, severity, status, creationDate) {

    console.log('Issue updated: ', this.id, title, responsible, description, severity, status, creationDate);

    this.issueService.updateIssue(this.id, title, responsible, description, severity, status, creationDate).subscribe(() => {
      this.snackBar.open('Issue updated successfully', 'OK', {
        duration: 3000,
      });
    });
  }

  onTextChanged(e) {
    if (e.source === 'api') {
      return;
    }
    const textValue = e.textValue;
    const htmlValue = e.htmlValue;
    this.updateForm['description'] = e.textValue;
    console.log('onTextChanged: ', e);
  }
  onSelectionChanged(e) {
    console.log('onSelectionChanged: ', e);
  }

}
