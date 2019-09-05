import unirest from "unirest";

const utils = {
    requestDataset: (url) => {
        return new Promise((resolve, reject) => {
            unirest.get(url).end(result => resolve(result));
        });
    },
    bindDataToChart: (chartName, data) => {
        return {
            bindto: chartName,
            data: {
                type : 'bar',
                x : 'x',
                columns: data
            },
            axis: {
                x: {
                    type: 'category',
                    tick: {
                        rotate: 65,
                        multiline: false
                    },
                    height: 0
                }
            }
        }
    },
    processChartData: (data) => {
        let processedData = [['x'], ['mass exponential']];
        let chartPos = 1;
        const chartsArr = [];

        switch (true) {
            case data.hasOwnProperty("bodies"):
                console.log(data);
                //use of astronomy data
                //make the process dinamically
                data.bodies.forEach((element) => {
                    const name = `(${element.mass.massValue}) ` + (element.englishName ? element.englishName : element.name);

                    processedData[0].push(name);
                    processedData[1].push(element.mass.massExponent);

                    if (processedData[0].length >  49) {
                        chartsArr.push({name: `chart-${chartPos}`, data: processedData})
                        chartPos++;
                        processedData = [['x'], ['mass exponential']];
                    } 
                });

                console.log(chartsArr);
                break;
            case data.hasOwnProperty("Markets"):
                break;
            default:
                break;
            
        }
        
        return chartsArr;
    },
    handleError: (error) => {
        //TODO it here
        alert(error);
        console.log(error);
    }
}

export default utils;