fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTp_t7obNJHp3zb93lDvTlmPQpsip4byUDH5PAiuwAwnO3FvNb2iGZgPs-e9L2FBLYk-xgo8vLcARBM/pub?output=tsv")
    .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }).then(function(response) {
        response.text().then((body) => { 
              if (response.ok) {
                processData(body); 
              } else {
                console.log("error processing data"); 
                processData("");
              }
            })
  
    }).catch(function(error) {
        console.log(error);
        processData("");
    });

async function processData(text) {
      if(text == "") {
        fetch("/holtnesved-data.tsv");
        text = await response.text();
        console.log("local data used");
      }
      //console.log("PROCESSING DATA:", text);
      let lines = text.split("\n");
      for(let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if(line.startsWith("#")) {
            let data = line.trim().split("\t");
            let tid = data[0];
            let fil = data.slice(1);
            insertRow(tid, fil);
        }
      }
}

function insertRow(tid, rowData) {
    let table = document.getElementById(tid);
    if(table) {
        let row = table.insertRow(-1);
        for(let j = 0; j < rowData.length; j++) {
            let cell = row.insertCell();
            cell.appendChild(document.createTextNode(rowData[j]));
        }
    }
}
