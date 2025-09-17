import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ControlTiempoDTO, MovimientoDTO } from "../modelos/moviments";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AspersionService {

  private apiUrl = environment.apiUrl + 'proyecto';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ No hay token en localStorage');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public trayectoria(trayectos: MovimientoDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/trayectoria`, trayectos, { headers: this.getAuthHeaders() });
  }

  public controlTiempo(control: ControlTiempoDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/controlTiempo`, control, { headers: this.getAuthHeaders() });
  }

}