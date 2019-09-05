import React, { useState } from 'react';
import utils from './../../utils';
import c3 from "c3";
import d3 from "d3";
import D3 from "./D3";

export default function Content(props) {
    const url = "https://api.le-systeme-solaire.net/rest/bodies/";
    // const url = " https://www.worldcoinindex.com/apiservice/json?key=R9p0clFijdB6S3sSYr5me4W7c5Ek5X";
    const [charts, setCharts] = useState([]);

    const generateGraph = (graphs) => {
        graphs.forEach((element) => {
            const chartObj = utils.bindDataToChart(`#${element.name}`, element.data);

            return c3.generate(chartObj);
        });
    };
    
    const callData = () => {
        utils.requestDataset(url)
        .then(response => response.error ? utils.handleError(response.error) : utils.processChartData(response.body)).then((result) => {
            if (result) {
                setCharts(result);
            }
        });
    }

    const renderStuff = () => {
        if (!charts.length) {
            callData();
        }

        //delay the graph generator till the charts ar drawn
        setTimeout(() => {
            generateGraph(charts);
        });
        
        return charts.map((element, index) => {return (<div key={index} id={element.name}></div>)});
    };

    const elementToRender = props.context.pageRef === 0 ? renderStuff() : <D3 />;

    return elementToRender;
}