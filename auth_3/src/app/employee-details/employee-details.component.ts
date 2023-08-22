import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent {
  singleEmpData: any[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _empService: EmployeeService,
    private router: Router
  ) {}
  ngOnInit() {
    // Uxtrendz Params and for error paste my code to chatGPT & follow its instruction
    this._activatedRoute.paramMap.subscribe((params) => {
      const empId = params.get('empId');
      if (empId) {
        this._empService.fetchSingleEmployee(empId).subscribe((res) => {
          this.singleEmpData.push(res);
          console.log(this.singleEmpData);
        });
      } else {
        console.log('Employee ID is missing');
      }
    });
  }

  onGoBack() {
    this.router.navigate(['/dashboard']);
  }
}
