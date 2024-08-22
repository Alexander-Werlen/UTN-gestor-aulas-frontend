# Como usar

Instalar Node.js desde https://nodejs.org/en (opcional si ya tenes instalada alguna versión reciente)

Instalar Docker Desktop (Para el backend) desde https://docs.docker.com/desktop/install/windows-install/

Clonar repositorio
```
git clone https://github.com/Alexander-Werlen/UTN-gestor-aulas-frontend.git
```

Instalar dependencias dentro del folder clonado
```
npm install
```

Iniciar instancia en desarrollo
```
# Si se tiene docker instalado, para correr el backend ante cualquier cambio:
docker compose --profile prod pull
docker compose --profile front-dev up --remove-orphans 
#
npm run dev
```

Por default la instancia corre en el puerto 8080.
El path para la página de busqueda de bedeles es http://localhost:8080/admin/bedel/search 

Para proponer cambios pueden hacer un fork seguido de una pull request, o manden un msg.  