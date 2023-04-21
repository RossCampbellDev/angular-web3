import { Component } from '@angular/core';
import axios from "axios";
import { response } from 'express';

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
  population = -1;

  async ngOnInit() {
    await this.getPerson(0);
    await this.getPopulation();
    await this.newPerson("charlie", 30);
  }

  async getPerson(_n: number) {
    const { data } = await axios(`http://localhost:3001/getPerson/${_n}`);
    this.name = data[1];
    this.age = data[2];
    this.wallet = data[3];
  }

  async getPopulation() {
    const { data } = await axios(`http://localhost:3001/getPopulation`);
    this.population = Number(data)+1;
  }

  async newPerson(name: string, age: number) {
    await axios.post(`http://localhost:3001/newPerson`, {
      params: {
        _name: name,
        _age: age
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }
}
