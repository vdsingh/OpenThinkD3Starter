import { Component, Input, OnInit } from '@angular/core';
import * as d3 from "d3"

@Component({
  selector: 'app-new-visualization',
  templateUrl: './new-visualization.component.html',
  styleUrls: ['./new-visualization.component.css']
})
export class NewVisualizationComponent implements OnInit {
  @Input() posts = [];
  @Input() relations = [];

  constructor() { }

  outermostArr = [];
  
  ngOnInit(): void {
    this.formatData();
    console.log(this.outermostArr);

    var width = 800;
    var height = 800;

    var pack = data => d3.pack()
    .size([width - 2, height - 2])
    .padding(3)
    (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))


    const root = pack(this.outermostArr[0]);

    const svg = d3.select("#visual")
      .attr("viewBox", [0, 0, width, height])
      .style("font", "10px sans-serif")
      .attr("text-anchor", "middle");



    const node = svg.selectAll("g")
    .data(d3.group(root.descendants(), d => d.height))
    .join("g")
    .selectAll("g")
    .data(d => d[1])
    .join("g")
    .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

    var color = d3.scaleSequential([8, 0], d3.interpolateMagma)

    node.append("circle")
      .attr("r", d => d.r)
      .attr("fill", d => color(d.height));

    const leaf = node.filter(d => !d.children);

    leaf.append("text")
      .attr("clip-path", d => d.clipUid)
      .selectAll("tspan")
      .data(d => d.data.title.split(/(?=[A-Z][a-z])|\s+/g))
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d);

    return svg.node();
  }

  formatData(): void{
    //used to keep track of which post objects have already been created
    let created = new Map();
    let posts = new Map();

    for(let i = 0; i < this.posts.length; i++){
      posts.set(this.posts[i]._id, this.posts[i]);
    }

    for(var i = 0; i < this.relations.length; i++){
      var rel = this.relations[i];

      var child;
      if(created.has(rel.post2)){
        child = created.get(rel.post2);
        if(this.outermostArr.includes(child)){
          var elemIndex = this.outermostArr.indexOf(child);
          this.outermostArr.splice(elemIndex, elemIndex + 1);
        }
      }else{
        
        child = posts.get(rel.post2);
        child.children = [];
        child.isChild = true;
        child.value = 1;
  
        console.log("child");
        console.log(child);
        
        created.set(child._id, child);
      }
      
      var parent;
      if(created.has(rel.post1)){
        parent = created.get(rel.post1);
        parent.children.push(child);
      }else{
        parent = posts.get(rel.post1);
        parent.children = [child];
        parent.isChild = false;
        parent.value = 1;

        console.log("parent");
        console.log(parent);

        created.set(parent._id, parent);
        if(!this.outermostArr.includes(parent)) this.outermostArr.push(parent);
      }
      
    }
  }

}
