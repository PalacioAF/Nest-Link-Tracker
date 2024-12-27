## Link Tacke
## Descripción
Link Tacker es un sistema para tracker enmascarar URLs y poder obtener analítica de cuantas
veces se llamó a cada uno de los links, así como también agregar reglas de negocio para el
funcionamiento del redirect.

## Configuración del proyecto

```bash
$ npm install
```

## Compilar y ejecutar el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run dev

```


## Ejemplos

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/urls/{id}/stats`                             | Devuelve la estadistica de cantidad de veces que se redirecciono.                      |
| `GET`    | `/urls/{id}`                          | Redirect a la URL enmascarada.                       |
| `POST`   | `/urls/`                             | Crear link mandando por body url, password (opcional) y expiration(opcional)(aaaa-mm-dd).                       |
| `PUT`    | `/urls/{id}`                          | Invalidar un link                       |


## Ejemplo con Password

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/urls/{id}?password=1234`                             | Devuelve la estadistica de cantidad de veces

## Contacto

- Author - [Palacio Alberto Federico](https://www.linkedin.com/in/afpalacio/)

