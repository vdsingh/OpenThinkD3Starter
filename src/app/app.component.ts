import { Component } from '@angular/core';
import { Node, Link } from './graph-network-visualization/d3';
import { dummyPosts, dummyRelations } from './postDummyData'
import APP_CONFIG from './app.config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];
  posts = [];
  relations = [];
  title = "OpenThink D3 Starter"
  constructor() {
    this.posts = dummyPosts;
    this.relations = dummyRelations;


    this.posts.forEach(e => {
      this.nodes.push(new Node(e));
    })
    

    this.relations.forEach((e, i) => {
      const node1 = this.nodes.find(n => {console.log(n.id); return n.id === e.post1});
      const node2 = this.nodes.find(n => n.id === e.post2);
      node1.linkCount += 20;
      node2.linkCount += 5;
      this.links.push(new Link(node1.id, node2.id));
    })
  }
} 
