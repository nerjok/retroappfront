# Retrofront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

docker run --rm -it -p 8080:80 nerjok/retroapp:latest
docker build -t nerjok/retroapp .
docker push nerjok/retroapp:latest

dotnet ef database update
dotnet ef migrations add DueDateToTopic -o Data/Migrations 
dotnet ef migrations remove
dotnet ef database update 20230617153836_DatesToComment

fly deploy
 flyctl auth token
 fly launch
 fly launch --image nerjok/retroapp:latest
 fly secrets list
  flyctl --help
  flyctl auth signup
  flyctl auth login