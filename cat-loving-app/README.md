# Preseting Cat Loving App

This an App about Cats. We have 4 main screens
1. Main Screen
  This is our default screen you can find it localhost:3000/
  Here you can go to our 3 other screens
2. Random Cats Screen
    This screen opens with a call to get 10 random cats. Each time you click Give me More Cats you will get a new set of 10 added to the existing results. Since the list of cats retrieved remains in the localStorage you can click Give Me New Cats to erase all the already loaded cats and you get a new list of 10 random cats
3. Breeds Screen
    This screen has a list of breeds that we have information about. You can click on each link to get to the page where you see info about this breed and a list of all the images we have with cats from this breed
4. Favorites
    Whenever you click a cat and you can get a modal with the info about this cat. By clicking on the heart icon you can add this cat to your Favorites. At any time from any screen you can click on Favorites. Either from the main screen or from the button of the header.

    This screen shows you all the cats you have already added to your favourites. By clicking on any of the cats you get a modal with the picture and you can click on the trash-can icon to remove it from your favourites

## Folder Structure
    -- public ( Contains index.html on which I have added one more binding for the div that renders the modal #modal_root)
    -- src
        -- breeds ( components for screen 3)
            -- BreedDetail 
                Presents the breed basic info and the list of the breeds' images
            -- BreedsScreen
                Presents the list of Breeds
        -- cats ( components for screen 2 )
            --CatDetail
                renders the picture of the cat in a modal or not ( this component is rendered when you go directly to the url of the cat)
            -- RandomCatsScreen
                this component renders and maintains the list of random cats you have loaded. The data remain on the localStorage, so when someone is click on the catDetails link of the CatDetail modal he will get on a screen where the CatDetail is rendered as a page. when going back from there we make sure you go to your existing list of cats. If you want a fresh list you can click on the Give me New Cats button.
        -- common ( commonly used components)
            -- CatImage ( renders a catImage respecting the number of how many cats you have per row)
            -- Modal ( renders the modal )
            -- RandomCatsTop ( contains the ui for selecting number of cats per row ). It is shared between screens 2,4
        -- favorites ( components for screen 4)
            -- Favorites ( Renders the list of Favorites, opens a modal with CatImage )
        -- mainScreen ( components for screen 1)
            -- MainScreen ( Contains introduction page )
        -- services
            -- breedsService ( API calls for breeds)
            -- catService ( API calls for cats )
            -- favoritesService ( API calls for favorites)
        -- testUtils
            -- jest setup
    App.tsx ( main app )
    index.tsx ( react bindings )
    *.styles.ts ( Styled Components for the App component )

## Testing
I have added jest.config.json 

I have tested all the components that contain logic using react-testing-library

Triggering events after rendering the component, mocking API requests and testing if components I need to see in the screen they appear

## General Notes
I spent more time in the engineering of this. I added styled components so UI, UX can scalably improve. I have abstracted the API requests, so they are easy to handle when unit testing the application.

I didn't focus on the looks of it as I decided to spent my limited time on seting up an application that can easily modified. By using styled components I abstract the styling from the logic. Also during testing I made sure that I don't base on styles but rather on data-testid so when I change styles all the tests are still running.

So focus was on the maintenability / extensibility of the codebase rather on good looks.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.