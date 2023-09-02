# Empresa de Delivery (Tipo Rappi)

Este es un proyecto de backend para una empresa de delivery similar a Rappi. El objetivo es desarrollar un sistema que permita gestionar pedidos, productos, usuarios y otras funcionalidades esenciales para una plataforma de entrega de productos a domicilio. El proyecto se llevará a cabo utilizando MongoDB y Node.js como tecnologías principales.

1. ## Requerimientos

   El proyecto está desarrollado utilizando Node.js y MongoDB, por lo que necesitarás lo siguiente para ejecutarlo:


   - Node.js ([https://nodejs.org](https://nodejs.org/)) - Verifica que la versión instalada sea compatible con las dependencias del proyecto. Se recomienda la versión 18.16.0 de Node.js.
   - MongoDB Atlas (https://www.mongodb.com/cloud/atlas) - Se requiere una base de datos MongoDB en línea para almacenar la información del proyecto.

   ## Configuración del archivo .env

   Crea un archivo `.env` en la raíz del proyecto, configura las variables de entorno necesarias y la conexión a la base de datos. Un ejemplo de cómo configurar el archivo `.env` se proporciona en el archivo `.env.example`:

   ```json
   MY_SERVER={"hostname":"127.10.10.15", "port":"3001"}

   ATLAS_USER="tu_usuario_de_MongoDB_Atlas"
   ATLAS_PASSWORD="tu_contraseña_de_MongoDB_Atlas"
   ATLAS_DB="db_rappi"

   # Clave privada para JWT
   JWT_PASSWORD="tu_contraseña_de_creación_del_token"
   ```
   Sí puede pedir las credenciales al autor sería lo ideal, en caso contrario modificar lo siguiente en la uri en el documento atlas.js dentro de las carpetas config/connection.

   ```tex
    const uri= `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}
    @cluster0.jzmvywo.mongodb.net/${process.env.ATLAS_DB}`

    const uri= `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}
    @cluster0.<cambiar>.mongodb.net/${process.env.ATLAS_DB}`
   ```
   ## Instalación de Dependencias

   Ejecuta el siguiente comando en la terminal para instalar las dependencias necesarias:

   ```
   npm install
   ```
   ## Montar el Servidor

   Una vez configuradas las variables de entorno, puedes iniciar el servidor con el siguiente comando:

   ```
   npm run dev
   ```
   ## Generación del token

   Para interactuar con los endpoints, primero debes crear un token a partir del usuario y su rol.

   #### Rol: admin

   - Acceso: A todo.

   #### Rol: empresa

   - Acceso:

     - Endpoint: "/catalogo"
       - Versión: "1.0.0"
       - Métodos: "GET"
     - Endpoint: "/pedido"
       - Versión: "1.0.0"
       - Métodos: "GET", "POST"
     - Endpoint: "/producto"
       - Versión: "1.0.0"
       - Métodos: "GET", "POST", "PUT", "DELETE"
     - Endpoint: "/empresa"
       - Versión: "1.0.0"
       - Métodos: "GET", "PUT"
     - Endpoint: "/factura"
     - Versión: "1.0.0"
     - Métodos: "GET", "POST"

   #### Rol: rappiTendero

   - Acceso:
     - Endpoint: "/catalogo"
       - Versión: "1.0.0"
       - Métodos: "GET"
     - Endpoint: "/pedido"
       - Versión: "1.0.0"
       - Métodos: "GET", "POST"
     - Endpoint: "/rappiTendero"
       - Versión: "1.0.0"
       - Métodos: "GET"

   #### Rol: usuario

   - Acceso:
     - Endpoint: "/catalogo"
       - Versión: "1.0.0"
       - Métodos: "GET"
     - Endpoint: "/pedido"
       - Versión: "1.0.0"
       - Métodos: "GET", "POST"
     - Endpoint: "/usuario"
       - Versión: "1.0.0"
       - Métodos: "GET", "PUT"

   ```http
   GET http://127.10.10.15:3001/token?rol=<rol>
   ```
   El rol administrador no genera token, se hace desde usuario

   Ejemplos de datos a enviar:

   ```http
   GET http://127.10.10.15:3001/token?rol=usuario
   ```
   Por el body:

   ```json
   {
       "nombre": "adminHack"
    }
   ```
   Usaremos el usuario admin para poder ingresar a todas las peticiones.

   Se generará el siguiente código que se debe agregar al HTTP Header de tipo Authorization:

   ```json
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVlYzMyOTYxNDg1ZGY4MzZiYTJiNTgiLCJpZCI6IjEiLCJyb2wiOjEsImlhdCI6MTY5MzQxNDkzMiwiZXhwIjoxNjkzNDI1NzMyfQ.EMYHldjqe_WhozMBw72zgHwszAnEVdWIR9ld-P1hiH0
   ```
   ## Petición

   Para de interactuar con los endpoints puedes hacerlo mediante la siguiente petición GET:

   ```http
   GET http://127.10.10.15:3001/<nombre_endpoint>
   ```
   ## Endpoints Disponibles

   ### Listar catalogo v1.0.0

   Endpoint: `GET /catalogo  `

   Este endpoint te permite listar los productos asignados a una empresa en especifico registradas en el sistema desde cualquier rol. Ejemplos de Datos:

   ```json
   [
     {
       "nombre": "Burguer SS",
       "direccion": "carrera 4",
       "productos": [
         {
           "nombre": "Burguer de casa",
           "precio": 27000
         },
         {
           "nombre": "Burguer clásica",
           "precio": 23000
         },
         {
           "nombre": "Refresco",
           "precio": 3000
         },
         {
           "nombre": "Brownie",
           "precio": 7000
         },
         {
           "nombre": "Burguer vegetariana",
           "precio": 25000
         }
       ]
     },
     {
       "nombre": "Pizza zz",
       "direccion": "avenida 20 calle1",
       "productos": [
         {
           "nombre": "Pizza Hawaiana",
           "precio": 9500
         },
         {
           "nombre": "Pizza de Carne",
           "precio": 8800
         },
         {
           "nombre": "Agua mineral",
           "precio": 1500
         },
         {
           "nombre": "Tiramisú",
           "precio": 7500
         },
         {
           "nombre": "Pizza Vegana",
           "precio": 9800
         }
       ]
     },
       ...]
   ```
   ### Listar usuarios v1.0.0

   Endpoint: `GET /usuario `

   Este endpoint te permite listar todos los usuarios registradas en el sistema desde el rol admin. Ejemplos de Datos:

   ```json
   [
     {
       "_id": "64eec32961485df836ba2b58",
       "id": 1,
       "nombre": "adminHack",
       "apellido": "Hack",
       "email": "hack69@hotmail.com",
       "departamento": "Amazonas2",
       "ciudad": "Peyecuesta",
       "direccion": "incognito",
       "telefono": 1000001,
       "rol": 1
     },
     {
       "_id": "64eec32961485df836ba2b59",
       "id": 2,
       "nombre": "Juan",
       "apellido": "Perez",
       "email": "juan0@hotmail.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "avenida 15",
       "telefono": 31523456,
       "rol": 4
     },
       ...]
   ```
   Desde el rol usuario, solo la información referente a ese usuario (Se debe generar el token desde el rol usuario primero, y usar un usuario que se encuentre en la base de datos ejemplo *Juan*). Ejemplos de Datos:

   ```json
   [
     {
       "_id": "64eec32961485df836ba2b59",
       "id": 2,
       "nombre": "Juan",
       "apellido": "Perez",
       "email": "juan0@hotmail.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "avenida 15",
       "telefono": 31523456,
       "rol": 4
     }
   ]
   ```
   ### Listar empresa v1.0.0

   Endpoint: `GET /empresa  `

   Este endpoint te permite listar todas los empresa registradas en el sistema desde el rol admin. Ejemplos de Datos:

   ```json
   [
     {
       "_id": "64eec32b61485df836ba2b60",
       "id": 1,
       "nombre": "Burguer SS",
       "ciudad": "Bucaramanga",
       "direccion": "carrera 4",
       "telefono": 312009345,
       "rol": 2
     },
     {
       "_id": "64eec32b61485df836ba2b61",
       "id": 2,
       "nombre": "Pizza zz",
       "ciudad": "Bucaramanga",
       "direccion": "avenida 20 calle1",
       "telefono": 312349345,
       "rol": 2
     },
       ...]
   ```
   Desde el rol empresa , solo la información referente a esa empresa (Se debe generar el token desde el rol empresa primero, y usar un usuario que se encuentre en la base de datos ejemplo *Burguer SS*). Ejemplos de Datos:

   ```json
   [
     {
       "_id": "64eec32b61485df836ba2b60",
       "id": 1,
       "nombre": "Burguer SS",
       "ciudad": "Bucaramanga",
       "direccion": "carrera 4",
       "telefono": 312009345,
       "rol": 2
     }
   ]
   ```
   ### Listar rappiTendero v1.0.0

   Endpoint: `GET /rappiTendero  `

   Este endpoint te permite listar todos los rappitenderos registradas en el sistema desde el rol admin. Ejemplos de Datos:

   ```json
   [
     {
       "_id": "64eec32a61485df836ba2b5b",
       "id": 1,
       "nombre": "Marco",
       "apellido": "Rodriguez",
       "email": "Marco@hotmail.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "avenida 12",
       "telefono": 30012345,
       "rol": 3
     },
     {
       "_id": "64eec32a61485df836ba2b5c",
       "id": 2,
       "nombre": "Jhon",
       "apellido": "Ferrer",
       "email": "Jhon@hotmail.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "avenida 10",
       "telefono": 31023456,
       "rol": 3
     },
       ...]
   ```

   ### Crear rappiTendero v1.0.0

   Endpoint: `POST /rappiTendero `

   Crea un nuevo rappiTendero en el sistema. Los datos de entrada deben incluir:

   - `nombre`
   - `apellido`
   - `email`
   - `departamento`
   - `ciudad`
   - `direccion`
   - `telefono`

     ```json
     {
       "nombre": "Laura",
       "apellido": "Ramirez",
       "email": "LauR@campusland.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "Puenta la 9na",
       "telefono": 3001523
      }
     ```
     Respuesta:

     ```json
     {
       "message": "rappiTendero added successfully",
       "insertedId": "64ef7a044b8a409050766adb"
     }
     ```
    ### Editar rappiTendero v1.0.0

   Endpoint: `PUT/rappiTendero`

   Edita un rappiTendero en el sistema. Los datos de entrada deben incluir:

   - `id` a través de la URL.
   - `nombre`
   - `apellido`
   - `email`
   - `departamento`
   - `ciudad`
   - `direccion`
   - `telefono`

     ```http
     PUT http://127.10.10.15:3001/rappiTendero
     ```
     ```json
     {
       "id":1,
       "nombre": "Laura",
       "apellido": "Gonzalez",
       "email": "LauR@campusland.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "Debajo del puente la 9na",
       "telefono": 3001523
      }
     ```
     Respuesta:

     ```json
     {
       "message": "rappiTendero updated successfully"
     }
     ```


   ### Crear usuarios v1.0.0

   Endpoint: `POST /usuario `

   Crea una nuevo usuarios en el sistema. Los datos de entrada deben incluir:

   - `nombre`
   - `apellido`
   - `email`
   - `departamento`
   - `ciudad`
   - `direccion`
   - `telefono`

     ```json
     {
       "nombre": "Laura",
       "apellido": "Ramirez",
       "email": "LauR@campusland.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "Puenta la 9na",
       "telefono": 3001523
      }
     ```
     Respuesta:

     ```json
     {
       "message": "Usuario added successfully",
       "insertedId": "64ef7a044b8a409050766adb"
     }
     ```

   ### Editar usuarios v1.0.0

   Endpoint: `PUT/usuario/id`

   Edita un usuario en el sistema. Los datos de entrada deben incluir:

   - `id` a través de la URL.
   - `nombre`
   - `apellido`
   - `email`
   - `departamento`
   - `ciudad`
   - `direccion`
   - `telefono`

     ```http
     PUT http://127.10.10.15:3001/usuario/4
     ```
     ```json
     {
       "nombre": "Laura",
       "apellido": "Ramirez",
       "email": "LauR@campusland.com",
       "departamento": "Santander",
       "ciudad": "Bucaramanga",
       "direccion": "Debajo del puente la 9na",
       "telefono": 3001523
      }
     ```
     Respuesta:

     ```json
     {
       "message": "Usuario updated successfully"
     }
     ```

   ### Editar empresa v1.0.0

   Endpoint: `PUT/empresa/id`

   Edita una empresa en el sistema. Los datos de entrada deben incluir:

   - `id` a través de la URL.
   - `nombre`
   - `ciudad`
   - `direccion`
   - `telefono`

     ```http
     PUT http://127.10.10.15:3001/empresa/1
     ```
     ```json
     {
         "nombre": "Burguer ZZ",
         "ciudad": "Floridablanca",
         "direccion": "carrera 3",
         "telefono": 312009345
     }
     ```
     Respuesta:

     ```json
     {
       "message": "Empresa updated successfully"
     }
     ```

     ### Editar producto v1.0.0

   Endpoint: `PUT/producto`

   Edita una producto en el sistema. Los datos de entrada deben incluir:

   - `id_Empresa` a través de la URL.
   - `tipoProducto`
   - `nombre`
   - `descripcion`
   - `precio`

     ```http
     PUT http://127.10.10.15:3001/producto
     ```
     ```json
      {
        "id":1,
        "id_Empresa": 1,
        "tipoProducto": "Hamburguesa",
        "nombre": "Burguer de delki",
        "descripcion": "hamburguesa doble carne y salsa de casa",
        "precio": 26000
      }
     ```
     Respuesta:

     ```json
     {
       "message": "producto updated successfully"
     }
     ```


   ### Crear pedido v1.0.0

   Endpoint: `POST /pedido  `

   Crea una nuevo pedido en el sistema. Los datos de entrada deben incluir:

   - `id_Empresa`
   - `productos` array que contiene el `id_Producto` y su `cantidad`.

     ```json
     {
      "id_Empresa": 1,
      "fecha": {
        "$date": "2023-08-28T12:00:00Z"
      },
      "productos": [
        {
          "id_Producto": 1,
          "cantidad": 2
        },
        {
          "id_Producto": 2,
          "cantidad": 1
        },
        {
          "id_Producto": 4,
          "cantidad": 3
        },
        {
          "id_Producto": 5,
          "cantidad": 2
        }
      ]
      }
     ```
     Respuesta:

     ```json
     {
       "message": "Pedido added successfully",
       "insertedId": "64ef83e64b8a409050766adc"
     }
     ```

     ### Crear factura v1.0.0

   Endpoint: `POST /factura  `

   Crea una nueva factura en el sistema. Los datos de entrada deben incluir:

   - `id_cliente`
   - `id_empresa`
   - `id_rappiTendero`
   - `id_producto` array que contiene el `id_Producto` y su `cantidad`.

     ```json
     {
        "id_cliente": 1,
        "id_empresa": 2,
        "id_rappiTendero":2,
        "id_producto":[
            { "id_Producto": 1, "cantidad": 2 },
            { "id_Producto": 2, "cantidad": 1 },
            { "id_Producto": 4, "cantidad": 3 },
            { "id_Producto": 5, "cantidad": 2 }
        ]
     }
     ```
     Respuesta:

     ```json
     {
       "message": "factura added successfully",
       "insertedId": "64ef83e64b8a409050766adc"
     }
     ```

   ### Crear Producto v1.0.0

   Endpoint: `POST /producto  `

   Crea una nueva producto en el sistema. Los datos de entrada deben incluir:

   - `id_Empresa`
   - `tipoProducto`
   - `nombre`
   - `descripcion`
   - `precio` 

     ```json
     {
    "id_Empresa": 1,
    "tipoProducto": "Hamburguesa",
    "nombre": "Burguer de casa",
    "descripcion": "hamburguesa doble carne y salsa de casa",
    "precio": 27000
    }
   
     ```
     Respuesta:

     ```json
     {
       "message": "producto added successfully",
       "insertedId": "64ef83e64b8a409050766adc"
     }
     ```

   ### Listar pedido v1.0.0

   Endpoint: `GET /pedido   `

   Ejemplos de Datos:

   ```json
   [
    {
       "_id": "64eec32e61485df836ba2b7f",
       "id": 2,
       "id_cliente": 3,
       "id_rappiTendero": 5,
       "id_Empresa": 2,
       "fecha": "2023-08-29T14:30:00.000Z",
       "productos": [
         {
           "id_Producto": 7,
           "cantidad": 3,
           "nombreProducto": "Pizza de Carne",
           "valor": 26400
         },
         {
           "id_Producto": 8,
           "cantidad": 2,
           "nombreProducto": "Agua mineral",
           "valor": 3000
         },
         {
           "id_Producto": 10,
           "cantidad": 1,
           "nombreProducto": "Pizza Vegana",
           "valor": 9800
         }
       ],
       "valorTotal": 39200
     },
     {
       "_id": "64eec9105ce5582b2b66c942",
       "id": 16,
       "id_cliente": 2,
       "id_rappiTendero": 2,
       "id_Empresa": 1,
       "fecha": "2023-08-30T04:44:00.476Z",
       "productos": [
         {
           "id_Producto": 1,
           "cantidad": 2,
           "nombreProducto": "Burguer de casa",
           "valor": 54000
         },
         {
           "id_Producto": 2,
           "cantidad": 1,
           "nombreProducto": "Burguer clásica",
           "valor": 23000
         },
         {
           "id_Producto": 4,
           "cantidad": 3,
           "nombreProducto": "Brownie",
           "valor": 21000
         },
         {
           "id_Producto": 5,
           "cantidad": 2,
           "nombreProducto": "Burguer vegetariana",
           "valor": 50000
         }
       ],
       "valorTotal": 148000
     },
       ...]
   ```

   ### Listar productos v1.0.0

   Endpoint: `GET /productos   `

   Ejemplos de Datos:

   ```json
   [{
    "_id": "64f21c61313f6874e1fd4b69",
    "id": 1,
    "id_Empresa": 1,
    "tipoProducto": "Hamburguesa",
    "nombre": "Burguer de casa",
    "descripcion": "hamburguesa doble carne y salsa de casa",
    "precio": 27000
  },
  {
    "_id": "64f21c61313f6874e1fd4b6a",
    "id": 2,
    "id_Empresa": 1,
    "tipoProducto": "Hamburguesa",
    "nombre": "Burguer clásica",
    "descripcion": "hamburguesa con queso y lechuga",
    "precio": 23000
  },
  {
    "_id": "64f21c61313f6874e1fd4b6b",
    "id": 3,
    "id_Empresa": 1,
    "tipoProducto": "Bebida",
    "nombre": "Refresco",
    "descripcion": "bebida gaseosa de cola",
    "precio": 3000
  },
  {
    "_id": "64f21c61313f6874e1fd4b6c",
    "id": 4,
    "id_Empresa": 1,
    "tipoProducto": "Postre",
    "nombre": "Brownie",
    "descripcion": "brownie de chocolate con helado",
    "precio": 7000
  },
       ...]
   ```

      ### Listar factura v1.0.0

   Endpoint: `GET /factura   `

   Ejemplos de Datos:

   ```json
   [
  {
    "_id": "64f21c61313f6874e1fd4b69",
    "id": 1,
    "id_Empresa": 1,
    "tipoProducto": "Hamburguesa",
    "nombre": "Burguer de casa",
    "descripcion": "hamburguesa doble carne y salsa de casa",
    "precio": 27000
  },
  {
    "_id": "64f21c61313f6874e1fd4b6a",
    "id": 2,
    "id_Empresa": 1,
    "tipoProducto": "Hamburguesa",
    "nombre": "Burguer clásica",
    "descripcion": "hamburguesa con queso y lechuga",
    "precio": 23000
  },
  {
    "_id": "64f21c61313f6874e1fd4b6b",
    "id": 3,
    "id_Empresa": 1,
    "tipoProducto": "Bebida",
    "nombre": "Refresco",
    "descripcion": "bebida gaseosa de cola",
    "precio": 3000
  },
  {
    "_id": "64f21c61313f6874e1fd4b6c",
    "id": 4,
    "id_Empresa": 1,
    "tipoProducto": "Postre",
    "nombre": "Brownie",
    "descripcion": "brownie de chocolate con helado",
    "precio": 7000
  },...]
   ```
   ### Eliminar usuario v2.0.1

   Endpoint: `DELETE/usuario/id`

   Elimina un usuario del sistema. Los datos de entrada deben incluir:

   - `id` a través de la URL.

     ```http
     DELETE http://127.10.10.15:3001/usuario/4
     ```
     Respuesta:

     ```json
     {
       "message": "Usuario deleted successfully"
     }
     ```

  ### Eliminar producto v2.0.1

   Endpoint: `DELETE/producto`

   Elimina un usuario del sistema. Los datos de entrada deben incluir:

   - `id` en el body.
    ```{   "id":1
    }
    ```

     ```http
     DELETE http://127.10.10.15:3001/producto
     ```
     Respuesta:

     ```json
     {
       "message": "producto deleted successfully"
     }
     ```

     ### Eliminar rappiTendero v2.0.1

   Endpoint: `DELETE/rappiTendero`

   Elimina un rappiTendero del sistema. Los datos de entrada deben incluir:

   - `id` en el body.
    ```{   "id":1
    }
    ```

     ```http
     DELETE http://127.10.10.15:3001/rappiTendero
     ```
     Respuesta:

     ```json
     {
       "message": "rappiTendero deleted successfully"
     }
     ```


   ## Dependencias Utilizadas

   Este proyecto utiliza diversas dependencias para su funcionamiento. A continuación, se detallan las dependencias principales y sus respectivas versiones:

   - **express**: 4.18.2 Express es un marco de aplicación web rápido, minimalista y flexible para Node.js. Es utilizado en este proyecto para manejar las rutas y la lógica de la aplicación.
   - **dotenv**: 16.3.1 Dotenv es una librería que permite cargar variables de entorno desde un archivo `.env`. En este proyecto, se utiliza para gestionar las configuraciones sensibles.
   - **express-rate-limit**: 6.8.1 Express Rate Limit es un middleware que proporciona limitación de velocidad y control de la frecuencia de las solicitudes HTTP. Se utiliza aquí para prevenir ataques de fuerza bruta y abusos.
   - **mongodb**: 5.7.0 MongoDB es una base de datos NoSQL ampliamente utilizada. En este proyecto, se usa para almacenar y recuperar datos relacionados con el alquiler de autos.
   - **nodemon**: 3.0.1 Nodemon es una herramienta que ayuda en el desarrollo al reiniciar automáticamente la aplicación cuando se detectan cambios en el código fuente. Esto agiliza el proceso de desarrollo y prueba.
   - **jose** (4.14.4): Esta dependencia parece relacionarse con JSON Web Tokens (JWT) y puede estar relacionada con la autenticación y la seguridad en tu aplicación.
   - **express-session** (1.17.3): Express Session es una librería que permite gestionar sesiones de usuario en aplicaciones Express.js. Puede ser utilizada para mantener el estado de la sesión del usuario en el servidor.
   - **express-routes-versioning**: ^1.0.1: Express Routes  Versioning es una librería para Node.js que permite manejar y gestionar  versiones en las rutas de una aplicación Express de manera sencilla. Con esta dependencia, puedes definir y mantener diferentes versiones de tus rutas en función de los cambios y actualizaciones que realices en tu  API. Esto es útil para garantizar la compatibilidad hacia atrás y  permitir que los clientes sigan utilizando versiones anteriores de tu  API mientras introduces nuevas funcionalidades.
