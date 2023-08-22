import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient, private _authService: AuthService) {}

  saveEmployeeData(employee: Employee) {
    return this.http.post<Employee>(
      'https://auth-3-d80a9-default-rtdb.firebaseio.com/employee.json',
      employee
    );
  }

  fetchEmployee() {
    return this.http
      .get<Employee>(
        'https://auth-3-d80a9-default-rtdb.firebaseio.com/employee.json'
      )
      .pipe(
        map((resData: any) => {
          const empArr = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              empArr.push({ ...resData[key], empId: key });
            }
          }
          return empArr;
        })
      );
  }

  // editEmployee(empId: any, index: any) {
  //   return this.http.put(
  //     'https://auth-3-d80a9-default-rtdb.firebaseio.com/employee/' +
  //       empId +
  //       '.json'
  //   );
  // }

  fetchSingleEmployee(empId: any) {
    return this.http.get(
      'https://auth-3-d80a9-default-rtdb.firebaseio.com/employee/' +
        empId +
        '.json'
    );
  }

  deleteEmployeeData(empId: any) {
    return this.http.delete(
      'https://auth-3-d80a9-default-rtdb.firebaseio.com/employee/' +
        empId +
        '.json'
    );
  }
}
