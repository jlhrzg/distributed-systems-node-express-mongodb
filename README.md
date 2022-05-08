# Distributed systems
Gruppe: Leonard Bechtold, Leon Steinbrenner, Jule Herzog

This project contains a node express mongodb app to store notebooks and notes with a vanilla web frontend. The frontend is directly served as a static folder from the backend. The project was developed with node `v16.13.1`.

## Run
Application will spin up at [localhost:3000](localhost:3000) after running the following commands:
```
docker-compose build
docker-compose up
```
## Development
```
docker-compose up mongo
cd backend
yarn dev
```

### Code format with prettier
Before a commit format your code with the following command inside the [backend](backend) folder:
```
yarn prettier --write .
```