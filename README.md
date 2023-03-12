# Getting Started

<p align="center">
  <a href="https://www.youtube.com/@codeofrelevancy" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://paradiseofcreativity.com/wp-content/uploads/2023/02/Code-of-Relevancy-Logo-White-Plain.png" alt="Code of Relevancy">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://www.youtube.com/@codeofrelevancy/videos" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/youtube/channel/subscribers/UCVcJ4UAyjXS2iihmiIa0xXg?style=social" alt="youtube subscribers"></a>
  <a href="https://dev.to/codeofrelevancy" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/DEV-Community-blue" alt="dev community"></a>
  <a href="https://medium.com/@codeofrelevancy" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Medium-Blog-green" alt="medium blog"></a>
  <a href="https://twitter.com/intent/follow?screen_name=codeofrelevancy" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/twitter/follow/codeofrelevancy?style=social" alt="twitter follow"></a>
</p>

This is a [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) project.

### Install Tailwind CSS

Add the Play CDN script tag to the <head> of your HTML file, and start using Tailwind’s utility classes to style your content.

```markdown
<script src="https://cdn.tailwindcss.com"></script>
```

Enable first-party plugins, like forms and typography, using the plugins query parameter.

```markdown
<script src="https://cdn.tailwindcss.com?plugins=typography"></script>
```

## Dependencies

### Canvas Confetti

Component for drawing confetti on a canvas.

NPM:

```markdown
https://www.npmjs.com/package/canvas-confetti
```

### HTML2Canvas

The script allows you to take "screenshots" of webpages or parts of it, directly on the users browser. The screenshot is based on the DOM and as such may not be 100% accurate to the real representation as it does not make an actual screenshot, but builds the screenshot based on the information available on the page.

NPM:

```markdown
https://www.npmjs.com/package/html2canvas
```

## Draw Overlays

[Simple with gray footer](https://tailwindui.com/components/application-ui/overlays/modals)

## How it works?

```markdown
Welcome to Tic Tac Toe! In this game, you'll be playing against a friend, trying to get three of your symbols in a row before your opponent does.

The game starts with player X's turn and they can click on an empty square to place their symbol. After player X makes their move, it becomes player O's turn to place their symbol in an empty square. During each turn, the game shows a bounce animation on the current player's name to indicate whose turn it is. This makes it easy for players to keep track of whose turn it is and adds a fun element to the game.

Customizable Avatars: By default, you'll see Davy Jones and Jack Sparrow representing X and O respectively. But if you want to personalize the game, you can upload your own avatars from your local machine. Note that the uploaded avatars won't persist after a page refresh since there's no database connectivity.

Victory Celebrations: When a player wins, the game will display confetti animations over winner's avatar and at the top of the page to celebrate the victory. The player's avatar will also be adorned with an animated Tic Tac Toe trophy. And to help you see the winning move more clearly, the game will highlight the three squares that make up the line.

Score Tracking: Each player has a score that increases by one after securing a victory. The scores are stored on the client side (in the local storage of your browser) so you can keep track of your progress even if you close the page. And if you ever want to start over, you can reset the scores to 0 for both players with a click of "Reset Score" button.

Reset Game: To reset the game after a victory, you can click the "Reset Game" button.

At the end of the game, players can download an image of the board with the winning trophy and the score. This image can be saved or shared with others.

In case the game ends in a draw, a popup message is displayed notifying you that the game ended in a draw.

So what are you waiting for? Let's play some Tic Tac Toe!
```

## Powered by Code of Relevancy →

URL: https://www.youtube.com/@codeofrelevancy/videos
