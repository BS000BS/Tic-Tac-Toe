const xIcon = 'bi-x-lg';
const oIcon = 'bi-circle';
const bigBox = document.querySelector('.big-box');
const resultX = document.querySelector('.player1_result');
const resultO = document.querySelector('.player2_result');
const winnerDrawPopup = document.querySelector('.winner-draw-popup');
const winnerDrawText = document.querySelector('.winner-draw-text');
const popupBlur = document.querySelector('.blur');
let count = 0;

localStorage.setItem('turnFor', 'x');

if (localStorage.getItem('TTTGame Finished!')) {
    localStorage.removeItem('TTTGame Finished!');
}
if (localStorage.getItem('playerX')) {
    localStorage.removeItem('playerX');
}
if (localStorage.getItem('playerO')) {
    localStorage.removeItem('playerO');
}
if (localStorage.getItem('resultX')) {
    resultX.innerText = localStorage.getItem('resultX')
}
if (localStorage.getItem('resultO')) {
    resultO.innerText = localStorage.getItem('resultO')
}

function elementContainsClass (element, theClass) {
    if (element.classList.contains(theClass)) {
        return true
    } else return false;
}

function playerWon(player){
    const getLocalItem = localStorage.getItem(player);
    if ((getLocalItem != null) && 
        (getLocalItem.includes('1') && 
        getLocalItem.includes('2') && 
        getLocalItem.includes('3')) ||
        (getLocalItem.includes('1') && 
        getLocalItem.includes('5') && 
        getLocalItem.includes('9')) || 
        (getLocalItem.includes('1') && 
        getLocalItem.includes('4') &&
        getLocalItem.includes('7')) || 
        (getLocalItem.includes('2') && 
        getLocalItem.includes('5') &&
        getLocalItem.includes('8')) || 
        (getLocalItem.includes('3') && 
        getLocalItem.includes('6') &&
        getLocalItem.includes('9')) || 
        (getLocalItem.includes('3') && 
        getLocalItem.includes('5') &&
        getLocalItem.includes('7')) || 
        (getLocalItem.includes('4') && 
        getLocalItem.includes('5') &&
        getLocalItem.includes('6')) || 
        (getLocalItem.includes('7') && 
        getLocalItem.includes('8') &&
        getLocalItem.includes('9'))
    ) {
        return true;
    } else return false;
}

function winDrawPopup(player = '') {
    winnerDrawText.style.animation = 'increase-font-size 0.5s ease-in forwards';
    winnerDrawPopup.style.animation = 'display-popup 0.5s ease-in forwards';
    popupBlur.style.display = 'block';
    if (player != '') {
        winnerDrawText.innerText = 'The winner is ' + player;
        localStorage.setItem('TTTGame Finished!', 'true');
    } else {
        winnerDrawText.innerText = 'There is no winner. The game has been drawn.';
    }
}


document.body.addEventListener('click', e => {
    if (localStorage.getItem('TTTGame Finished!') !== 'true' &&  count !== 9) {
        if (e.target.firstChild && e.target.firstChild.classList && elementContainsClass(e.target.firstChild, 'icon')) {
            if (localStorage.getItem('turnFor') && localStorage.getItem('turnFor') == 'x') {
                e.target.firstChild.classList.add('bi', xIcon);
                localStorage.setItem('turnFor', 'o');
                bigBox.style.boxShadow = '5px 5px 30px 5px rgb(127, 225, 255), -5px -5px 30px 5px rgb(127, 225, 255)';
                count++
                if (localStorage.getItem('playerX')) {
                    localStorage.setItem('playerX', [localStorage.getItem('playerX'), e.target.attributes[1].value])
                } else {
                    localStorage.setItem('playerX', [e.target.attributes[1].value])
                }
            } else if (localStorage.getItem('turnFor') && localStorage.getItem('turnFor') == 'o') {
                e.target.firstChild.classList.add('bi', oIcon);
                localStorage.setItem('turnFor', 'x');
                bigBox.style.boxShadow = '5px 5px 30px 5px rgb(255, 100, 100), -5px -5px 30px 5px rgb(255, 100, 100)';
                count++
                if (localStorage.getItem('playerO')) {
                    localStorage.setItem('playerO', [localStorage.getItem('playerO'), e.target.attributes[1].value])
                } else {
                    localStorage.setItem('playerO', [e.target.attributes[1].value])
                }
            }

            if (localStorage.getItem('playerX') != null && playerWon('playerX')) {
                if(localStorage.getItem('resultX')) {
                    localStorage.setItem('resultX', parseInt(localStorage.getItem('resultX'))+1);
                } else {
                    localStorage.setItem('resultX', 1);
                }
                resultX.innerText = localStorage.getItem('resultX')
                setTimeout(() => {
                    winDrawPopup('X');
                }, 200)
            } else if (localStorage.getItem('playerO') != null && playerWon('playerO')) {
                if(localStorage.getItem('resultO')) {
                    localStorage.setItem('resultO', parseInt(localStorage.getItem('resultO'))+1);
                } else {
                    localStorage.setItem('resultO', 1);
                }
                resultO.innerText = localStorage.getItem('resultO')
                setTimeout(() => {
                    winDrawPopup('O');
                }, 200)
            }
            setTimeout(() => {
                if (count === 9 && localStorage.getItem('TTTGame Finished!') == null) {
                    winDrawPopup();
                }
            }, 300)
        }
    }
})

document.querySelector('.restart').addEventListener('click', e => {
    window.location.reload();
})
document.querySelector('.reset-results').addEventListener('click', e => {
    localStorage.removeItem('resultX');
    localStorage.removeItem('resultO');
    window.location.reload();
})

document.querySelector('.popup-remove-button').addEventListener('click', e => {
    winnerDrawPopup.style.animation = '';
    winnerDrawPopup.style.opacity = '0';
    popupBlur.style.display = 'none';
})