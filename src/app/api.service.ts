import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getDolarData(): Observable<any> {
    return this.http.get('/marked-data/dolar/dadosDolar');
  }

}
