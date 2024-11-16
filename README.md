# PROYECTO FINAL `P`osts

Proyecto final del curso **Digitalers Node.js Developer**

![Descripción de la imagen](https://storage.googleapis.com/cdn-ar/portfolio/posts-image-preview-1.webp)
## Sobre mi

Hola me llamo Raul Martinez soy un estudiante avanzado de la carrera Tecnicatura universitaria en programación,
realice este curso para seguir aprendiendo más sobre la programación web con un uso nuevo 
framework llamado **Node.js**

## Sobre mi proyecto

Mi proyecto se trata sobre postear publicaciones, como una red social.

* Cuenta con registro de usuarios
* Inicio de sesiones
* Crear, editar y eliminar posts
* Cada usuario puede tener una imagen de perfil
* Cada post creado puede o no tener una imagen
* Los usuarios y post tienen cada uno una URL personalizada
* Cada usuario podrá ver los perfiles de los demás con sus posts
* Cada usuario podrá seguir a otro usuario y ver los posts a los usuarios que sigue
* Cada usuario en su perfil podrá ver la cantidad de seguidores que posee
* La página web es responsiva
* La página web posee tema claro como un tema oscuro

## Iniciar mi proyecto

Para poder iniciar el proyecto lo primero es iniciar la base de datos que en este caso es MongoDB

Iniciar mongo

```bash
mongod --dbpath="./data"
```

Luego se debe ejecutar el servidor de node para poder levantarlo

```bash
npm run dev
```

## Librerias y herramientas utilizadas

### Frontend

* Para los estilos [Tailwindcss](https://tailwindcss.com/) 

* Para los modales y alertas [SweetAlert2](https://sweetalert2.github.io/)

* Para los iconos [Font Awasome Icons](https://fontawesome.com/icons)

### Backend

* Dependencias utilizadas 

```
"dependencies": {
    "@faker-js/faker": "^7.6.0",
    "bcryptjs": "^2.4.3",
    "connect-mongo": "^4.6.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-handlebars": "^6.0.6",
    "express-session": "^1.17.3",
    "hash-sum": "^2.0.0",
    "method-override": "^3.0.0",
    "mongoose": "^6.6.5",
    "multer": "^1.4.5-lts.1",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "slugify": "^1.6.5",
    "sweetalert2": "^11.6.4"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "tailwindcss": "^3.2.1"
  }
```
