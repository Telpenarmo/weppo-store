# weppo-store

## Build and run project

```
$ docker-compose up
```

Hot reloads are added on all express and sass files.

### Connecting to database

In development mode, our database is configured to trust anyone who tries to establish a connection. All you need to do is add a new PostgreSQL connection with following settings:

```
host: localhost
port: 35432
database: db
username: postgres
```

### Adding new npm package

```
$ docker-compose down
$ npm install --save <package-name>
$ docker-compose build
$ docker-compose up
```