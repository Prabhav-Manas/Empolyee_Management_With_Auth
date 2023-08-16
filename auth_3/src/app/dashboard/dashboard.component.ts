import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  addEmployeeForm: any = FormGroup;
  empFormData: any[] = [];

  employeeArr: any[] = [];
  editMode: boolean = false;
  editEmployeeId: any;
  constructor(
    private fb: FormBuilder,
    private _empService: EmployeeService,
    private http: HttpClient
  ) {
    this.addEmployeeForm = this.fb.group({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.onfetchEmployee();
  }

  onOpenAddEmployeeForm() {
    this.addEmployeeForm.reset();
    this.editMode = false;
  }

  onAddEmployee(empData: Employee) {
    if (this.editMode) {
      this.http
        .put(
          'https://auth-3-d80a9-default-rtdb.firebaseio.com/employee/' +
            this.editEmployeeId +
            '.json',
          empData
        )
        .subscribe(
          (resData) => {
            console.log(resData);
            this.onfetchEmployee();
          },
          (errRes) => {
            console.log(errRes);
          }
        );
    } else {
      this._empService.saveEmployeeData(this.addEmployeeForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.onfetchEmployee();
        },
        (errRes) => {
          console.log(errRes);
        }
      );
      this.addEmployeeForm.reset();
    }
  }

  onfetchEmployee() {
    this._empService.fetchEmployee().subscribe(
      (res: any) => {
        this.employeeArr = res;
        this.onDeleteEmployee;
        console.log(this.employeeArr);
      },
      (errRes) => {
        console.log(errRes);
      }
    );
  }

  onEditEmployee(empId: any, index: any) {
    console.log(this.employeeArr[index]);
    this.editMode = true;
    this.editEmployeeId = empId;
    this.addEmployeeForm.setValue({
      id: this.employeeArr[index].id,
      name: this.employeeArr[index].name,
      gender: this.employeeArr[index].gender,
      designation: this.employeeArr[index].designation,
      status: this.employeeArr[index].status,
    });
  }

  onDeleteEmployee(empId: any) {
    if (confirm('Do you want to delete this employee ?')) {
      this._empService.deleteEmployeeData(empId).subscribe(
        (resData) => {
          console.log(resData);
        },
        (errRes) => {
          console.log(errRes);
        }
      );
    }
  }
}
