import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

interface IShowMessage extends SweetAlertOptions {
  enableButtonsAfter?: number;
}

export async function ConfirmationMessage(
  params: SweetAlertOptions,
): Promise<SweetAlertResult> {
  return Swal.fire({
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#5bbf4a',
    cancelButtonColor: '#D8253F',
    focusCancel: true,
    ...params,
  });
}

export async function ShowMessage(
  params: IShowMessage,
): Promise<SweetAlertResult> {
  if (params.enableButtonsAfter) {
    setTimeout(() => {
      Swal.enableButtons();
    }, params.enableButtonsAfter);

    return Swal.fire({
      ...params,
      onBeforeOpen: () => {
        Swal.disableButtons();
      },
    });
  }

  return Swal.fire(params);
}

export async function MessageError(
  message: string,
  title = 'Atenção',
): Promise<SweetAlertResult> {
  return Swal.fire({ icon: 'error', title, html: message });
}

export async function ToastSuccess(message: string): Promise<SweetAlertResult> {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    icon: 'success',
    title: message,
  });
}

export async function ToastError(message: string): Promise<SweetAlertResult> {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    icon: 'error',
    title: message,
  });
}
