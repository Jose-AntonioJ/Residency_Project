import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AspersionService {
    constructor(private http: HttpClient) {}

    private apiUrl = environment.apiUrl + 'proyecto';


    public trayectoria ( ) {
        
    }

}