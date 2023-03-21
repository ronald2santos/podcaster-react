# Podcaster
This app consists of three main views:
* Home ("/"): List of Top 100 podcasts available in Apple Podcasts.
* Podcast (/podcast/:podcastId): Detailed view of a podcast with a list of the last 20 episodes.
* Episode  (/podcast/:podcastId/episode/:episodeId): Detailed view of an episode with the ability to listen to it.

## Technologies
This app was made with React, Typescript and Tailwind CSS, using create-react-app.
Routing was done with react-router-dom.

## Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
