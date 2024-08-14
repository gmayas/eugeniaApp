
import toastr from 'toastr';
//
export const alertMsg =  (message, title, type) => {
    try {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "500",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
          //toastr.clear()
          switch (type) {
            case "success":
                toastr.success(message, title)
              break;
            case "info":
                toastr.info(message, title)
              break;
            case "warning":
                toastr.warning(message, title)
              break;
            case "error":
                toastr.error(message, title)
              break;
            default:
                toastr.warning('Elija tipo de Alert.', 'Menseje de Euenia.')
              break;
          };
    } catch (e) {
        console.log(e);
        toastr.error(e.message, 'Menseje de Euenia.')
    };
};