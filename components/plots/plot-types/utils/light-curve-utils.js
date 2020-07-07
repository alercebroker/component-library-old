import {jdToDate} from "../../../utils/AstroDates"
function formatTooltip(params) {
  let colorSpan = color =>
    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
    color +
    '"></span>';
  let colorSpanError = color =>
    ' <span style="display:inline-block;margin-right:5px;;margin-left:2px;border-radius:10px;width:6px;height:6px;background-color:' +
    color +
    '"></span>';
  let rowTable = (col1, col2, col3) =>
    "<tr> <td>" +
    col1 +
    "</td> <td>" +
    col2 +
    "</td> <td>" +
    col3 +
    "</td> </tr>";
  let calendarIcon = color =>
    "<i class='material-icons' style='font-size:13px;color:" +
    color +
    ";'>alarm</i>";
  let serie = params[0].seriesName;
  let table = "<table> <tr> <th></th> <th></th> <th></th></tr>";
  if (serie == "r non-detections" || serie == "g non-detections") {
    table += rowTable(
      colorSpan(params[0].color),
      params[0].seriesName + ":",
      params[0].value[1]
    );
    table += rowTable(
      calendarIcon(params[0].color),
      "MJD: ",
      params[0].value[0]
    );
    table += rowTable(
      calendarIcon(params[0].color),
      "Date: ",
      jdToDate(params[0].value[0])
        .toUTCString()
        .slice(0, -3) + "UT"
    );
    return table + "</table>";
  } else if (serie == "r" || serie == "g") {
    let mag = params[0].value[1].toFixed(3);
    let err = params[0].value[3].toFixed(3);
    table += rowTable("", "candid: ", params[0].value[2]);
    table += rowTable(
      colorSpan(params[0].color),
      params[0].seriesName + ": ",
      mag + "±" + err
    );
    table += rowTable(
      calendarIcon(params[0].color),
      "MJD: ",
      params[0].value[0]
    );
    table += rowTable(
      calendarIcon(params[0].color),
      "Date: ",
      jdToDate(params[0].value[0])
        .toUTCString()
        .slice(0, -3) + "UT"
    );
    table += rowTable("", "click to change stamp", "");
    return table + "</table>";
  }
}

function renderError(params, api) {
  var xValue = api.value(0);
  var highPoint = api.coord([xValue, api.value(1)]);
  var lowPoint = api.coord([xValue, api.value(2)]);
  var halfWidth = api.size([1, 0])[0] * 0.1;
  var style = api.style({
    stroke: api.visual("color"),
    fill: null
  });
  return {
    type: "group",
    children: [
      {
        type: "line",
        shape: {
          x1: highPoint[0] - halfWidth,
          y1: highPoint[1],
          x2: highPoint[0] + halfWidth,
          y2: highPoint[1]
        },
        style: style
      },
      {
        type: "line",
        shape: {
          x1: highPoint[0],
          y1: highPoint[1],
          x2: lowPoint[0],
          y2: lowPoint[1]
        },
        style: style
      },
      {
        type: "line",
        shape: {
          x1: lowPoint[0] - halfWidth,
          y1: lowPoint[1],
          x2: lowPoint[0] + halfWidth,
          y2: lowPoint[1]
        },
        style: style
      }
    ]
  };
}

const bandMap = {
  1: { name: "g", color: "#22d100" },
  2: { name: "r", color: "#ff0000" }
}

export {formatTooltip, renderError, bandMap}