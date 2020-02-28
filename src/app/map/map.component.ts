import { Component, OnInit } from '@angular/core';
import L from "leaflet";

export interface AutocompleteOptionGroups {
  title: string;
  count?: number;
  children?: AutocompleteOptionGroups[];
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  isCollapsed = false;

  myIcon = L.icon ({
    iconUrl: '../../assets/africa.svg',
    iconSize: [50,50]
  });

  

  filterItems = 
  [
    {
      id:0,
      image:"../../assets/bed.svg",
      isSelected: true
    },
    {
      id:1,
      image:"../../assets/insurance.svg",
      isSelected: true
    },
    {
      id:2,
      image:"../../assets/monument.svg",
      isSelected: true
    },
    {
      id:3,
      image:"../../assets/restaurant.svg",
      isSelected: true
    },
    {
      id:4,
      image:"../../assets/africa.svg",
      isSelected: true
    }
  ]

   planes = [
		["7C6B07",34.0401499, -4.9985192],
		["7C6B38",34.05146,-5.0130836],
		["7C6CA1",34.05146, -5.0237273],
		];

  

  constructor() {
    
  }

  onChange(value: string): void {
    console.log(value);
  }

  ngOnInit() {
    var mymap = L.map('mapid').setView([34.0395246, -4.9984163], 17);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    this.addSiteOnMap(mymap)
  }

  selectFilterItem(id){
    this.filterItems[id].isSelected = !this.filterItems[id].isSelected;
  }

  addSiteOnMap(map:any){
    for (var i = 0; i < this.planes.length; i++) {
		var	marker = new L.marker([this.planes[i][1],this.planes[i][2]],{icon:this.myIcon})
				.bindPopup(this.planes[i][0])
				.addTo(map);
		}
  }

}
