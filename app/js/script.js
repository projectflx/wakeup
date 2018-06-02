function wakeUpWithWOL(host, mac) {
    $.ajax({
        type: 'POST',
        url: 'wol.php',
        data:{
            MAC:mac
        },
        success: function(data) {
            if(data == 0) {
                showNotifyBox('Magic Packet send to '.concat(host).concat('.'));
            } else {
                showErrorNotifyBox(data);
            }
        }
    });
}

function showNotifyBox(message) {
    $.notify({
        // options
        message: message
    },{
        // settings
        position: null,
        placement: {
            from:   'top',
            align:  'center'
        },
        offset: 0,
        spacing: 0,
        delay: 3000,
        url_target: '_blank',
        type:       'success',
        animate: {
            enter:  'animated fadeInDown',
            exit:   'animated fadeOutUp'
        },
        template:   '<div data-notify="container" class="col-xs-11 alert alert-{0}" role="alert">' +
                        '<span data-notify="message">{2}</span>' +
                    '</div>'
    });
}

function showErrorNotifyBox(message) {
    $.notify({
        // options
        message: message
    },{
        // settings
        allow_dismiss: true,
        position: null,
        placement: {
            from:   'top',
            align:  'center'
        },
        offset: 0,
        spacing: 0,
        delay: 0,
        url_target: '_blank',
        type:       'danger',
        animate: {
            enter:  'animated fadeInDown',
            exit:   'animated fadeOutUp'
        },
        template:   '<div data-notify="container" class="col-xs-11 alert alert-{0}" role="alert">' +
                        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                        '<span data-notify="message">{2}</span>' +
                    '</div>'
    });
}