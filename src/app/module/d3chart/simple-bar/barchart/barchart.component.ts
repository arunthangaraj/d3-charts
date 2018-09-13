import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import * as $_ from 'jquery';
import * as _ from 'underscore';
import * as moment_ from 'moment';

 const moment = moment_;
 const $  = $_;
 declare var Math: any;
@Component({
  selector: 'd3-bar-component',
  template: `<div  id="contractSpentBar" style="width:100%; height:300px;">
  </div>`
})
export class BarchartComponent implements OnInit, OnChanges {
  @Input() data: any;
  graphArr: any;
  newInput: any;
  constructor() {
    this.graphArr = [];
    this.newInput = [];
   }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!_.isEmpty(this.data)) {
      this.drawBarChart();
    }
  }



  drawBarChart() {

    const tooltip = d3.select('body').append('div')
      .attr('id', 'toolTipContractBar');

    $('#toolTipContractBar').css('backgroundColor', '#eeeeef');
    $('#toolTipContractBar').css('bordeRadius', '5px');
    $('#toolTipContractBar').css('width', 'auto');
    $('#toolTipContractBar').css('height', 'auto');
    $('#toolTipContractBar').css('textAlign', 'center');
    $('#toolTipContractBar').css('position', 'absolute');
    $('#toolTipContractBar').css('padding', '5px');

    const zoomReset = d3.select('.graphShowAllBtn');
    const margin = {
      top: 20,
      right: 10,
      bottom: 30,
      left: 70
    };
    const parseTime = d3.timeParse('%Y-%m-%d');
      const data  = _.map(this.data,(data) => {
        return {
          value: data.value,
          date: parseTime(data.date),
          color: data.color
        };
      });


    setTimeout(() => {
      d3.selectAll('svg.contractSpentBar').remove();
      const svg = d3.select('#contractSpentBar').append('svg')
        .attr('class', 'contractSpentBar')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '0 0 ' + ($('#contractSpentBar').width()) + ' ' +
          ($('#contractSpentBar').height()));

      const g = svg.append('g')
        .attr('class', 'gChart')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      const width = $('#contractSpentBar').width() - margin.left - margin.right,
        height = $('#contractSpentBar').height() - margin.top - margin.bottom;



      const minY = d3.min([data], function (d) {
        return d3.min(d, function (e) {
          return e.value;
        });
      });
      const maxY = d3.max([data], function (d) {
        return d3.max(d, function (e) {
          return Math.max(e.value);
        });
      });


      const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 1.2 * maxY]);

      const xBand = d3.scaleBand()
        .range([0, width])
        .padding(0.3);

      const x = d3.scaleTime().range([0, width]);

      const xAxis = d3.axisBottom(xBand)
        .ticks(d3.timeMonth, 1)
        .tickFormat(d3.timeFormat('%b'))
        .tickSize(5)
        .tickPadding(10),

        yAxis = d3.axisLeft(y)
          .ticks(5)
          .tickSize(5)
          .tickPadding(10);


      const clip = g.append('defs').append('svg:clipPath')
        .attr('id', 'clip')
        .append('svg:rect')
        .attr('width', width)
        .attr('height', height)
        .attr('x', 0)
        .attr('y', 0);

      x.domain(d3.extent(data, function (d) { return d.date; }));
      xBand.domain(data.map(function (d) { return d.date; }));

      const brush = d3.brush().extent([
        [0, 0],
        [width, height]
      ]).on('end', brushended),
        idleDelay = 350;

      const scatter = g.append('g')
        .attr('id', 'scatterplot')
        .attr('clip-path', 'url(#clip)');

      scatter.append('g')
        .attr('class', 'brush')
        .call(brush);


      const bar = scatter.selectAll('.barSpent')
        .data(data);
      function rectangle(x, y, width, height, radius) {
        return 'M' + (x + radius) + ',' + y + 'h' + 
        (width - 2 * radius) + 'a' + radius + ',' + radius +
         ' 0 0 1 ' + radius + ',' + radius + 'v' + (height - 2 * radius)
         + 'v' + radius + 'h' + -radius + 'h' + (2 * radius - width) + 'h'
         + -radius + 'v' + -radius + 'v' + (2 * radius - height) + 'a' + radius + ','
          + radius + ' 0 0 1 ' + radius + ',' + -radius + 'z';
      }

      const dots = bar.enter().append('path')
        .attr('class', 'barSpent');

      dots
        .style('fill', function (d) {
          return _.isEmpty(d.color) ? '#FF5E5E' : d.color ;
        })
        .attr('d',  (d, i) => {
          this.graphArr.push({ 'date': d.date, 'value': y(d.value) });
          return rectangle(xBand(d.date), y(d.value), xBand.bandwidth(), height, 12);
        });

      dots.on('mouseover', (d) => {
        tooltip.transition()
          .duration(100)
          .style('opacity', 0.9);
        tooltip
          .style('left', `${d3.event.pageX + 2}px`)
          .style('top', `${d3.event.pageY - 18}px`)
          .html((d3.timeFormat('%b')((d.date))) + '<br> Spent: ' + '£' + ((d.value).toFixed(2)));
      })
        .on('mouseout', () => {
          tooltip.transition()
            .duration(400)
            .style('opacity', 0);
        });


      const monthParse = parseTime(moment().utc().startOf('month').format('YYYY-MM-DD'));

      
      // x axis
      g.append('g')
        .attr('class', 'xaxisContractBar')
        .attr('id', 'axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

      // y axis
      g.append('g')
        .attr('class', 'yaxisContractBar')
        .attr('id', 'axis--y')
        .call(yAxis);

      let flag;

      function brushended() {
        const s = d3.event.selection;
        if (!s) {
          // if (!idleTimeout) {
          //   return idleTimeout = setTimeout(idled, idleDelay);
          // }
          flag = 0;
          zoomReset.style('opacity', 0);
          x.domain(d3.extent(data, function (d) { return d.date; }));
          y.domain([0, maxY * 1.2]);
          xBand.domain(data.map(function (d) { return d.date; }));
        } else {
          flag = 1;
          zoomReset.style('opacity', 1);
          let brushArea;
          if (s === null) {
            brushArea = xBand.range();
          }

          xBand.domain().forEach( (d) => {
            const pos = xBand(d) + xBand.bandwidth() / 2;
            if (pos >= s[0][0] && pos <= s[1][0]) {
              this.newInput.push(d);
            }
          });

          // x.domain([s[0][0], s[1][0]].map(x.invert, x));
          xBand.domain(this.newInput);
          // y.domain([s[1][1], s[0][1]].map(y.invert, y));
          scatter.select('.brush').call(brush.move, null);
        }


      }

      d3.select('.graphShowAllBtn').on('click', () => {
        x.domain(d3.extent(data, function (d) { return d.date; }));
        y.domain([0, maxY * 1.2]);
        xBand.domain(data.map(function (d) { return d.date; }));
        zoomReset.style('opacity', 0);
      });



    }, 500);
  }

}
