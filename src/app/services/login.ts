import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { LoginDTO } from "../modelos/logins";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private apiUrl = environment.apiUrl + 'auth'; // Endpoint de autenticación
  invalid: any;

    constructor(private http: HttpClient) {}

    public login(inicio: LoginDTO): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/login`, inicio);
    }

}