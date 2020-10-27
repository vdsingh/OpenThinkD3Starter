import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-visualization',
  templateUrl: './new-visualization.component.html',
  styleUrls: ['./new-visualization.component.css']
})
export class NewVisualizationComponent implements OnInit {
  @Input() posts = [];
  @Input() relations = [];

  constructor() { }

  ngOnInit(): void {
  }

}
