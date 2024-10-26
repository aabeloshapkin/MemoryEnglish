import { Game } from './js/game.js'

let game = new Game;
let carts = game.createCarts();


game.randomizeCarts(carts);
game.playGame(carts);

document.getElementById("new-game-btn").addEventListener("click", function() {
    game.resetGame();
    game.createCarts();
    game.randomizeCarts(carts);
    game.playGame(carts);
    document.getElementById("model-start").classList.remove("open-modal");
})

document.getElementById("new-game-btn2").addEventListener("click", function() {
    document.getElementById("model2-start").classList.remove("open-modal2");
})