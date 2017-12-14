var items = [], block, emptyI, emptyJ;

function swap(arr, i1, j1, i2, j2) {
    var t = arr[i1][j1];
    arr[i1][j1] = arr[i2][j2];
    arr[i2][j2] = t;
}

window.onload = function () {
    block = document.getElementById("block");
    newGame();
    document.getElementById("refresh").onclick = newGame;
};

function cellClick(event) {
    var event = event || window.event,
        el = event.srcElement || event.target,
        i = el.id.charAt(0),
        j = el.id.charAt(2);
    if ((i == emptyI && Math.abs(j - emptyJ) == 1) || (j == emptyJ && Math.abs(i - emptyI) == 1)) {
        document.getElementById(emptyI + " " + emptyJ).innerHTML = el.innerHTML;
        el.innerHTML = "";
        emptyI = i;
        emptyJ = j;
        var q = true;
        for (i = 0; i < 4; ++i)
            for (j = 0; j < 4; ++j)
                if (i + j != 6 && document.getElementById(i + " " + j).innerHTML != i * 4 + j + 1) {
                    q = false;
                    break;
                }
        if (q) alert("Victory!");
    }
}

function newGame() {
    for (var i = 0; i < 4; ++i) {
        items[i] = [];
        for (var j = 0; j < 4; ++j) {
            if (i + j != 6)
                items[i][j] = i * 4 + j + 1;
            else
                items[i][j] = "";
        }
    }
    emptyI = 3;
    emptyJ = 3;
    for (i = 0; i < 555; ++i)
        switch (Math.round(3 * Math.random())) {
            case 0:
                if (emptyI != 0) {
                    swap(items, emptyI, emptyJ, --emptyI, emptyJ);
                }
                break; // up
            case 1:
                if (emptyJ != 3) {
                    swap(items, emptyI, emptyJ, emptyI, ++emptyJ);
                }
                break; // right
            case 2:
                if (emptyI != 3) {
                    swap(items, emptyI, emptyJ, ++emptyI, emptyJ);
                }
                break; // down
            case 3:
                if (emptyJ != 0) {
                    swap(items, emptyI, emptyJ, emptyI, --emptyJ);
                }
                break; // left
        }
    var table = document.createElement("table"),
        tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (i = 0; i < 4; ++i) {
        var row = document.createElement("tr");
        for (j = 0; j < 4; ++j) {
            var cell = document.createElement("td");
            cell.id = i + " " + j;
            cell.onclick = cellClick;
            cell.innerHTML = items[i][j];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    if (block.childNodes.length == 1)
        block.removeChild(block.firstChild);
    block.appendChild(table);
}