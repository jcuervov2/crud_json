const fs = require('fs');
const path = require('path');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let model = function(tableName) {
    return {
        filePath: path.join(__dirname, '../database/' + tableName + '.json'),
        readFile() {
            let fileContents = fs.readFileSync(this.filePath, 'utf8');

            if (fileContents) {
                let json = JSON.parse(fileContents);

                json.map(product => product.price = toThousand(product.price));

                return json;
            }

            return [];
        },
        writeFile(contents) {
            let fileContents = JSON.stringify(contents, null, " ");

            fs.writeFileSync(this.filePath, fileContents);
        },
        find(id) {
            let rows = this.readFile();
            return rows.find(row => row.id == id)
        },
        update(row, id) {
            let rows = this.readFile();

            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == id) {
                    oneRow = {
                        id,
                        ...row,
                        image: oneRow.image
                    };
                    return oneRow;
                }
                return oneRow;
            });

            this.writeFile(updatedRows);

            return row.id;
        },
        create(row) {
            let rows = this.readFile();
            let nextId = this.nextId();

            row = {
                id: nextId,
                ...row
            };


            rows.push(row);

            this.writeFile(rows);

            return row.id;
        },
        nextId() {
            let rows = this.readFile();
            let lastRow = rows.pop();

            if (lastRow) {
                return ++lastRow.id;
            }

            return 1;
        },
        delete(id) {
            let rows = this.readFile();
            let updatedRows = rows.filter(oneRow => oneRow.id != id);

            this.writeFile(updatedRows);
        }
    }
}



module.exports = model;