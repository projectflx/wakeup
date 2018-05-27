function wakeUpWithWOL(host, mac) {
    $.ajax({
        type: 'POST',
        url: 'wol.php',
        data:{
            MAC:mac
        },
        success: function(data) {
            if(data == 0) {
                showNotifyBox('Magic Packet send to '.concat(host).concat('.'), 'success');
            } else {
                showNotifyBox( data, 'danger');
            }
        }
    });
}

function showNotifyBox(message, type) {
    $.notify({
        // options
        message: message
    },{
        // settings
        allow_dismiss: true,
        position: null,
        placement: {
            from: 'top',
            align: 'center'
        },
        offset: 0,
        spacing: 0,
        delay: 1000,
        timer: 1000,
        url_target: '_blank',
        type: type,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        template: '<div data-notify="container" class="col-xs-11 alert alert-{0}" role="alert">' +
                '<span data-notify="message">{2}</span>' +
            '</div>'
    });
}