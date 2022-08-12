var columns = ["id", "name", "last", "description"];
var editableColumns = ["name", "description"];
var tableId = "table-id";
var tableRows = document.getElementById("table-id").querySelector('tbody').querySelectorAll('tr');
var createOnClickHandler = function (id, event) {
    console.log(id);
    console.log(event);
}
for (var i = 0; i < tableRows.length; i++) {
    var tds = tableRows[i].querySelectorAll('td');

    const id = tableRows[i].id;
    for (var j = 0; j < tds.length; j++) {
        tds[j].ondblclick = (event) => {
            createOnClickHandler(id, event);
        };
    }
}
