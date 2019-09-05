import React from "react";
import * as d3 from "d3";

export default function MoreGraphs() {
    const dataArr = [100, 200, 300, 400, 500];

    setTimeout(() => {
        d3.select("#chart")
        .selectAll("div")
        .data(dataArr)
        .enter()
        .append("div")
        .style("width", d => d + "px")
        .text(d => d)
    });

    return <div id="chart"></div>;
} 