import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { D3Service, D3_DIRECTIVES } from './graph-network-visualization/d3';

import { AppComponent } from './app.component';

import { GraphComponent } from './graph-network-visualization/visuals/graph/graph.component';
import { SHARED_VISUALS } from './graph-network-visualization/visuals/shared';
import { NewVisualizationComponent } from './new-visualization/new-visualization.component';

@NgModule({
  declarations: [
    AppComponent,
    SHARED_VISUALS,
    D3_DIRECTIVES,

    GraphComponent,

    NewVisualizationComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
