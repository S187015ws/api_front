import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-cd',
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.scss']
})
export class CdComponent implements OnInit {

  cds: Object;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getCdlists().subscribe(data=>{
      this.cds = data
      console.log(this.cds)
    })
  }

}
