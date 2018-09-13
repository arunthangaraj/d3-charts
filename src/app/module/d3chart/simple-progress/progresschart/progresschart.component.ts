import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter} from '@angular/core';

import * as d3 from 'd3';
import {_} from 'underscore';
@Component({
    selector: 'd3-progress-component',
    template: `<div class="d3-progress-hhbill"></div>`,
})

export class ProgresschartComponent implements OnInit, OnChanges {
    @Input() progressModel: {
      data: number,
      color?: string
    };

    ngOnInit() {
    }

    ngOnChanges() {
      if (!_.isEmpty(this.progressModel)) {
        this.buildProgressBar(this.progressModel.data);
      }
    }


    buildProgressBar(progressValue) {
      const instance = this;
         d3.select('.progressChart').remove();
         const color = this.progressModel.color;
     const options = {
        className: '.d3-progress-hhbill',
        height: 35,
        width: 320,
        progressStartWidth: 0,
        progressEndWidth: (progressValue > 100) ? (100) : (progressValue),
        progressText : progressValue,
        barColor: (_.isEmpty(color) ? '#5FE3A1' : color),
        progressColor: '#AFEEEE',
        animationDuration: 500
      };
      const cScale = d3.scaleLinear().range([0, 300]).domain([0, 100]);
      const cScale1 = d3.scaleLinear().range([10, 80]).domain([61, 80]);
      const cScale2 = d3.scaleLinear().range([10, 60]).domain([81, 100]);
      function renderProgressBar(options) {
        const progress = d3.select(options.className)
          .append('svg')
          .attr('class', 'progressChart')
          .attr('transform', 'translate(0,0)')
          .attr('preserveAspectRatio', 'xMinYMin meet')
          .attr('viewBox', '0 0 ' + (350) + ' ' + (options.height));
        progress.append('rect')
          .attr('class', 'progressBar')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', options.width)
          .attr('height', options.height)
          .style('fill', '#eee');
        animateProgressBar(progress, options);
        return progress;
      }
      function animateProgressBar(element, options) {
        const data = [instance.progressModel.data];
        d3.selectAll(options.className + ' .progress').remove();
        d3.selectAll(options.className + ' text').remove();
          d3.select('.progress2').remove();
          element.append('rect')
            .attr('class', 'progress1')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', options.height)
            .style('fill', options.barColor)
            .attr('width', 0)
            .transition()
            .duration(options.animationDuration)
            .attr('width', cScale(options.progressEndWidth))
            .on('end', function () {
              element.selectAll('.valueText')
                .data(data)
                .enter().append('text')
                .attr('class', 'valueText')
                .style('fill', '#495664')
                .style('font-size', '10px')
                /* .attr('y',options.height) */
                .text(options.progressText + '%')
                .attr('x', 0)
                .attr('y', 15)
               .attr('dx', function () {
                return (cScale(options.progressEndWidth) - 5);
            })
                .attr('dy', '.75em') // vertical-align: middle
                .attr('text-anchor', 'end'); //
            });
      }
      const _progress = renderProgressBar(options);
    }
}
