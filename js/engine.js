const Engine = function (global) {
    const doc = global.document;
    const win = global.window;
    const canvas = doc.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const rows = 7;
    const cols = 5;

    let lastTime;

    canvas.width = Helper.getCanvasWidth(cols);
    canvas.height = Helper.getCanvasHeight(rows);
    doc.body.appendChild(canvas);

    function main() {
        const now = Date.now();
        const dt = (now - lastTime) / 1000.0;
        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        checkWin();
    }

    function updateEntities(dt) {
        allEnemies.forEach(enemy => {
            enemy.update(dt);
        });
        hero.update();
    }

    function renderEntities() {
        allEnemies.forEach(enemy => {
            enemy.render();
        });

        hero.render();
    }

    function render() {
        const rowImages = [
            'images/water-block.png',
            'images/stone-block.png',
            'images/stone-block.png',
            'images/stone-block.png',
            'images/stone-block.png',
            'images/stone-block.png',
            'images/grass-block.png',
            'images/grass-block.png',
        ];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * Helper.cellWidth, row * Helper.cellHeight);
            }
        }

        renderEntities();
    }

    function reset() {
        resetHero();
        resetEnemies();
    }

    function resetHero() {
        hero.init();
    }

    function resetEnemies() {
        allEnemies.forEach(enemy => enemy.init());
    }

    function checkCollisions() {
        const heroCenterX = hero.centerX;
        const heroCenterY = hero.centerY;

        allEnemies.forEach(enemy => {
            if (Math.abs(heroCenterX - enemy.centerX) < 65 && Math.abs(heroCenterY - enemy.centerY) < 55) {
                alert('You lost!');
                reset();
            }

        });
    }

    function checkWin() {
        if (hero.y === -25) {
            alert('Yoy won!');
            reset();
        }
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
};
