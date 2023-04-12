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

function processData(text) {
  if(text == "") {
    fetch("/holtnesved-data.tsv");
    text = await response.text();
    console.log("local data used");
  }
  console.log("PROCESSING DATA:", text);
}
