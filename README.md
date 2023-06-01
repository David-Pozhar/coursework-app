# food-ordering-app

## Project setup
### Storefront
```
./npm install
```
### API backend
```
./server-api/npm install
```

## Run storefront
### Compiles and hot-reloads for development
```
./npm run serve
```
### Compiles and minifies for production
```
./npm run build
```
### Lints and fixes files
```
./npm run lint
```

## Run API backend
### Compiles and hot-reloads for development
```
./server-api/npm run start:dev
```
### Compiles and minifies for production
```
./server-api/npm run start
```

## Storefront configuration
```
./src/config.ts
```
## API backend configuration
```
./server-api/config.js - main config file
./server-api/config.example.js - example config file
```

## Create Admin user to use manage dashboard
```
Edit the file with your user admin data
./server-api/createAdmin.js
...
const USER_DATA = {
    email: 'admin@food.ordering.app',
    fullName: 'Admin',
    password: 'adminAdmin123!',
    isAdmin: true
}
...

Run

./server-api/node createAdmin.js
```

### Customize configuration (storefront)
See [Configuration Reference](https://cli.vuejs.org/config/).
