
function io_importCSV({ context, onload }) {
    const file = context.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        onload({ text });
    };
    reader.readAsText(file);
}

function io_exportCSV(fileName, callback) {
    const rows = callback();
    if (!rows) {
        storage_addMessage({ message: "Rien a exporter!" });
        return;
    }
    const csvContent = "data:text/csv;charset=utf-8,"
        + rows.map(e => e.join(";")).join("\n");

    const link = dom_create("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `RDMP_${fileName}_${(new Date()).toLocaleString()}.csv`);
    document.body.appendChild(link);
    link.click();
}

function io_extractCSV({ text, buildObjectMethod }) {
    const lines = text.split('\n');
    const array = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue; // Ignorer les lignes vides
        const currentLine = lines[i].split(';');
        array.push(buildObjectMethod(currentLine));
    }
    return array;
}