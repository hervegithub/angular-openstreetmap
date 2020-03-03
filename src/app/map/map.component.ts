import { Component, OnInit, Input } from '@angular/core';
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
  
  isVisible = false;
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
      isSelected: true,
      iconSize: [30,30]
    },
    {
      id:1,
      image:"../../assets/insurance.svg",
      isSelected: true,
      iconSize: [30,30]
    },
    {
      id:2,
      image:"../../assets/monument.svg",
      isSelected: true,
      iconSize: [30,30]
    },
    {
      id:3,
      image:"../../assets/restaurant.svg",
      isSelected: true,
      iconSize: [30,30]
    },
    {
      id:4,
      image:"../../assets/africa.svg",
      isSelected: true,
      iconSize: [30,30]
    }
  ]

   planes = [
		["7C6B07",34.0401499, -4.9985192,"../../assets/africa.svg"],
		["7C6B38",34.05146,-5.0130836,"../../assets/africa.svg"],
		["7C6CA1",34.05146, -5.0237273,"../../assets/africa.svg"],
		];

    @Input() title: string = "achraf";
  @Input() imgMar = "../../assets/monument.svg";

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
    this.addSiteOnMap(mymap);
   
  }

  selectFilterItem(id){
    this.filterItems[id].isSelected = !this.filterItems[id].isSelected;
  }

  addSiteOnMap(map:any){
     for (var i = 0; i < this.planes.length; i++) {
     var	marker = new L.marker([this.planes[i][1],this.planes[i][2]],{icon:this.myIcon}).addTo(map).on('click', ()=>{
        this.showModal();
         this.title;
         this.imgMar;
     });
    }
  }


  

  showModal(): void {
    this.isVisible = true;
   
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


}
