export const environment = {
  production: true,
  apiUrl: 'https://nretroapp.fly.dev/',
};


/**
 prod  db

 Postgres cluster nretroapp-db created
  Username:    postgres
  Password:    oYyL1d2P7Xp1bw9
  Hostname:    nretroapp-db.internal
  Flycast:     fdaa:2:9509:0:1::2
  Proxy port:  5432
  Postgres port:  5433
  Connection string: postgres://postgres:oYyL1d2P7Xp1bw9@nretroapp-db.flycast:5432

  docker build -t nerjok/retroapp .
  docker push nerjok/retroapp:latest
  docker run --rm -it -p 8080:80 nerjok/retroapp:latest
 */