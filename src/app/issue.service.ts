import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {
  }

  /**
   * get all issues
   */
  getIssues() {
    return this.http.get(`${this.uri}/issues`);
  }

  /**
   * get an issue by id
   */
  getIssueById(id) {
    return this.http.get(`${this.uri}/issues/${id}`);
  }

  /**
   * add an issue
   */
  addIssue(title, responsible, description, severity, status, creationDate) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status,
      creationDates: creationDate
    };
    return this.http.post(`${this.uri}/issues/add`, issue);
  }

  /**
   * update an issue
   */
  updateIssue(id, title, responsible, description, severity, status, creationDate) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status,
      creationDates: creationDate
    };
    return this.http.post(`${this.uri}/issues/update/${id}`, issue);
  }

  /**
   * delete an issue
   */
  deleteIssue(id) {
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  }
}
