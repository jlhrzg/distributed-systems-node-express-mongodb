# Distributed systems
Gruppe: Leonard Bechtold, Leon Steinbrenner, Jule Herzog

This project contains a node express mongodb app to store notebooks and notes with a vanilla web frontend. The frontend is directly served as a static folder from the backend. The project was developed with node `v16.13.1`.

## Development
```
docker-compose up mongo
cd backend
yarn dev
```

## Run
```
docker-compose build
docker-compose up
```