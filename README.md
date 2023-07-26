
# Color Picker

A web page to quickly generate a pair of randomized color sets.

Created with HTML, CSS, and JavaScript.


## Demo
![faviconIcon](https://user-images.githubusercontent.com/84001929/209029493-b71ceffb-c97b-468c-bf5a-19792b355784.png)
https://brunchwithyou.github.io/ColorPicker/

![ColorPickerDemo3](https://user-images.githubusercontent.com/84001929/209036713-79d64c15-c814-4ca0-809f-58d072a42f71.gif)


## Features

- Randomize color sets with rgba values
- Persistent local storage
- Save and delete your color sets
- Copy values to clipboard onclick
- Side-by-side and fullscreen view


## Roadmap

- Add a menu for multiple color parameters (Hex/HSL values)
- Add ability to undo delete / recover recently deleted saved sets
- Smooth out responsiveness for different devices/browsers
- Add a layout re-design strictly for mobile view
- Revisit js and css interaction by adding/removing classes instead of hard coding
- Revisit implementation of loops to optimize event listeners
- Consider replacing the use of transition in css for animation


## Noteworthy Discoveries & Bugs Encountered
- Event listener is lost when using innerHTML to append a saved color set to the DOM, make use of insertAdjacentHTML instead
- Event delegation needed for looping. Bug occurred where the trashcan needed to be clicked on twice to delete. Once to add an eventlistener and once again to actually execute the event.
- CSS height property does not translate well when trying to use transition after a DOM removal. Use max-height instead.
- Removing an inline style from the DOM will result in `style=""` instead of getting rid of the declaration completely.



