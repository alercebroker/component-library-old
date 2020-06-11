interface Detection {
    mjd: number;
    magnitude: number;
    upper_error: number;
    lower_error: number;
}

interface NonDetection {
    mjd: number;
    magnitude: number;
}

const plotOptions = {
    grid: {
        left: "7%",
        right: "5%"
      },
    title: {
        text: "Light Curve",
        left: "center",
        textStyle: {
          fontWeight: "lighter"
        }
      },
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#505765"
            }
        },
      },
    toolbox: {
        show: true,
        showTitle: true,
        feature: {
          dataZoom: {
            show: true,
            title: {
              zoom: "Zoom",
              back: "Back"
            },
            icon: {
              zoom:
                "M11,4A7,7 0 0,1 18,11C18,12.5 17.5,14 16.61,15.19L17.42,16H18L23,21L21,23L16,18V17.41L15.19,16.6C12.1,18.92 7.71,18.29 5.39,15.2C3.07,12.11 3.7,7.72 6.79,5.4C8,4.5 9.5,4 11,4M10,7V10H7V12H10V15H12V12H15V10H12V7H10M1,1V8L8,1H1Z",
              back:
                "M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z"
            }
          },
          restore: {
            show: true,
            title: "Restore"
          }
        },
      },
      xAxis: {
        name: "Modified Julian Dates",
        nameLocation: "center",
        scale: true,
        type: "value",
        splitLine: {
          show: false
        },
        nameTextStyle: {
          padding: 7
        }
        },
      yAxis: {
        name: "Magnitude",
        nameLocation: "center",
        type: "value",
        scale: true,
        splitLine: {
          show: false
        },
        inverse: true,
        nameTextStyle: {
          padding: 25
        }
    },
}


export default plotOptions;