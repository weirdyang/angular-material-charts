import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Label, MultiDataSet } from 'ng2-charts';


@Component({
  selector: 'cd-order-doughnut-chart',
  templateUrl: './order-doughnut-chart.component.html',
  styleUrls: ['./order-doughnut-chart.component.scss']
})

export class OrderDoughnutChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  public doughnutChartLabels: Label[] = ['No Production', 'Good Products Time', 'Downtime', 'Planned Downtime'];
  public doughnutChartData: MultiDataSet = [
    [0, 0, 0, 0],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {
    title: {
      text: "0.00%"
    },
    responsive: true,
  }
  public OEECalculation: number = 0.00;
  public doughnutChartPlugins = [{
    beforeDraw: function (chart: Chart) {
      const width = chart.width ?? 10;
      const height = chart.height ?? 10;
      const ctx = chart.ctx ?? new CanvasRenderingContext2D();
      ctx?.restore();
      var fontSize = (height / 200).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";

      let text: string = 'doughnut';
      const data = chart.data;
      const sets = data.datasets as Array<ChartDataSets>;
      const first = sets[0].data as Array<string>;
      const title = chart.options.title;
      const labels = data.labels as Array<string>;
      if (labels.length > 0) {
        text = first[0] ?? labels[0];
      }
      text = title?.text?.toString() as string;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;
      const oeeLabel = "OEE";
      const oeeX = Math.round((width - ctx.measureText(text).width) / 2);
      const oeeY = height / 2 * 1.2;
      ctx.fillText(text, textX, textY);
      ctx.fillText(oeeLabel, oeeX, oeeY);
      ctx.save();
    }
  }];
  constructor() { }
  ngOnInit() {
    this.doughnutChartData = [
      [
        +Math.random().toFixed(2) * 20,
        +Math.random().toFixed(2) * 50,
        +Math.random().toFixed(2) * 20,
        +Math.random().toFixed(2) * 20]];
    setInterval(() => {
      this.doughnutChartData = [
        [
          +Math.random().toFixed(2) * 20,
          +Math.random().toFixed(2) * 50,
          +Math.random().toFixed(2) * 20,
          +Math.random().toFixed(2) * 20]];
      this.calculateOEE();
    }, 10000);
  };

  calculateOEE() {
    this.doughnutChartOptions = {
      title: {
        text: `${+(Math.random() * 100).toFixed(2)}%`
      },
      responsive: true,
    }
  }
}
