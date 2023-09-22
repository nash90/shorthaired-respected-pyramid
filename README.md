# Santa Message Web App

![Web App Screenshot](/public/Home.png)

## Note

- APP is deployed using versel, please check app at this link on new tab [app link](https://shorthaired-respected-pyramid-qdysa7nt7-nash90.vercel.app)
  - https://shorthaired-respected-pyramid-qdysa7nt7-nash90.vercel.app
- app doesnt install on Glitch because glitch has 200 MB disk space limitation and next js framework dependency installation takes more space than this limit
- test data date format at "birthdate": "2010/23/01", It is assumed that this is in format "YYYY/DD/MM"
- Consumer Producer is impleted using a Queue tasks store stored inmemory as JS array
- The consumer batch is started when new task is added to an empty queue, Batch feature is impleted with setInterval
- for resource saving, when queue is empty the consumer batch is dropped (clearInterval) till new task is added


## Library Dependencies and Reasons

This project relies on the following library dependencies and the reasons for including them:

- **Next.js (v13.5.2)**: Next.js is a versatile framework that provides modern server-side rendering (SSR) and client-side rendering (CSR) capabilities. It also offers several bundle optimization techniques and supports static site generation, making it ideal for building modern web applications.

- **React (v18.2.0)**: React is the core library for building user interfaces. We use the latest version to take advantage of advanced UI capabilities and state management.

- **TypeScript (v5.2.2)**: TypeScript is included to provide strong typing and improve code maintainability throughout the application.

- **Nodemailer (v6.9.5)**: Nodemailer is used for sending emails within the application.

- **Bootstrap (v5.3.0)**: This UI library is included to provide a responsive design out of the box.


## How to Run the App

To run the app after cloning the repo, follow these steps:

Provide ENV variable setting in .env.local, for security inject this value from a secure CI/CD pipeline rather than hardcodeing:
   ```bash
    USER_SERVICE_API=https://raw.githubusercontent.com
    EMAIL_HOST_ID=smtp.ethereal.email
    EMAIL_PORT=587
    EMAIL_AUTH_ID=YOUR_AUTH_ID
    EMAIL_AUTH_PASSWORD=YOUR_AUTH_PASSWORD
  ```
Install the required dependencies with npm:
   ```bash
    npm install
  ```
App Run command for dev mode:
   ```bash
    npm run dev
  ```

## Code Structure Guide

The project's code is organized as follows:

- **src/app**: This directory contains the Next.js app, including server and client routes, layout components, and middleware configurations.
  - **src/app/page.tsx**: Home page of next application by default
  - **src/app/layout.tsx**: Common root layout of next page, has many functions that can be confirmed from next.js doc
  - **src/app/api/santa_message/route.ts**: one of the rest api route defination

- **src/backend**: All backend code is placed in this directory.

  - **src/backend/route-handler**: Exported route handler module functions for API routes handling using NextRequest and NextResponse.

  - **src/backend/services**: Files containing core backend logic for features such as Email Task Queue Consumer-Producer, Email Send client, User Info fetch API clients, and validation logic.
    - **src/backend/services/SantaEmailQueue**: Queue Consumer producer implementation using JS array, setInterval, clearInterval
    - **src/backend/services/SantaMessageService**: Provides helper for request validations like registration check and age check
    - **src/backend/services/SantaEmailService**: Provides helper for sending email
    - **src/backend/services/UserService**: Provides helper for fetching user lists and profiles from external api

- **src/frontend**: This directory contains client-side code, including React components and client-side API request makers.

- **src/types**: Files that define general types used throughout the application, including business logic models, API requests, and responses.

