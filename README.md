# Proyecto TuneBytes

<div align="center">

[![css3-badge-sm]][css3-web] [![express-badge-sm]][express-web] [![figma-badge-sm]][figma-web] [![git-badge-sm]][git-web] [![github-badge-sm]][github-web] [![html5-badge-sm]][html5-web] [![ionic-badge-sm]][ionic-web] [![js-badge-sm]][js-web] [![mongodb-badge-sm]][mongodb-web] [![mysql-badge-sm]][mysql-web] [![nodejs-badge-sm]][nodejs-web] [![npm-badge-sm]][npm-web] [![react-badge-sm]][react-web][![ts-badge-sm]][ts-web] [![vscode-badge-sm]][vscode-web]

[![android-development-badge-sm]][android-development-web]

### Integrantes:
  
  Ademir Muñoz<br>
  Rodrigo Araos<br>
  Vicente Mercado<br>
  Jorge Palacios<br>

## Descripción

**TuneBytes** es una aplicación móvil que permite a los usuarios buscar y reproducir música de videojuegos. Con una UI inspirada en aplicaciones como Spotify o Youtube Music, siendo intuitiva y simple de manejar en dispositivos móviles, cada usuario puede crear y editar listas de reproducción, indicar cuáles son sus videojuegos favoritos y recibir recomendaciones de diferente tipo: género de videojuego o género músical.

## Funcionalidades

<div align=left>
  
1. Creación de cuenta personal e inicio de sesión
2. Escuchar música de videojuegos
3. Buscar, con ayuda de una API, los videojuegos por su nombre
4. Creación y edición de listas de reproducción personalizadas y personales
5. Edición de perfil del usuario, donde puede cambiar su foto de perfil o su contraseña
</div>

## Prototipo
<div align="center">
  
[![figma-prot-badge]][figma-prot-url] [![figma-dis-badge]][figma-dis-url]

</div>

## Maquetación web

<div align="left">
  
### Iniciar la aplicación

Debe tener instalado nodejs
```bash
https://nodejs.org/en/download/package-manager
```
Usando npm debe instalar ionic
```bash
npm i -g @ionic/cli
```

Para iniciar la aplicacion se debe colocar los siguientes comandos en el cmd:
```bash
git clone https://github.com/Sylver640/ProyectoWeb_ICI4247.git
cd ProyectoWeb_ICI4247/maquetacion/Front-end
npm install
ionic serve
```
En el caso del backend, éste utiliza el framework de Flask con Python, junto con un servidor de MySQL y XAMPP.
Para iniciarlo debe instalar XAMPP y Python respectivamente, y debe instalar las siguientes librerías:
```bash
pip install flask mysql-connector-python
pip install flask-bcrypt
pip install flask flask-jwt-extended
```
El servidor se encontrará en el localhost con dirección 127.0.0.1 en el puerto 5000, con la base de datos ejecutándose en el puerto 3306.
El archivo SQL con la creación de tablas se encuentra adjunta en el apartado de "Backend" de este repositorio.

</div>

[js-badge-sm]: https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000&style=flat
[js-web]: https://developer.mozilla.org/es/docs/Web/JavaScript
[ts-badge-sm]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat
[ts-web]: https://www.typescriptlang.org/
[html5-badge-sm]: https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=flat
[html5-web]: https://developer.mozilla.org/es/docs/Web/HTML
[css3-badge-sm]: https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=flat
[css3-web]: https://developer.mozilla.org/es/docs/Web/CSS
[react-badge-sm]: https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=fff&style=flat
[react-web]: https://reactjs.org/
[nodejs-badge-sm]: https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=fff&style=flat
[nodejs-web]: https://nodejs.org/
[express-badge-sm]: https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat
[express-web]: https://expressjs.com/
[mongodb-badge-sm]: https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=flat
[mongodb-web]: https://www.mongodb.com/
[mysql-badge-sm]: https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff&style=flat
[mysql-web]: https://www.mysql.com/
[git-badge-sm]: https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff&style=flat
[git-web]: https://git-scm.com/
[github-badge-sm]: https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=fff&style=flat
[github-web]: https://github.com
[npm-badge-sm]: https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff&style=flat
[npm-web]: https://www.npmjs.com/
[prettier-badge-sm]: https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=flat
[prettier-web]: https://prettier.io/
[vscode-badge-sm]: https://img.shields.io/badge/Visual_Studio_Code-007ACC?logo=visual-studio-code&logoColor=fff&style=flat
[vscode-web]: https://code.visualstudio.com/
[ionic-badge-sm]: https://img.shields.io/badge/Ionic-3880FF?logo=ionic&logoColor=fff&style=flat
[ionic-web]: https://ionicframework.com/
[figma-badge-sm]: https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=fff&style=flat
[figma-web]: https://www.figma.com/
[android-development-badge-sm]: https://img.shields.io/badge/Android_Development-3DDC84?logo=android&logoColor=fff&style=flat
[android-development-web]: https://developer.android.com/
[figma-prot-badge]: https://img.shields.io/badge/Ver%20prototipo%20en%20Figma-F24E1E?logo=figma&logoColor=fff&style=flat
[figma-prot-url]: https://www.figma.com/file/Kcfe2qfNulpaNh0qzUn3sX/AppM%C3%BAsicaVG?type=design&node-id=0%3A1&mode=design&t=bAKoBhMZQBgrkb6o-1
[figma-dis-badge]: https://img.shields.io/badge/Ver%20diseño%20UI%20en%20Figma-F24E1E?logo=figma&logoColor=fff&style=flat
[figma-dis-url]: https://www.figma.com/proto/Kcfe2qfNulpaNh0qzUn3sX/AppM%C3%BAsicaVG?type=design&node-id=52-110&t=VmtOVBJYHn7MC4Sh-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=52%3A110&mode=design
