import { Component, OnInit } from '@angular/core';
import { dashboardItems, DashboardService } from '../services/dashboard.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  dashItem: dashboardItems[] = [];

  constructor(private dashService: DashboardService) {}

  ngOnInit(): void {
    this.dashService.GetData().subscribe(data => {
      this.dashItem = data;
    });
  }

}
