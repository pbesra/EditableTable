// all columns
var columns = ["id", "first", "last", "description"];

// columns which can be edited.
var editableColumns = ["first", "description"];
var tableId = "table-id";
var tableNode = document.getElementById(tableId);
var tableRows = document.getElementById("table-id").querySelector('tbody').querySelectorAll('tr');
var snapshot = [];
const CELL_STYLE = {};

// add all attributes here.
// customizable if an input is make mandatory or email type or number type or other such feature.
const COLUMN_ATTR = {
    first: { type: 'text', required: "" },
    description: { type: 'text' },

}

// check if a column is editable
function isEditable(columnIndex) {
    var colName = columns[columnIndex];
    for (var i = 0; i < editableColumns.length; i++) {
        if (editableColumns[i] === colName) {
            return true;
        }
    }
    return false;
}

// get all submit data --- todo: remove later after code cleaning
function getAllInputValues() {
    for (var i = 0; i < snapshot.length; i++) {
        var obj = snapshot[i];
        console.log(obj);
    }
    return snapshot;
}

// submit data 
function submit() {
    console.log('submit');
    return getAllInputValues();
}
function setStyle(elem, colName, cellStyle) {
    return elem;
}

function setAttribute(node, colName) {
    for (var attrKey in COLUMN_ATTR[colName]) {
        node.setAttribute(attrKey, COLUMN_ATTR[colName][attrKey])
    }
    return node;
}

// on click table cell
function onDblClickHandler(id, event, cellStyle) {
    var eventNode = event.target ?? event.srcElement;
    if (eventNode instanceof HTMLInputElement) {
        return;
    }
    var eventTds = document.getElementById(id).querySelectorAll('td');
    for (var i = 0; i < eventTds.length; i++) {
        if (eventTds[i].contains(eventNode) && isEditable(i)) {
            var deletableNode = eventNode;
            if (eventTds[i] === eventNode) {
                deletableNode = eventNode.firstElementChild;
            }
            eventTds[i].removeChild(deletableNode);
            var inputElem = document.createElement('input');
            inputElem = setAttribute(inputElem, columns[i]);
            inputElem = setStyle(inputElem, columns[i], cellStyle);
            inputElem.value = deletableNode.firstChild.nodeValue;
            eventTds[i].appendChild(inputElem);
            snapshot.push({ rowId: id, eventNode: deletableNode, inputNode: inputElem, colName: columns[i] });
            break;
        }
    }
}
// add click event on every table cell
for (var i = 0; i < tableRows.length; i++) {
    var tds = tableRows[i].querySelectorAll('td');

    const id = tableRows[i].id;
    for (var j = 0; j < tds.length; j++) {
        tds[j].ondblclick = (event) => {
            onDblClickHandler(id, event);
        };
    }
}

function restoreTable() {
    for (var k = 0; k < snapshot.length; k++) {
        var obj = snapshot[k];
        var rowTds = document.getElementById(obj.rowId).querySelectorAll('td');
        for (var t = 0; t < rowTds.length; t++) {
            if (rowTds[t].contains(obj.inputNode)) {
                obj.inputValue = obj.inputNode.value;
                snapshot[k] = obj;
                rowTds[t].removeChild(obj.inputNode);
                rowTds[t].appendChild(obj.eventNode);
                break;
            }
        }
    }
}

// on click outside of table
function onClickBody(event) {
    if (!tableNode.contains(event.target)) {
        restoreTable();
    }

}
var body = document.querySelector('body');
body.onclick = onClickBody;

// Note - snapshot is storing the submit data.



