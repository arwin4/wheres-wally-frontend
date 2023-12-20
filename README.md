# Where's Wally?

This is a frontend implementation of [The Odin Project's full stack _Where's Waldo?_ project](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app).

[The backend can be found here.](https://github.com/arwin4/wheres-wally-backend)

It is a game in which the player must identify three 'sights' in an image of a RollerCoaster Tycoon amusement park. After finding all the sights, the user may enter their name to record their time and appear on the leaderboard.

This implementation expands on the assignment by using a huge image: the user must pan the image to find all the sights.

The state of the game is tracked entirely on the backend, a RESTful Express API. Attempts at identification by the user are verified by the backend.

## Some other notable features

- Though the game (by its nature) is much easier to play on a bigger screen, it has been designed to also work well on touch screens of any size.
- The user is given feedback on every attempt at identification using toasts. Sights found by the user are marked both on the image and next to it.
- Cheating is of course possible: by clearing localStorage, the user will receive a new id from the API. But there are some precautions against cheaters. For instance, if the user refreshes the page after the game has already started, the clock keeps ticking. After finishing the game, a user can play again, but they won't be able to submit an improved time.
- The search image is preloaded before the game starts.
