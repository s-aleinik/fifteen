var items = [],     // объявляем массив, в котором будут храниться наши клетки
    block,          // объявляем переменную контейнера для игрового поля
    emptyI,         // объявляем переменную позиции пустой клетки в строках
    emptyJ,         // объявляем переменную позиции пустой клетки в столбцах
    rows,           // объявляем переменную для общего количества строк
    columns,        // объявляем переменную для обзего количества столбцов
    select,         // объявляем переменную для списка с размерами поля
    startTime,      // объявляем переменную время начала игры
    timeout;        // объявляем переменную длительности анимации

window.onload = function () {
    block = document.getElementById("block");                   // вносим в переменную контейнер для нашего поля
    select = document.getElementById("type");                   // вносим в переменную список с размерами поля
    document.getElementById("refresh").onclick = newGame;       // по клику на кнопку стартуем новую игру
    document.getElementById("change").onclick = changeSize;     // по клику на кнопку переводит на выбор размера поля
};

// функция для обработки для перемещения клетки

function cellClick(event) {
    var clickEvent = event || window.event,                  // отлавливаем событие клика по клетке
        el = clickEvent.srcElement || clickEvent.target,     // находим элемент, по которому был осуществлён клик
        ei = el.id.charAt(0),                                // получаем его положение в строке
        ej = el.id.charAt(2);                                // получаем его положение в столбце

    // проверяем, был ли клик по клетке, рядом с пустой

    if ((ei == emptyI && Math.abs(ej - emptyJ) == 1) || (ej == emptyJ && Math.abs(ei - emptyI) == 1)) {

        if (emptyI - ei == 1) {
            document.getElementById(emptyI + " " + emptyJ).classList.add('animated', 'zoomOutUp');          // добавляем анимацию
            el.classList.add('animated', 'zoomOutDown');                                                    // добавляем анимацию
            setTimeout(function () {
                document.getElementById(emptyI + " " + emptyJ).classList.remove('animated', 'zoomOutUp');   // убираем анимацию
                el.classList.remove('animated', 'zoomOutDown');                                             // убираем анимацию
                isWin(el, ei, ej);                                                                          // проверяем условия победы
            }, timeout * 10);
        } else if (emptyI - ei == -1) {
            document.getElementById(emptyI + " " + emptyJ).classList.add('animated', 'zoomOutDown');
            el.classList.add('animated', 'zoomOutUp');
            setTimeout(function () {
                document.getElementById(emptyI + " " + emptyJ).classList.remove('animated', 'zoomOutDown');
                el.classList.remove('animated', 'zoomOutUp');
                isWin(el, ei, ej);
            }, timeout * 10);
        } else if (emptyJ - ej == 1) {
            document.getElementById(emptyI + " " + emptyJ).classList.add('animated', 'zoomOutLeft');
            el.classList.add('animated', 'zoomOutRight');
            setTimeout(function () {
                document.getElementById(emptyI + " " + emptyJ).classList.remove('animated', 'zoomOutLeft');
                el.classList.remove('animated', 'zoomOutRight');
                isWin(el, ei, ej);
            }, timeout * 10);
        } else {
            document.getElementById(emptyI + " " + emptyJ).classList.add('animated', 'zoomOutRight');
            el.classList.add('animated', 'zoomOutLeft');
            setTimeout(function () {
                document.getElementById(emptyI + " " + emptyJ).classList.remove('animated', 'zoomOutRight');
                el.classList.remove('animated', 'zoomOutLeft');
                isWin(el, ei, ej);
            }, timeout * 10);
        }
    }
}

// функция для проверки, не победил ли пользователь

function isWin(el, ei, ej) {
    document.getElementById(emptyI + " " + emptyJ).innerHTML = el.innerHTML;    // присваиваем обоим клеткам
    el.innerHTML = "";                                                          // новое значение
    emptyI = ei;                        // обновляем переменную позиции пустой клетки в строках
    emptyJ = ej;                        // обновляем переменную позиции пустой клетки в столбцах
    var isWin = true;                   // создаём переменную "победа ли?"
    for (var i = 0; i < rows; i++)      // проверяем, на своих ли местах клетки
        for (var j = 0; j < columns; j++)
            if (i + j != (rows + columns - 2) && document.getElementById(i + " " + j).innerHTML != i * columns + j + 1) {
                isWin = false;
                break;
            }
    if (isWin) {
        setTimeout(showCongratsMessage, timeout * 10 + 1);     // если клетки на своих местах, выводим сообщение о победе
    }
}

// функция для выбора размера поля

function chooseFieldSize() {

    var val = select.options[select.selectedIndex].value;           // получаем выбранное из списке value
    document.getElementById('options').style.display = 'none';      // скрываем блок выбора размеров
    document.getElementById('container').style.display = 'block';   // показываем игровое поле

    switch (+val) {
        case 1:
            rows = 3;                   // согласно выбранного value задаём количество строк
            columns = 3;                // согласно выбранного value задаём количество столбцов
            newGame();                  // запускаем игру
            break;
        case 2:
            rows = 4;
            columns = 4;
            newGame();
            break;
        case 3:
            rows = 5;
            columns = 5;
            newGame();
            break;
        case 4:
            rows = 6;
            columns = 6;
            newGame();
            break;
        case 5:
            rows = 7;
            columns = 7;
            newGame();
            break;
        case 6:
            rows = 8;
            columns = 8;
            newGame();
            break;
        case 7:
            rows = 9;
            columns = 9;
            newGame();
            break;
        case 8:
            rows = 10;
            columns = 10;
            newGame();
            break;
        case 9:
            rows = 10;
            columns = 3;
            newGame();
            break;
        case 10:
            rows = 3;
            columns = 10;
            newGame();
            break;
        default:
            rows = 3;
            columns = 3;
            newGame();
            break;
    }
}

