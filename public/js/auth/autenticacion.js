class Autenticacion {
  autEmailPass (email, password) {
    //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
    //Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
    //$('.modal').modal('close')
   
  }

  //Función para crear ususario
  crearCuentaEmailPass (email, password, nombres) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res =>{
        res.user.updateProfile({
          //Actualizar la información del usuario
          displayName: nombres
        });

        //Url para redireccionar dseúés de actualizar los datos
        const config = {
          'url': 'http://localhost:3000'
        }
        res.user.sendEmailVerification(config)
          .catch(error =>{
            console.log('Error al mandar correo de verificación');
            Materialize.toast(error.message, 4000);
          });
        
        //Cerramos la sesión 
        firebase.auth().signOut();
        Materialize.toast(`Bienvenid@ ${nombres}, favor de verificar su cuenta`, 4000);

        $('.modal').modal('close')
      })
      .catch(error =>{
        console.log(error);
        Materialize.toast(error.message, 4000);
      })
    
  }

  authCuentaGoogle () {
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authCuentaFacebook () {
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authTwitter () {
    // TODO: Crear auth con twitter
  }
}
