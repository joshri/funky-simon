# WELCOME TO FUNKY SIMON!
## The Simon you know and love - but FUNKY.

## Tools:
- HTML5
- CSS
- Javascript 
- VSCode
- GarageBand
- Audacity
- Animate.css animation library
- favicon.io for fav icon
- funk

## Method:
#### I started by chopping up the game functionality into four pieces:
- Computer Chooses (funkyChoice)
- Computer Displays (funkyDisplay)
- Player Chooses (playerInput)
- Win or Lose States (winState, lose, and DefeatState)

#### A couple highlights in my journey to create the MVP:
- global n checker variable to compare player choice to computer choice at every index, so the player will know right away if they lose.
- recursive function to control initial pulse styling on funkyDisplay (later made irrelevant by animate.css, but I wanted to leave it in because it's fun! Especially with the setTimeouts)
- Linking the pieces together: play() triggers computer action, which toggles playerInput, which judges win and loss, which reset to start.

#### Where things got complicated was adding the sound and styling. Highlights here:

- Learning as I went along - going from hard-coding the background animations with css to using an animation api for playerStyle().
- Using Date.now() to add a rhythm game on top of my Simon game. Once I had the song in place I just couldn't help myself. 
- Custom audio done in garageband and audacity from a professional actor! (It was me).

## Known bugs/future fixes:
### Bugs:
- Animations/audio can sometimes be out of sync due to the browser loading speed(?)
- the way rhythm checker increments each beat is based on player input, which can lead to an early or late trigger over time that is unfair
- the late indicator waits to check for player input, so you can actually just wait forever and softlock the game. It should be able to check once 500 milliseconds have past to trigger late cue.

### Fixes/Plans:
- Balance audio levels in-game across the board - especially 'yeah' and 'hot' are too low 
- Double-time mode for difficulty?
- Better styling on soundboard, and add more clips?
- soundboard clips should be able to cut themselves off to play again.
- Refactor animations and audio into a massive object called Style to make actual game code easier to read. 
- title screen animation + resetting background pulse animation/adding new one to fit with music.

If you haven't listened to the lyrics to Funky Simon...just skip ahead in the song and enjoy.

Initial Wireframe:
https://docs.google.com/document/d/12Q4g98kwNsW2IQPVzMzFTmfcyVmNkTFsu6BOHMTJok8/edit?usp=sharing

## User Stories

#### MVP Goals
- as a player, I want a clear way to trigger the game to start
(title screen and play button)
- as a player, I want to know how many rounds I have completed, and my highest round score of all time!
(current round and high score)
- as a player, I need to be able to tell the difference between buttons, and which button Funky Simon is pressing
(colored buttons, brief highlight when pressed? Paired with keystroke for access?)
- as a player, I want the challenge to increase as I continue to clear rounds, with variety if I want to keep playing after I inevitably lose.
(add one randomized button/round)
- as a player, I want to feel the sting of defeat, with a quick way to jump back in!
(defeat state and replay button)

#### Stretch Goals
- as a player, wouldn't it be nice if Funky Simon were actually funky?
(animations? transitions?)
- as a player, the theme of Funky Simon is begging for an auditory component.
(AUDIO: pairing brief sound clips to button press with text to match, potentially setting the whole thing to rhythm?!?!?!?!?!)
- as an experienced Simon player, I'm looking for something different, be it more challenge or something unique.
(different speed levels? Increased button amount? Simon soundboard freeplay?)
