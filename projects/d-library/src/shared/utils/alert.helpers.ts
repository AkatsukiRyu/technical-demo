import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

export enum SweetAlertIconType {
    Error = 'error',
    Info = 'info',
    Success = 'success',
    Warning = 'warning'
}

export class SwalHelper {
    public static fireAlert( opts: {
        iconType: SweetAlertIconType
        title: string;
        message: string;
        footer?: string;
        showCancel?: boolean;
    }): Promise<SweetAlertResult> {
        const alertOptions: SweetAlertOptions = {
            icon: opts.iconType,
            title: opts.title,
            text: opts.message,
            heightAuto: false
        }

        if (opts.footer) {
            alertOptions.footer = opts.footer
        }

        if (opts.showCancel) {
            alertOptions.showCancelButton = opts.showCancel;
        }

        return Swal.fire(alertOptions);
    }
}
