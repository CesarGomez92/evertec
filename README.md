# Evertec

Esta prueba está hecha en laravel 8 y Vue.js v3. Para correr el proyecto localmente, tendremos los siguientes pre requisitos
-	Tener Composer instalado
-	Tener Node.js instalado
-	Tener MySQL 8 instalado
-	Tener PHP 7.4  instalado 
-	Tener Git instalado 

Luego de verificar estos requisitos realizar los siguientes pasos:

1- Clonar el proyecto 
```
git clone https://github.com/CesarGomez92/evertec.git
```

2- Abrir una consola de comando y crear la base de datos principal y de los test manualmente de la siguiente manera:
```
mysql -uroot -p
password: mypassword
create database evertec;
create database evertec_test;
exit;
```

3- Ingresar a la carpeta evertec-api por medio de la linea de comandos:
```
cd path/to/evertect-folder/evertec-api
```

4- En el archivo .env definir las siguientes variables
```
// .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=evertec
DB_USERNAME=db username
DB_PASSWORD=db password
```

5- Ejecutar los siguientes comandos para instalar dependencias
```
composer install
npm install
```

6- Ejecutar migraciones y seeders
```
php artisan migrate --seed
php artisan migrate --seed --env=test
```

7- Subir el servidor de desarrollo local
```
php artisan serve --port=5000
```

*Nota:* dejar la consola abierta y ejecutando el comando "php artisan serve --port=5000" mientras queramos que el servicio este funcional

8- Abrir una consola de comando nueva y navegar por medio de la misma a la carpeta evertec-web
```
cd path/to/evertect-folder/evertec-web
```

9- Ejecutar el siguiente comando para instalar dependencias
```
npm install
```

10- ejecutar el comando siguiente comando:
```
npm run serve
```

11- Abrir un navegador (Google Chrome de preferencia) y dirigirse a http://localhost:8080/

12- navegue el proyecto

Si desean correr los unit tests de front end o back end, seguir los siguientes pasos


Frontend:

1- Abrir una consola de comando nueva y navegar por medio de la misma a la carpeta evertec-web
```
cd path/to/evertect-folder/evertec-web
```

2- Ejecutar el comando
```
npm run test:unit
```


Backend:
1- Abrir una consola de comando nueva y navegar por medio de la misma a la carpeta evertec-api
```
cd path/to/evertect-folder/evertec-api
```

2- Ejecutar el comando
```
php artisan test --env=test
```