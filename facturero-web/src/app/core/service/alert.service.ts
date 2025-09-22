import { Injectable } from '@angular/core';

declare const $: any;

const type: string[] = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];



@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public info(message: string) {
    this.showNotification(message, 'top', 'center', type[1], 3000);
  }

  public success(message: string, timer: number = 3000) {
    console.log(timer);
    this.showNotification(message, 'top', 'center', type[2], timer);
  }

  public warning(message: string) {
    this.showNotification(message, 'top', 'center', type[3], 3000);
  }

  public error(message: string) {
    this.showNotification(message, 'top', 'center', type[4], 5000);
  }




  private showNotification(message: string, from: string, align: string, type: string, timer) {

    $.notify({
      icon: 'notifications',
      message: message
    }, {
      type,
      delay: timer,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
