## The Problem

There are a lot of blogs with high quality content — sadly, the reading experience often doesn’t do their creators justice.

While there are methods abound for making single posts and articles more readable, doing so for the whole site is a different matter.

## The Solution

Create a web app that allows one to enter a Wordpress URL, and be returned an ebook for a more convenient reading experience.

## Outcome

ePubPress is a web app that allows you to enter an URL to a Wordpress site and get back a fully-fledged ebook, with each chapter corresponding to a post.

This way, you can archive your favorite blogs, and indulge all at once in any new gem you fund — even offline.

Get the full advantage of the tools ebook readers come with, including the highlighting of text passages, bookmarking positions, and adding notes.

![Enter URL](./docs/assets/enter-url.png "Enter an URL to a Wordpress(.com) blog...")

![Downloading Progress](./docs/assets/downloading.png "...observe the progress bar..")

![Book](./docs/assets/book.png "...enjoy reading!")

## Background

There are a lot of blogs out there, with a wide range of quality. Some of them might as well be sold as books, so good and consistent is their quality. To me, [waitbutwhy.com](https://waitbutwhy.com/) and [bodyrecomposition.com](https://bodyrecomposition.com/) are such examples.

While their content differs, the quality in their respective fields doesn’t: waitbutwhy explore scientific concepts and ideas in a humorous, and memorable manner, teaching valuable information effortlessly.

Bodyrecomposition meanwhile is one of the greatest treasure troves when it comes to evidence based training and nutrition information.

As such, the high standard to which these blogs are held by their authors makes each article a chapter in a book whose writing is ongoing - which is the way I wanted to consume them in.

Back in the day I used to create small applications that used to loop through a blog’s RSS feed and feed them into Evernote. Later on, I decided to bundle them up into a much more convenient ebook format, which involved a lot of manual labour.

At the time, this approach served its purpose, allowing me to binge read and annotate to my liking. Recently though, I thought of revisiting this idea, with my backlog of unread material adding up and Wordpress nowadays having a fully working REST API, which simplifies the process a lot.

## How It Works

The application asks the user for a Wordpress URL. A little background check is run on the chosen site, querying its source for evidence of Wordpress related code.

On success, a request is sent to the API, looping through the posts and binding them into a book. (Wordpress.com sites have slightly different endpoints, but otherwise act the same.)

Ticking the “Include Images” box fetches each image on each post, creates a blob and attaches it as a local reference in place of the original link. Naturally, this lengthens the process quite a bit, which is why I decided to include a progress indicator, as to not give off the impression of an unresponsive program.

Where available, other information gathered through the API is used to populate the .epub’s metadata field, such as the site author, categories and publisher.

<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

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

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
