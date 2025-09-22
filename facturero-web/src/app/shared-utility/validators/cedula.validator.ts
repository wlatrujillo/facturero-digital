import { AbstractControl } from '@angular/forms';
export function ValidateCedula(control: AbstractControl): { [key: string]: any } | null {
    /*** Validador de Cedula Mod 10
      * Los dos primero digitos representan la provincia mayor a 0 y menor o igual a 24 
      * Los siguiente hasta el noveno digito son un numero consecutivo
      * Decimo digito es el verificador
      * Los tres ultimos digitos corresponden a la sucursal principal
      * Coeficientes para los nueve primeros digitos 2.1.2.1.2.1.2.1.2
  **/
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const digits = control.value.split('').map(e => Number(e));

    if (digits.length < 10) return null;

    let values = coeficientes.map((coeficiente, index) => {
        let producto = coeficiente * digits[index];
        if (producto >= 10) producto = producto - 9;
        return producto;
    })

    let suma = values.reduce((a, e) => a + e, 0);

    let mod10 = 10 - (suma % 10);

    if (mod10 >= 10) mod10 = 0;

    if (digits[9] !== mod10) return { invalidCedula: true };

    return null;
}