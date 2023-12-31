class Post {
  constructor () {
    this.db = firebase.firestore();  
    //Variable que nos ayudará a recuperar los datos delcarados en la BdD como timeStamp
    const settings = {
        timeStampInSnaphots: true
    }
    this.db.settings(settings);
  }

  crearPost (uid, emailUser, titulo, descripcion, imagenLink, videoLink) {
    return this.db.collection('posts').add({
        uid: uid,
        autor: emailUser, 
        titulo: titulo, 
        descripcion: descripcion, 
        imagenLink: imagenLink, 
        videoLink: videoLink,
        fecha: firebase.firestore.FieldValue.serverTimeStamp()
    })
    .then(refDoc => {
        console.log(`Post id: ${refDoc.id} `);
    })
    .catch(e => {
        console.log(`Error con la creación del post: ${e}`);
    });
  }

  consultarTodosPost () {
    //Escucha los cambios de la colección 'post' y notifica a la app, ofreciedonos una copia de ello
    this.db
        .collection('posts')
        //.orderBy('fecha', 'asc') --> para ordenar por un campo específico
        .onSnapshot(querySnapshot =>{

        //Limpia los posts renderizados y actualiza a los más nuevos
        $('posts').empty();

        if(querySnapshot.empty){
            //Retorna un template precreado con la plantilla de un post demo
            $('#posts').append(this.obtenerTemplatePostVacio());
        }else{
            //El método querySnapshot retorna la información de los datos de la colección
            querySnapshot.forEach(post => {
                let postHtml = this.obtenerPostTemplate(
                    post.data().autor,
                    post.data().titulo,
                    post.data().descripcion,
                    post.data().videoLink,
                    post.data().imagenLink,
                    Utilidad.obtenerFecha(post.data().fecha.toDate())
                );
                $('#posts').append(postHtml);
            });
        }
    });
  }

  consultarPostxUsuario (emailUser) {
    //El mismo método para consultar todos los posts, pero con el filtro where
   this.db.collection('posts')
    .where('autor', '===', emailUser)
    .onSnapshot(querySnapshot =>{

    $('posts').empty();

    if(querySnapshot.empty){
        $('#posts').append(this.obtenerTemplatePostVacio());
    }else{
        querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().autor,
                post.data().titulo,
                post.data().descripcion,
                post.data().videoLink,
                post.data().imagenLink,
                Utilidad.obtenerFecha(post.data().fecha.toDate())
            );
            $('#posts').append(postHtml);
        });
    }
});
  }

  subirImagenAPost(file, uid){
    //Si no existe la ruta la crea
    const storageLink = firebase.storage().ref(`postImages/${uid}/${file.name}`);
    //Esta variable almacena la tarea en ejecución
    const task = storageLink.put(file);

    task.on(
        'state_changed', 
        snapshot => {
            const progreso = (snapshot.bytesTransfered / snapshot.totalBytes)*100;

        },
        err => {
            Materialize.toast(`Error subiendo archivo = > ${err.message}`, 4000);
            //No sé de dónde sea esta etiqueta "determinate", según yo debería estar en el modal del blog, de todas formas la dejé como el profe
            $('.determinate').attr('style', `width: ${porcentaje}%`);
        },
        () => {
            task.snapshot.ref
              .getDownloadURL()
              .then(url => {
                console.log(url)
                sessionStorage.setItem('imgNewPost', url)
              })
              .catch(err => {
                Materialize.toast(`Error obteniendo downloadURL = > ${err}`, 4000)
              })
        }
    )
  }

  obtenerTemplatePostVacio () {
    return `<article class="post">
      <div class="post-titulo">
          <h5>Crea el primer Post a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-video">
          <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`
  }

  obtenerPostTemplate (
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    fecha
  ) {
    if (imagenLink) {
      return `<article class="post">
            <div class="post-titulo">
                <h5>${titulo}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">                
                <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                    alt="Imagen Video">     
            </div>
            <div class="post-videolink">
                <a href="${videoLink}" target="blank">Ver Video</a>                            
            </div>
            <div class="post-descripcion">
                <p>${descripcion}</p>
            </div>
            <div class="post-footer container">
                <div class="row">
                    <div class="col m6">
                        Fecha: ${fecha}
                    </div>
                    <div class="col m6">
                        Autor: ${autor}
                    </div>        
                </div>
            </div>
        </article>`
    }

    return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                    <iframe type="text/html" width="500" height="385" src='${videoLink}'
                        frameborder="0"></iframe>
                    </figure>
                </div>
                <div class="post-videolink">
                    Video
                </div>
                <div class="post-descripcion">
                    <p>${descripcion}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fecha}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
            </article>`
  }


}
