import { Component } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
  constructor() {
    console.log("TO CUNSTRUCT");
  }

  name = "";
  age = 0;
  wallet = "";

  async ngOnInit() {
    const { data } = await axios(`http://localhost:3001/getPerson`);
    this.name = data[1];
    this.age = data[2];
    this.wallet = data[3];
  }
}
