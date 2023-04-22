import { EMAIL_REGEX } from "task-managment/app/constanst/regex.constants";


export class ValidatorLogicHelpers {
    public static validateEmail(email: string): boolean {
        const isMatched = email
            .toLowerCase()
            .match(
                EMAIL_REGEX
            );

        return !!isMatched;
    }
}
