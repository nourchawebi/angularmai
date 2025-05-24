import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProduitsService} from "../../services/produits.service";

@Component({
  selector: 'app-detailsproduits',
  templateUrl: './detailsproduits.component.html',
  styleUrls: ['./detailsproduits.component.css']
})
export class DetailsproduitsComponent implements  OnInit{
  produit: any;
  produitId:any;
  constructor(private route:ActivatedRoute,private produitService: ProduitsService) {
  }
ngOnInit() {
  this.produitId=this.route.snapshot.paramMap.get('id');
  this.getProduit();
}
getProduit(){
    this.produitService.getPorduitsById(this.produitId).subscribe(
      data=>{
        console.log("produit by id:",data);
        if(Array.isArray(data)&& data.length>0){
          this.produit=data[0];
        }else {
          console.error('aucun produit trouvé')
        }
      },
      error =>{
        console.error('Erreur lors de la récupération du produit', error);
      }
    )
}
}
