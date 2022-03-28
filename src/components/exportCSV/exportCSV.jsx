export function exportCSVFile(arrayOfJson, filename) {
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(arrayOfJson[0])
  let csv = arrayOfJson.map(row => header.map(fieldName => 
  JSON.stringify(row[fieldName], replacer)).join(','))
  csv.unshift(header.join(','))
  csv = csv.join('\r\n')

  // Create link and download
  var link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
  link.setAttribute('download', filename + " tabla");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  }
  
  export function exportAcSc(arrayOfJson, filename) {
    let columnDelimiter = ",",
    lineDelimiter = "\n";
    let ar = [{},{}];


    Object.keys(arrayOfJson).forEach(index => {
      if(arrayOfJson[index].name.indexOf("Master")>=0){
        let s = arrayOfJson[index].name.split(" ")[0];
        ar[0][s] = arrayOfJson[index].value.toString();
      } else {
        let s = arrayOfJson[index].name.split(" ")[0];
        ar[1][s] = arrayOfJson[index].value.toString();
      }
    });
    console.log(ar);
    let keys = ["Asistente","Auxiliar","Instructor","Titular"];
    let header = ["","Asistente","Auxiliar","Instructor","Titular"];

    let csv = ",";
    csv += keys.join(columnDelimiter);
    csv += lineDelimiter;
    let ctr = 0;
    ar.forEach((item,i) => {
      ctr = 0;
      if(i===0)
      csv+="Master,"
      else csv+="Doctor,"
      keys.forEach((key) => {
        if (ctr > 0) {
          csv += columnDelimiter;
        }
        csv += !item[key] ? "0" : item[key];

        ctr++;
      });
      csv += lineDelimiter;
    });

    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
    link.setAttribute('download', filename + " tabla.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }