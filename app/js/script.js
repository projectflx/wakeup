function wakeUpWithWOL(host, mac) {
    $.ajax({
        type: 'POST',
        url: 'wol.php',
        data:{MAC:mac},
        success: function(data) {
            if(data == -1) {
                showNotifyBox( mac.concat(' is not a valid MAC.'), 'danger');
            } else if (data == -2) {
                showNotifyBox( 'The OS you are running this site on is not supported.', 'danger');
            } else if (data == -3) {
                showNotifyBox('Wrong call of the function WakeOnLan.', 'danger');
            } else {
                showNotifyBox('Magic Packet send to '.concat(host).concat('.'), 'success');
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