# Santa Message Web App

![Web App Screenshot](/public/Home.png)

## Library Dependencies and Reasons

This project relies on the following library dependencies and the reasons for including them:

- **Next.js (v13.5.2)**: Next.js is a versatile framework that provides modern server-side rendering (SSR) and client-side rendering (CSR) capabilities. It also offers several bundle optimization techniques and supports static site generation, making it ideal for building modern web applications.

- **React (v18.2.0)**: React is the core library for building user interfaces. We use the latest version to take advantage of advanced UI capabilities and state management.

- **TypeScript (v5.2.2)**: TypeScript is included to provide strong typing and improve code maintainability throughout the application.

- **Nodemailer (v6.9.5)**: Nodemailer is used for sending emails within the application.

- **@mui/material (v5.14.10)**: The Material-UI library is included to provide a responsive design out of the box.

- **@emotion/react (v11.11.1)**: This is a dependency of Material-UI for styling.

- **@emotion/styled (v11.11.0)**: Another dependency of Material-UI for styling.

## How to Run the App

To run the app after cloning the repo, follow these steps:
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

- **src/backend**: All backend code is placed in this directory.

  - **src/backend/route-handler**: Exported route handler module functions for API routes handling using NextRequest and NextResponse.

  - **src/backend/services**: Files containing core backend logic for features such as Email Task Queue Consumer-Producer, Email Send client, User Info fetch API clients, and validation logic.

- **src/frontend**: This directory contains client-side code, including React components and client-side API request makers.

- **src/types**: Files that define general types used throughout the application, including business logic models, API requests, and responses.


