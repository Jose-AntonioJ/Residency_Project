import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotifyComponent } from "../helpers/notify/notify.component";

@Injectable({
    providedIn: 'root' 
})
export class NotifyService {
    constructor(private snackBar: MatSnackBar){}

    successFull(text: string) {
        this.snackBar.openFromComponent(NotifyComponent, {
            duration: 4000,
            panelClass: ['green'],
            data: {
                text: text,
                type: 'success'
            },
        });
    }

    infoNotification(text: string) {
        this.snackBar.openFromComponent(NotifyComponent, {
            duration: 4000,
            panelClass: ['blue'],
            data: {
                text: text,
                type: 'info'
            },
        });
    }

    errorNotification(text: string) {
        this.snackBar.openFromComponent(NotifyComponent, {
            duration: 4000,
            panelClass: ['red'],
            data: {
                text: text,
                type: 'error'
            },
        });
    }

    appComponentScrollToContainerId = 'appComponentScrollToContainerId';
}