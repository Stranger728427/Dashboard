import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../../style/tooltip.css'
const BarChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const x = d3.scaleBand()
      .domain(data.map(d => d.topic))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)]).nice()
      .range([height - margin.bottom, margin.top]);

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', '#f4f4f4')
      .style('padding', '5px 10px')
      .style('border', '1px solid #ddd')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.topic))
      .attr('y', d => y(d.intensity))
      .attr('height', d => y(0) - y(d.intensity))
      .attr('width', x.bandwidth())
      .on('mouseover', function (event, d) {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`Year: ${d.year}<br>Intensity: ${d.intensity}<br>Sector: ${d.sector}`)
          .style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 28) + 'px');
        d3.select(this).attr('fill', 'orange');
      })
      .on('mouseout', function (d) {
        tooltip.transition().duration(500).style('opacity', 0);
        d3.select(this).attr('fill', 'steelblue');
      });

    return () => tooltip.remove();
  }, [data]);

  return (
    <svg ref={ref} width={800} height={400}></svg>
  );
};

export default BarChart;
