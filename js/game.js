import { Cart } from './cart.js'

export class Game {
    // gameId = document.getElementById("game");
    carts = [];
    //TODO Вынести в отдельный файл
    animals = [
        {image: "🐵", world: "Monkey", translate: "Обезьяна"},
        {image: "🐒", world: "Gorilla", translate: "Горилла"},
        {image: "🐕", world: "Dog", translate: "Собака"},
        {image: "🐈", world: "Cat", translate: "Кот"},
        {image: "🦊", world: "Fox", translate: "Лиса"},
        {image: "🦆", world: "Duck", translate: "Утка"},
        {image: "🦅", world: "Eagle", translate: "Орёл"},
        {image: "🌈", world: "Rainbow", translate: "Радуга"},
        {image: "🌙", world: "Moon", translate: "Луна"},
        {image: "🐎", world: "Horse", translate: "Лошадь"},
        {image: "🐷", world: "Pig", translate: "Свинья"},
        {image: "🐫", world: "Camel", translate: "Верблюд"},
        {image: "🐘", world: "Elephant", translate: "Слон"},
        {image: "🐭", world: "Mouse", translate: "Мышь"},
        {image: "🐹", world: "Hamster", translate: "Хомяк"},
        {image: "🐇", world: "Rabbit", translate: "Кролик"},
        {image: "🦔", world: "Hedgehog", translate: "Ёж"},
        {image: "🐓", world: "Cock", translate: "Петух"},
        {image: "🕊️", world: "Pigeon", translate: "Голубь"},
        {image: "🦢", world: "Swan", translate: "Лебедь"},
        {image: "🦉", world: "Owl", translate: "Сова"},
        {image: "🦜", world: "Parrot", translate: "Попугай"},
        {image: "🦎", world: "Lizard", translate: "Ящерица"},
        {image: "🐳", world: "Whale", translate: "Кит"},
        {image: "🦐", world: "Shrimp", translate: "Креветка"},
        {image: "🐌", world: "Snail", translate: "Улитка"},
        {image: "🐛", world: "Caterpillar", translate: "Гусеница"},
        {image: "🍄", world: "Mushroom", translate: "Гриб"},
        {image: "☂️", world: "Umbrella", translate: "Зонт"},
        {image: "🥕", world: "Carrot", translate: "Морковка"},
        {image: "🥒", world: "Cucumber", translate: "Огурец"},
        {image: "🍡", world: "Candy", translate: "Леденец"},
        {image: "🍦", world: "Ice cream", translate: "Мороженое"},
        {image: "🧁", world: "Cake", translate: "Пирожное"},
        {image: "👓", world: "Glasses", translate: "Очки"},
        {image: "🧷", world: "Pin", translate: "Булавка"},
        {image: "🔑", world: "Key", translate: "Ключ"},
        {image: "🪑", world: "Chair", translate: "Стул"},
        {image: "⛰️", world: "Mountain", translate: "Гора"},
        {image: "🚤", world: "Boat", translate: "Лодка"},
        {image: "🚲", world: "Bicycle", translate: "Велосипед"},
        {image: "🚊", world: "Train", translate: "Поезд"},
        {image: "✈️", world: "Airplane", translate: "Самолет"},

        {image: "👔", world: "Shirt", translate: "Рубашка"},
        {image: "👗", world: "Dress", translate: "Платье"},
        {image: "🥾", world: "Boots", translate: "Ботинки"},

    ]

    createCarts(countCarts = 8) {
        let numbers = [];
        let p, randomCart;

        for (let i = 0; i < countCarts; i++) {
        do {
            randomCart = Math.floor(Math.random() * this.animals.length);
            p = numbers.includes(randomCart);
            if(!p) {
                numbers.push(randomCart);
                this.carts[i] = new Cart(this.animals[randomCart].image, this.animals[randomCart].world, this.animals[randomCart].translate);
                this.carts[i + countCarts] = new Cart(this.animals[randomCart].image, this.animals[randomCart].world, this.animals[randomCart].translate);
            }
        }
        while(p);
        }
        return this.carts;
    }

    randomizeCarts(carts) {
        for (let i = 0; i < carts.length; i++) {
            let randomIndex = Math.floor(Math.random() * carts.length);
            let tempIndex = carts[i];
            carts[i] = carts[randomIndex];
            carts[randomIndex] = tempIndex;
        }
    }

    resetGame() {
        document.getElementById("game").innerHTML = "";
    }

    playGame(carts){
        let firstCart = null;
        let secondCart = null;
        let gameId = document.getElementById("game");
        let countMoves = 0;

        for (const cartInfo of carts) {
            let cart = document.createElement("div");
            cart.textContent = cartInfo.image;
            cart.classList.add("cart");
            gameId.append(cart);
            let world = document.createElement("div");
            world.textContent = cartInfo.world;
            world.classList.add("world");
            cart.append(world);
            let translate = document.createElement("div");
            translate.textContent = cartInfo.translate;
            translate.classList.add("translate");
            cart.append(translate);
        
            cart.addEventListener("click", function() {
                //check cart open or success
                if (cart.classList.contains("open") || cart.classList.contains("success")) {
                    return
                }
        
                cart.classList.add("open");
        
                if (firstCart === null) {
                    firstCart = cart;
                } else {
                    secondCart = cart;
                    countMoves++;
                }
        
                if (firstCart !== null && secondCart !== null) {
                    let firstCartNumber = firstCart.textContent;
                    let secondCartNumber = secondCart.textContent;
                    if (firstCartNumber === secondCartNumber) {
                        firstCart.classList.add("success");
                        secondCart.classList.add("success");
                        firstCart = null;
                        secondCart = null;
                    } else {
                        setTimeout(function() {
                            firstCart.classList.remove("open");
                            secondCart.classList.remove("open");
                            firstCart = null;
                            secondCart = null;
                        },600)
                        
                    }
                }
        
                if (carts.length === document.querySelectorAll(".success").length) {
                    document.getElementById("model-start").classList.add("open-modal");
                    document.getElementById("count-moves").innerHTML = countMoves;
                }
            });
        }
    }

}