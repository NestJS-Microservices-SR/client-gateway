<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Dev

1. Clonar repositorio `git clone ...`
2. Instalar dependecias `npm i`
3. Crear un archivo `.env` basado en el `env.template`
4. Levantar el servidor en NATS

```
docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats
```

5. Levantar microservicios a consumir
6. Ejecutar `npm run start:dev`

## PROD

Ejecutar

```
docker build -f Dockerfile.prod -t client-gateway .
```
