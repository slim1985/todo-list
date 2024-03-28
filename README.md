# ToDo-List

## Table of Contents

[TOC]

## About

Todo-List is an education project created for front-end development practice. It is a simple application for work with tasks.

## Get Started

### Local Environment

-   Install [Node.js](https://nodejs.org/en/download/current 'Node.js') (version 19.x.x or higher).
-   Install [pnpm](https://pnpm.io/installation 'pnpm') (version 7.x.x or higher)
-   Install [Firebase CLI](https://firebase.google.com/docs/cli 'Firebase CLI') (need for work with Firebase Emulator).
-   Install [Java JDK](https://jdk.java.net/ 'Java JDK') (need for work with Firebase Emulator).

### Firebase

This application uses Firebase as a back-end service. That is why it is necesarry to create a new Firebase project and a new application inside the project. Also, should be created new Firestore Database for created Firebase application. For additional information see official [documentation](https://firebase.google.com/docs/web/setup#create-project 'documentation').
Note: save your Firestore configuration in any place!

## Local Setup and Running

### Clone and Build Application

-   Clone repository by command:
    `git clone https://github.com/slim1985/todo-list.git`
-   Install dependencies by running command in the root of repository:
    `pnpm install`
-   Set your Firestore configuration data in the `.env.development` file. Please do not checkout your configuration secrets.
-   Build application by running command in the root of repository:
    `pnpm run build:dev`

### Run Application

-   For starting application connected to real Firestore run command (in the root of repo):
    `pnpm run start`
-   For starting application with Firestore Emulator run command (in the root of repo):
    `pnpm run start:dev`
-   For starting Firestore Emulator without application run command (in the root of repo):
    `pnpm run emulator:start`

## Testing

### Storybook

-   For starting Storybook run command (in the root of repo):
    `pnpm run components:start`

## Credits

Thanks [Alexei Gudashev](https://github.com/Gudashev 'Alexei Gudashev') for advice and code reviews.

## License

© Sergei Sulimov, 2024. Licensed under an [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) license.
