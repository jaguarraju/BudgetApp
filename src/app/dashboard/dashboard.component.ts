import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {of } from 'rxjs';
import {first } from 'rxjs/operators';
import { getJSDocThisTag } from 'typescript';
import {financeService} from '../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalIncome: number = 0;
  totalSpending: number = 0;
  totalRemainingBalance: number = 0;
  signRemainingBalance: string = 'remove';

  analyzeMonthInput: number = 3;
  forecastMonthInput: number = 2;

  incomeData : number[] = [];
  spendingData : number[] = [];
  incomeDataForecast : number[] = [];
  spendingDataForecast : number[] = [];

  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] =[];
  lineChartDataForecast: ChartDataSets[] = [];
  lineChartLabelsForecast: Label[] =[];
  
  lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
    scales: {
      yAxes: [{
      ticks:{
        suggestedMin: 0
        }
      }]
    }
  };
  
  lineChartLegend = true;
  lineChartType = 'bar' as ChartType;
  lineChartPlugins = [];

     constructor(private finService : financeService) { } 

  ngOnInit() {
    this.finService.getCummulativeIncome().pipe(first()).subscribe(inc => {
      this.totalIncome = inc;
    });
    this.finService.getCummulativeSpending().pipe(first()).subscribe(inc => {
      this.totalSpending = inc;
    });
    this.finService.getCummulativeBalance().pipe(first()).subscribe(inc => {
      this.totalRemainingBalance = inc;
      if(inc > 0) this.signRemainingBalance = 'add';
    });
    
    this.onSubmitAnalzyse();
    this.onSubmitForecast();
  }

  onSubmitAnalzyse(): void {
    this.lineChartData = [];
    this.finService.getIncomeList(this.analyzeMonthInput).pipe(first()).subscribe(inc => {
      this.incomeData = inc;
      this.lineChartData.push({ data: this.incomeData, label: 'Income', backgroundColor: 'rgba(0,255,0,0.3)', });
      this.finService.getSpendingList(this.analyzeMonthInput).pipe(first()).subscribe(inc => {
        this.spendingData = inc;
        this.lineChartData.push({ data: this.spendingData, label: 'Spending', backgroundColor: 'rgba(255,0,0,0.3)', });
      });
      });
    this.finService.getPastMonthList(this.analyzeMonthInput).pipe(first()).subscribe(inc => {
      this.lineChartLabels = inc;
    });

  }
  onSubmitForecast(): void {
    this.lineChartDataForecast = [];
    this.lineChartLabelsForecast = [];

    this.finService.getIncomeFList(this.forecastMonthInput).pipe(first()).subscribe(inc => {
      this.incomeDataForecast = inc;
      this.lineChartDataForecast.push({ data: this.incomeDataForecast, label: 'Income', backgroundColor: 'rgba(0,255,0,0.3)', });
      this.finService.getSpendingFList(this.forecastMonthInput).pipe(first()).subscribe(inc => {
        this.spendingDataForecast = inc;
        this.lineChartDataForecast.push({ data: this.spendingDataForecast, label: 'Spending', backgroundColor: 'rgba(255,0,0,0.3)', });
      });
          });
    this.finService.getPastMonthFList(this.forecastMonthInput).pipe(first()).subscribe(inc => {
      this.lineChartLabelsForecast = inc;
    });
  }
  
}
