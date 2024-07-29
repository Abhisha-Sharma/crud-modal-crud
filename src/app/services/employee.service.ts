import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}
  /**
   * It is used to add emplyoee
   * It use httpClient for post request and add data to the json server in db.json
   * @param data any
   * @returns observable <any>
   */
  addEmployee(data: any): Observable<any> {
    return this._http.post('  http://localhost:3000/employees', data);
  }

  /**
   * It is used update employee's data on the specific id it wants to edit .
   * It use httpClient for put request and update data to the json server in db.json.
   * @param id number
   * @param data any
   * @returns observable<any>
   */
  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`  http://localhost:3000/employees/${id}`, data);
  }

  /**
   * It is used to provide us employee list  from the db.json file.
   * It use httpClient for get request and takes data from the json server in db.json
   * @returns observable <any>
   */
  getEmployeeList(): Observable<any> {
    return this._http.get('  http://localhost:3000/employees');
  }

  /**
   * It is used to delete the employee that we added, from the db.json file.
   * @param id number
   * @returns observable<any>
   */
  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
}
