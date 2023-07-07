$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  //Inicio de sesión valores de los tags
  firebase.auth().onAuthStateChanged(user =>{
    if(user){
      $('#btnInicioSesion').text('Cerrar sesión');
      if(user.photoURL){
        $('#avatar').attr('src', user.photoURL);
      }else{
        $('#avatar').attr('alt', 'pon una foto porque no hay');
      }
    }else{
      $('#btnInicioSesion').text('Inciar sesión');
      $('#avatar').attr('src', '');
    }
  })

  // TODO: Adicionar el service worker

  // Init Firebase nuevamente
  firebase.initializeApp(varConfig);

  // TODO: Registrar LLave publica de messaging

  // TODO: Solicitar permisos para las notificaciones

  // TODO: Recibir las notificaciones cuando el usuario esta foreground

  // TODO: Recibir las notificaciones cuando el usuario esta background

  // TODO: Listening real time

  // TODO: Firebase observador del cambio de estado
  //$('#btnInicioSesion').text('Salir')
  //$('#avatar').attr('src', user.photoURL)
  //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
  //$('#btnInicioSesion').text('Iniciar Sesión')
  //$('#avatar').attr('src', 'imagenes/usuario.png')

  // Si hay una sesión iniciada imprime un Toast y muestra el botón de inicio de sesión como logout, entoces podría decirse que cumple la función de iniciar sesión, y si ya hay una sesión, la cierra
  $('#btnInicioSesion').click(() => {
    const user = firebase.auth().currentUser;
    
    if(user){
      firebase
      .auth()
      .signOut()
      .then(() =>{
          $('#avatar').attr('src', 'imagenes/usuario.png')
          Materialize.toast(`Sesión cerrada correctamente `, 3000);
      })
      .catch(e =>{
        console.log('Error cerrando la sesión: '+console.e);
      });
    }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

  $('#avatar').click(() => {
    firebase.auth().signOut()
      .then(() =>{
        $('#avatar').attr('src', 'imagenes/usuario.png');
        Materialize.toast(`SignOut correcto`, 4000);
      })
      .catch(e =>{
        Materialize.toast(`Error con el sign out: ${e}`, 4000)
      })
    
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')   
  })

  $('#btnMisPost').click(() => {
    //$('#tituloPost').text('Mis Posts')
    //Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)    
  })
})
