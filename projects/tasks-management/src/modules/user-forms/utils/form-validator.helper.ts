import { AbstractControl, ValidationErrors } from "@angular/forms";
import { ValidatorLogicHelpers } from "./validator.logic.helper";


export class FormValidators {
    public static emailValidator(control: AbstractControl): ValidationErrors | null {
        const _email = control.value;

        if (!_email) {
            return { message: 'Missing Email!' };
        }

        const _isMatched = ValidatorLogicHelpers.validateEmail(_email);
        return _isMatched ? null : { message: 'your input for the email is wrong formatted' };
    }
}
