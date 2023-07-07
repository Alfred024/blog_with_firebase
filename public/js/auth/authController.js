const { name } = require("browser-sync");

$(() => {    

    //$("#authFB").click(() => );

    $("#btnRegistroEmail").click(() => {
        const nombres = $('#nombreContactoReg').val();
        const email = $('#emailContactoReg').val();
        const password = $('#passwordReg').val();
        const auth  = new Autenticacion();
        auth.crearCuentaEmailPass(email, password, nombres);
    });

    $("#btnInicioEmail").click(() => {
        const email = $('#emailSesion').val();
        const password = $('#passwordSesion').val();
        const auth  = new Autenticacion();
        auth.authEmailPass(email, password);
    });

    //$("#authGoogle").click(() => //AUTH con GOOGLE);

    //$("#authTwitter").click(() => //AUTH con Twitter);

    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close');
        $('#modalRegistro').modal('open');
    });

    $('#btnInicioSesion').click(() => {
        $('#modalRegistro').modal('close');
        $('#modalSesion').modal('open');
    });

});