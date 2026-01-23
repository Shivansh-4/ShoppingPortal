import { Component, OnInit } from '@angular/core';
import { dashboardItems, DashboardService } from '../services/dashboard.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, BaseChartDirective, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  dashItem: dashboardItems[] = [];
  filteredDashItem: dashboardItems[] = [];
  totalSpend: number = 0;
  topCategory: string = '';
  colors:string[] = [];
  isFiltered: boolean = false;
  startDate: string | null = null;
  endDate: string | null = null;

  constructor(private dashService: DashboardService) {}

  pieChartType: 'pie' = 'pie'
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };
  filteredPieChartType: 'pie' = 'pie';
  filteredPieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded',
          pointStyleWidth: 20,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white'
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      delay: 500,
    }
  };

  ngOnInit(): void {
    this.dashService.GetData().subscribe(item => {
      this.dashItem = item
      
      this.updateDashboard(item); 
    });
  }

  private generateColor(count: number): string[]{
    this.colors = [];
    for(let i=0;i<count;i++){
      const hue = (360*i)/count;
      this.colors.push(`hsl(${hue}, 65%, 45%)`);
    }
    return this.colors;
  }

  getTopCategory(): string{
    const top = [...this.dashItem].sort((a,b) => b.spend - a.spend)[0];
    return top.category;
  }

  getTotalSpend(): number{
    return this.dashItem.reduce((sum, i) => sum+= i.spend, 0);
  }

  filterDashboard(){

    if(!this.startDate || !this.endDate) return;

    this.dashService.GetFilteredData(this.startDate, this.endDate).subscribe({
      next: (data) => {
        this.filteredDashItem = data;
        this.isFiltered = true;
        this.updateDashboard(data);
      },
      error: (err) => {
        alert("Could not apply any filters");
      }
    });
  }

  get displayedData(){
    return this.isFiltered ? this.filteredPieChartData : this.pieChartData;
  }

  get displayedLabels(){
    return this.isFiltered ? this.filteredDashItem : this.dashItem;
  }

  resetFilter(){
    this.isFiltered = false;
    this.startDate = null,
    this.endDate = null,
    this.filteredDashItem = [];
    this.updateDashboard(this.dashItem);
  }

  updateDashboard(data: dashboardItems[]){
    this.colors = this.generateColor(data.length);

    this.pieChartData = {
      labels: data.map(i => i.category),
      datasets: [{
        data: data.map(i => i.spend),
        backgroundColor: this.colors,
        borderWidth: 2,
        hoverOffset: 10,
        borderColor: '#ffffff'
      }]
    };
  }
}
