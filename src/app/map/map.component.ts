import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import L from "leaflet";
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { NzModalService, NzModalRef } from "ng-zorro-antd/modal";
import { Observable } from "rxjs";
import { IMap } from "../Interface/imap";
import { MapServService } from "../api/map-serv.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";

export interface AutocompleteOptionGroups {
  title: string;
  count?: number;
  children?: AutocompleteOptionGroups[];
}

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  isVisible = false;
  isCollapsed = true;
  Mymap: L.Map;
  // MyIcon = L.icon({
  //   iconUrl: [
  //     "../../assets/bed.svg",
  //     "../../assets/insurance.svg",
  //     "../../assets/monument.svg",
  //     "../../assets/restaurant.svg",
  //     "../../assets/africa.svg"
  //   ],
  //   iconSize: [38, 95],
  //   iconAnchor: [16, 37],
  //   popupAnchor: [0, -28]
  // });
  //markersCluster = new L.layerGroup();

  filterItems = [
    {
      id: 0,
      image: "../../assets/bed.svg",
      isSelected: true,
      type: "hotel",
      iconSize: [30, 30]
    },
    {
      id: 1,
      image: "../../assets/insurance.svg",
      isSelected: true,
      type: "pharmacie",
      iconSize: [30, 30]
    },
    {
      id: 2,
      image: "../../assets/monument.svg",
      isSelected: true,
      type: "Monument historique",
      iconSize: [30, 30]
    },
    {
      id: 3,
      image: "../../assets/restaurant.svg",
      isSelected: true,
      type: "cafe",
      iconSize: [30, 30]
    },
    {
      id: 4,
      image: "../../assets/africa.svg",
      isSelected: true,
      type: "africa",
      iconSize: [30, 30]
    }
  ];

  tplModal: NzModalRef;
  tplModalButtonLoading = false;
  htmlModalVisible = false;
  disabled = false;

  @Input() descrip: string;
  @Input() imgMar;
  @Input() MarkerName: string;
  @Input() URL: string = "https://df6c81ef.ngrok.io/";

  //consomation api-------Post

  IFmap: IMap[];
  nom: AbstractControl;
  adresse: AbstractControl;
  description: AbstractControl;
  ville: AbstractControl;
  pays: AbstractControl;
  type: AbstractControl;
  latitude: AbstractControl;
  longitude: AbstractControl;
  image: AbstractControl;
  formGp: FormGroup;
  constructor(
    private seMap: MapServService,
    private Servmodal: NzModalService,
    private fb: FormBuilder
  ) {
    this.formGp = this.fb.group({
      nom: ["", [Validators.required]],
      adresse: ["", [Validators.required]],
      description: ["", [Validators.required]],
      ville: ["", [Validators.required]],
      pays: ["", [Validators.required]],
      type: ["", [Validators.required]],
      latitude: ["", [Validators.required]],
      longitude: ["", [Validators.required]],
      image: ["", [Validators.required]]
    });
    this.nom = this.formGp.controls.nom;
    this.adresse = this.formGp.controls.adresse;
    this.description = this.formGp.controls.description;
    this.ville = this.formGp.controls.ville;
    this.pays = this.formGp.controls.pays;
    this.type = this.formGp.controls.type;
    this.latitude = this.formGp.controls.latitude;
    this.longitude = this.formGp.controls.longitude;
    this.image = this.formGp.controls.image;
  }
   SentItem() {
     this.seMap.ajouSite(this.formGp.value).subscribe(resp => {
       console.log(resp);
     });
   }

  
  leafletMap() {
    this.Mymap = L.map("mapid").setView([34.0395246, -4.9984163], 17);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.Mymap);
  }
  ngOnInit() {
    this.leafletMap();
    this.addSiteOnMap();
  }

  selectFilterItem(id) {
    this.filterItems[id].isSelected = !this.filterItems[id].isSelected;
  }

  //------affichage tous les markers avec son icon--//

  addSiteOnMap() {

    this.seMap.getAllData().subscribe(resp => {
      console.log(resp);
      this.IFmap = resp["data"];

      for (let crod of this.IFmap) {
        console.log(crod);
 

        //----------------//
        switch (crod.type) {
          case "pharmacie":
              var MyIcon = L.icon({
                iconUrl: "../../assets/insurance.svg",
                iconSize: [30, 30]
              });
            var marker = new L.marker(
              [crod.latitude, crod.longitude],

              { icon: MyIcon }
            )
              .addTo(this.Mymap)
              .on("click", () => {
                this.showModal();
                this.MarkerName = crod.nom;
                this.descrip = crod.description;
                this.imgMar = this.URL + crod.image;
              });
            break;
          case "hotel":
            {
              var MyIcon = L.icon({
                iconUrl: "../../assets/bed.svg",
                iconSize: [30, 30]
              });
            }
            var marker = new L.marker(
              [crod.latitude, crod.longitude],

              { icon: MyIcon }
            )
              .addTo(this.Mymap)
              .on("click", () => {
                this.showModal();
                this.MarkerName = crod.nom;
                this.descrip = crod.description;
                this.imgMar = this.URL + crod.image;
              });
            break;
          case "monument historique":
            
              var MyIcon = L.icon({
                iconUrl: "../../assets/monument.svg",
                iconSize: [30, 30]
              });
            
            var marker = new L.marker(
              [crod.latitude, crod.longitude],

              { icon: MyIcon }
            )
              .addTo(this.Mymap)
              .on("click", () => {
                this.showModal();
                this.MarkerName = crod.nom;
                this.descrip = crod.description;
                this.imgMar = this.URL + crod.image;
              });
            break;
          case "cafe":
            
              var MyIcon = L.icon({
                iconUrl: "../../assets/restaurant.svg",
                iconSize: [30, 30]
              });
            
            var marker = new L.marker(
              [crod.latitude, crod.longitude],

              { icon: MyIcon }
            )
              .addTo(this.Mymap)
              .on("click", () => {
                this.showModal();
                this.MarkerName = crod.nom;
                this.descrip = crod.description;
                this.imgMar = this.URL + crod.image;
              });
            break;
          case "africa":
            
              var MyIcon = L.icon({
                iconUrl: "../../assets/africa.svg",
                iconSize: [30, 30]
              });
            
            var marker = new L.marker(
              [crod.latitude, crod.longitude],

              { icon: MyIcon }
            )
              .addTo(this.Mymap)
              .on("click", () => {
                this.showModal();
                this.MarkerName = crod.nom;
                this.descrip = crod.description;
                this.imgMar = this.URL + crod.image;
              });

            break;
        } //---- end switch----//
      } // --- end for ---//
    });
  }

  //----------------affichage par button les marker avec son icon---------//
  // markerList = [];
  // selectEntity(id, type) {
  //   this.filterItems[id].isSelected = !this.filterItems[id].isSelected;
  //   console.log(type);
  //   this.seMap.getEntity(type).subscribe(AllDon => {
  //     console.log(AllDon);
  //     this.IFmap = AllDon["data"];

  //     for (let cordni of this.IFmap) {
  //       for (let item of this.filterItems) {
  //         if (item.type === type) {

  //           var icons = L.icon({ iconUrl: item.image, iconSize: [30, 30] });
  //           console.log(icons);
  //           var marker = new L.marker(
  //             [cordni.latitude, cordni.longitude],

  //             { icon: icons }
  //           );
  //           this.markerList.push(marker);
  //           this.markersCluster.addLayer(marker);

  //           if (item.isSelected === true) {
  //             this.Mymap.addLayer(this.markersCluster).on("click", () => {
  //               this.showModal();
  //               this.MarkerName = cordni.nom;
  //               this.descrip = cordni.description;
  //               this.imgMar = this.URL + cordni.image;
  //             });
  //           } else {
  //             this.Mymap.removeLayer(this.markersCluster);
  //           }
  //         } //---end if-----
  //       } //----end --for 2 ----//
  //     } //---end --- for 1----//
  //   });
  // }

  //------controle button-------//

  // filtreButton(selectedValue) {
  //   console.log(selectedValue);
  //   this.seMap.getEntity(selectedValue).subscribe(AllDon => {
  //     console.log(AllDon);
  //     this.IFmap = AllDon["data"];

  //     for (let cordni of this.IFmap) {
  //       for (let item of this.filterItems) {
  //         if (item.type === selectedValue) {
  //           var icons = L.icon({ iconUrl: item.image, iconSize: [30, 30] });
  //           console.log(icons);
  //           var marker = new L.marker(
  //             [cordni.latitude, cordni.longitude],

  //             { icon: icons }
  //           )
  //             .addTo(this.Mymap)
  //             .on("click", () => {
  //               this.showModal();
  //               this.MarkerName = cordni.nom;
  //               this.descrip = cordni.description;
  //               this.imgMar = cordni.image;
  //             });
  //         } //---end if-----
  //       } //----end --for 2 ----//
  //     } //---end --- for 1----//
  //   });
  // }

  //----------end------------------//

  //----------modal ajout element--------//
  createTplModal(
    tplTitle: TemplateRef<{}>,
    tplContent: TemplateRef<{}>,
    tplFooter: TemplateRef<{}>
  ): void {
    this.tplModal = this.Servmodal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzWidth: "400",
      nzClosable: false,
      nzOnOk: () => console.log("Click ok")
    });
  }

  destroyTplModal(): void {
    this.tplModalButtonLoading = true;
    setTimeout(() => {
      this.tplModalButtonLoading = false;
      this.tplModal.destroy();
    });
  }
  //  selectFile = null;
  //  onFileChanged(event) {
  //    this.selectFile = event.target.files[0];
  //    console.log(this.selectFile)
  //  }

  handleUpload = (item: any) => {
    const status = item.status;
    console.log('uploading image...');
    if(status != 'uploading')
    console.log(item);
    if(status ==='done'){
      console.log('is upload')
    }else{
      console.log('not upload')
    }
  }

  defaultFileList = [{}];
  fileList = [this.defaultFileList];

  //---------------end modal--------------//

  //------------show modal marker-----------//

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log("Button ok clicked!");
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }
  // ------end show--------//
}
