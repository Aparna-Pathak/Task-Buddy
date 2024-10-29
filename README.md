# TaskBuddy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).The unit test cases have been written in the spec files for the specific components.

## Running linting
 
Run `npm run lint` to execute the linting tests as per the eslint-config-airbnb.The linting configurations have been defined in the eslint.config.mjs file.

## Running Application

Run 'ng serve' to serve the application.

## Running pre-commit-hooks

To achieve this,Husky and lint-staged have been used to set up Git hooks. Husky allows you to set up Git hooks in your project, and lint-staged helps run linters only on staged files, improving performance. While adding the code changes, while comitting the code, the pre commit hooks will lint the files and give you the errors in case there are any. Post the successful completion, the code can be pushed to the repository.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
