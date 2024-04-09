# CS4278_Group1
Reuse Vandy

## About
The project is an e-commerce web application serving as a platform for Vanderbilt students to buy and sell goods to each other. The application will allow sellers to post listings of products that other users can bid for. The application will specialize in products that are most common for Vanderbilt students, such as appliances, furniture, and textbooks. The client for this project is Prof. Singh, and we will meet with him throughout the semester to inform him of our progress.

## Scope of the project
The application has a wide range of features that are designed to enhance the user's experience. It provides a user authentication system that allows users to sign in using their Vanderbilt email. The platform offers a convenient way for buyers and sellers to interact with each other, post listings, and engage in online auctions. Sellers can easily upload pictures and provide detailed descriptions as well as categorize their products. Buyers can search for items, place bids, and use an online chat feature to communicate with the seller.

## Project Framework

For the backend of our project, we will use JavaScript as our programming language. JavaScript is a powerful language for web development. JavaScript allows easy creation of APIs, can access databases easily in the backend of a website, and has many packages and open-source tools available for website development. Also, JavaScript is a widely used language in the website development industry, so using JavaScript will give us great exposure to what languages and tools are used at website development companies and jobs.
The backend of our project will also use Express.js. Express.js is a tool in JavaScript used to create API interfaces with the frontend of our project. Using Express.js will allow us to easily extract information from our backend using Json format. This API interface will allow the frontend of our product to use the data from the backend to load the correct data in the frontend.

For our database, we will use Google Firebase. Google Firebase is a developer-friendly database that can be easily integrated with JavaScript. Firebase has a free version of the product, so we can use the database without extra cost. Since Firebase is designed for use by software engineers, Firebase will be an easy database to integrate with our backend to store user data.

The frontend of our project will use Next.js. Next.js is an open-source frontend development tool based on React. Because it is open source, Next.js can easily be downloaded and used for our project. Next.js allows easy integration between HTML and JavaScript code. This connection improves the overall ease of use in our coding. We can both easily render the website with HTML while updating the website using JavaScript. Next.js provides file-system-based routing, which improves the visualization of how our website is formatted. Overall, Next.js is a great and simple frontend development tool for us to use.

To coordinate the downloads and functionality of our website, we will use Node.js. Node.js is a JavaScript runtime environment that provides easy downloading and installing of packages and tools, such as Express.js and Next.js described above. Node.js also streamlines the process of running server-side applications, providing a simple way to run our website in localhost to look at the website functionality.

To coordinate the production of our product, we will use Git and GitHub. GitHub allows us to save the progress of our project remotely on the web, allowing us to easily access the project on different devices if needed. Git allows us to easily share progress between one member of the team and another, just running a few lines in the terminal to load all of everyone’s completed code. If we did not use Git, we would have to share code via email or another form of communication, which could easily result in mix-ups in what code is for what purpose, where the code should be located, and what the newest version of the code is.


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation Instructions

1) Make sure node.js is installed on your computer. If it is not, go to https://nodejs.org/en to install.
2) Run the command `npm install` in the terminal in the root directory of the project.
3) You should be ready to run our scripts. Run the script `npm start` to view the application in the development server.

## Deployment Instructions

Note that our project is currently deployed on Marcus Kamen's vercel account at https://reuse-vandy-group-1.vercel.app/.

1) Run the command `npm i -g vercel`.
2) Create an account at https://www.vercel.com.
3) Run the command `vercel login` and log into your account.
4) Run the command `vercel` in the root directory of the project. Follow instructions from the command. Once finished, the project will be deployed on https://[project name].vercel.app.
5) Redeploy by rerunning the command `vercel`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. Runs both frontend tests with cypress and backend tests with jest, then opens the combined coverage report if all tests pass.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `npm run backend`

Runs the backend tests individually.

### `npm run frontend`

Runs the frontend tests individually.

### `npm run cypressUI`

Opens the cypress application for writing frontend tests.

### `npm run open-jest-coverage`

Opens the coverage report for the backend tests. This script should only be run after `npm run backend`.

### `npm run open-cypress-coverage`

Opens the coverage report for the frontend tests. This script should only be run after `npm run frontend`.

### `npm run combine-coverage`

Combines the coverage reports for the frontend and backend tests. This script should only be run after `npm run frontend` and `npm run backend`.

### `npm run open-coverage`

Opens the combined coverage report. This script should only be run after `npm run combine-coverage`.

## Learn More About React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
