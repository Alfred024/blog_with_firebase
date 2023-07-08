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

  // Init Firebase nuevamente
  firebase.initializeApp(varConfig);

  // Adicionar el service worker
  navigator.serviceWorker.register('notificaciones-sw.js')
    .then(registro =>{
      console.log('Service worker registrado'); 
      firebase.messaging().userServiceWorker(registro);
    })
    .catch(e =>{
      console.log(`Error con las notificaciones:  ${e}`);
    });

    // Registrar LLave publica de messaging
    messaging.usePublicVapidKey('BIe3SPSH_S64bLVZeJxaTpcLV_09wAj-FqgZ-IY0mhAqrypGs6n4houN-JQkhRCqMF0k2fCw-t13JQq9enydc3g');

    messaging
      .requestPermission()
      .then(() => {
      console.log('permiso otorgado')
      return messaging.getToken()
      })
      .then(token => {
        const db = firebase.firestore();
        db.settings({ timestampsInSnapshots: true })
        db
          .collection('tokens')
          .doc(token)
          .set({
            token: token
          })
          .catch(error => {
            console.error(`Error al insertar el token en la BD => ${error}`)
          })
      })

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
    $('#tituloPost').text('Posts de la Comunidad');
    const post = new Post();
    post.consultarTodosPost();
  })

  $('#btnMisPost').click(() => {
    const user = firebase.auth().currentUser;
    if(user){
      const post = new Post();
      post.consultarPostxUsuario(user.email);
      $('#tituloPost').text('Mis posts')
    } else{
      Materialize.toast(`Es necesario iniciar sesión para ver sus posts`, 4000)
    }   
  })
})
