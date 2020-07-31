/* based in https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable */
function download(data) {
  let arrayOfJson = data.detections
  const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
  const header = Object.keys(arrayOfJson[0])
  let csv = arrayOfJson.map(row =>
    header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(","))
  csv.unshift(header.join(","))
  csv = csv.join("\r\n")
  // Create link and download
  var link = document.createElement("a")
  link.setAttribute(
    "href",
    "data:text/csv;charset=utf-8,%EF%BB%BF" +
    encodeURIComponent(csv)
  );
  let today = new Date().toISOString()
  let filename =
    this.$store.state.results.selectedObject.oid +
    "_" +
    today +
    ".csv";
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default { download }