// функция для запуска новой игры; принимает два агрумента: r - кол-во строк, c - кол-во столбцов

function newGame() {

    var slider = document.getElementById("myRange");        // создаём переменную со ссылкой на элемент myRange

    timeout = slider.value;                                 // присваиваем дефолтное значение длительности анимации

    slider.oninput = function () {                          // следим за изменением длительности анимации
        timeout = slider.value;                             // присваимваем выбранное значение длительности анимации
    };

    startTime = new Date();                                 // присваеваем переменной времени начала игры, текущее время

    var width = document.getElementById('container');       // создаем переменную для установки длины общего контейнера
    width.style.width = 55 * columns + 10 + 'px';           // в зависимости от кол-ва столбцов, устанавливаем длину
                                                            // делал это чтобы отцентрировать игровое поле
    for (var i = 0; i < rows; i++) {                        // в цикле заполняем массив выигрышной комбинацией значений
        items[i] = [];
        for (var j = 0; j < columns; j++) {
            if (i + j != (rows + columns - 2)) {
                items[i][j] = i * columns + j + 1;
            }
            else {
                items[i][j] = "";                           // для последнего элемента устанавливаем значение пустой строки
            }
        }
    }
    emptyI = rows - 1;      // присваиваем переменной позиции пустой клетки в строках значение последней строки
    emptyJ = columns - 1;   // присваиваем переменной позиции пустой клетки в столбцах значение последнего столбца

    // в цикле перемещаем значение пустой клетки 55555 раз
    // такое большое число выбрано, чтобы для поля 10х10 клетки перемешивались более-менее корректно

    for (i = 0; i < 55555; i++) {
        switch (Math.round(3 * Math.random())) {                    // выбираем случайное число от 0 до 3
            case 0:
                if (emptyI != 0) {                                  // проверяем, не находится ли пустая клетка в верхней строке
                    swap(items, emptyI, emptyJ, --emptyI, emptyJ);
                }
                break; // если проверка успешна, клетка перемещается вверх
            case 1:
                if (emptyJ != (columns - 1)) {
                    swap(items, emptyI, emptyJ, emptyI, ++emptyJ);  // проверяем, не находится ли пустая клетка в правом столбце
                }
                break; // если проверка успешна, клетка перемещается вправо
            case 2:
                if (emptyI != (rows - 1)) {                         // проверяем, не находится ли пустая клетка в нижней строке
                    swap(items, emptyI, emptyJ, ++emptyI, emptyJ);
                }
                break; // если проверка успешна, клетка перемещается вниз
            case 3:
                if (emptyJ != 0) {                                  // проверяем, не находится ли пустая клетка левом столбце
                    swap(items, emptyI, emptyJ, emptyI, --emptyJ);
                }
                break; // если проверка успешна, клетка перемещается влево
        }
    }
    createField();     // вызываем функцию создания игрового поля(таблицы)
}

// функция для перемешивания значений

function swap(arr, i1, j1, i2, j2) {
    var emptyElement = arr[i1][j1];     // для обеспечения 100% решаемости пустой элемент меняется местами
    arr[i1][j1] = arr[i2][j2];          // с элементами, которые находятся рядом с ним
    arr[i2][j2] = emptyElement;
}

// функция для показа сообщения с поздравлением

function showCongratsMessage() {
    var finishTime = new Date();                                    // присваиваем переменной конца игры текущее время
    var seconds = ((finishTime - startTime) / 1000) % 60;           // получаем секунды
    var minutes = ((finishTime - startTime) / (1000 * 60)) % 60;    // получаем минуты
    alert("Ура! Вы решили головоломку за " + (Math.trunc(minutes)) + ':' + (Math.trunc(seconds)) + "")
}

// функция для создания игрового поля(таблицы)

function createField() {
    var table = document.createElement("table"),
        tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (var i = 0; i < rows; i++) {
        var row = document.createElement("tr");             // создаём строки
        for (var j = 0; j < columns; ++j) {
            var cell = document.createElement("td");        // создаём столбцы
            cell.id = i + " " + j;                          // присваиваем каждой клетке свой id, равный положению в массиве
            cell.onclick = cellClick;                       // по нажатию на клётку вызываем функцию перемещения
            cell.innerHTML = items[i][j];                   // добавляем клетке нужную нам цифру
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    if (block.childNodes.length == 1) {                     // проверка на то, существует ли уже таблица(для кнопки Refresh)
        block.removeChild(block.firstChild);                // если таблица уже есть, она удаляется
    }

    block.appendChild(table);                               // добавляем таблицу в контейнер
}

// функция для смены размера игрового поля

function changeSize() {
    select.selectedIndex = 0;                                       // устанавливаем пустой элемент options
    document.getElementById('options').style.display = 'block';     // показываем блок выбора размера поля
    document.getElementById('container').style.display = 'none';    // скрываем блок с игровым полем
}