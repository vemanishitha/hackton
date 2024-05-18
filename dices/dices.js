document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('diceCanvas');
    const ctx = canvas.getContext('2d');
    const size = 200;

    const Dice = (number) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, size, size);
        ctx.strokeRect(0, 0, size, size);

        ctx.fillStyle = 'black';
        ctx.font = `${size / 2}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(number, size / 2, size / 2);
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 6) + 1;
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            const randomNumber = getRandomNumber();
            Dice(randomNumber);
        }
    });

    Dice(getRandomNumber());
});