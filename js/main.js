import Rx from 'rxjs/Rx';
import texts from './server';

//clicking on play button
const playButton = document.querySelector('#play');
const clicks = Rx.Observable.fromEvent(playButton, 'click');

var isPlaying = false;

let clicker = clicks.subscribe(e => {
    // show time
    document.querySelector('.main__starting').style.visibility = "visible";
    playButton.disabled = true;

    // get a random text 
    let randText = Math.floor(Math.random() * Math.floor(texts.length));
    let sentence = document.createElement('p');
    sentence.textContent = texts[randText];
    var main_text = document.querySelector('.main__text').appendChild(sentence);
    var rect = sentence.getBoundingClientRect();
    console.log(rect);

    // green marker below 
    let log = document.createElement('p');
    log.style.position = 'absolute';
    log.style.top = rect.top + 'px';
    log.style.width = rect.width + 'px';
    var main_log = document.querySelector('.main__log');
    main_log.appendChild(log);
    // time untill playing
    var timer = Rx.Observable.create(function subscribe(observer) {
        let start = 5;
        observer.next(start--)
        var id = setInterval(() => {
            if (start >= 0) {
                observer.next(start--)
            } else {
                observer.next('--- Game has started!')
                observer.complete();
            }
        }, 1000);
    });


    timer.subscribe(
        x => document.querySelector('#main--time').textContent = x,
        err => console.error('Observer got an error: ' + err),
        // on complete start the game
        () => {
            const presses = Rx.Observable.fromEvent(document, 'keypress');
            let arrayOfChars = texts[randText].split("");
            let index = 0;
            let arrayOfTypedChars = [];
            let arrayOfAllTypedChars = []
            let typeracer = presses.subscribe(e => {
                if (e.key === arrayOfChars[index] && index <= arrayOfChars.length) {
                    arrayOfTypedChars.push(arrayOfChars[index]);
                    log.textContent = arrayOfTypedChars.toString().split(',').join('');
                    index++;
                }
                if (index === arrayOfChars.length) {
                    let gameCompleted = document.createElement('p');
                    gameCompleted.textContent = 'Congratulations, game completed!';
                    document.body.appendChild(gameCompleted);
                    return;
                }
            });
        }
    );
});