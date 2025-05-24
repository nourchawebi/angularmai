import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProduitsService} from "../../services/produits.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modifierproduit',
  templateUrl: './modifierproduit.component.html',
  styleUrls: ['./modifierproduit.component.css']
})
export class ModifierproduitComponent  implements OnInit{
  produit:any;
  produitForm:FormGroup;
  constructor(
    private produitsService: ProduitsService,
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<ModifierproduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.produit= data.produit;
    this.produitForm = this.formBuilder.group({
      idProduit:[this.produit.idProduit,Validators.required],
      libelle: [this.produit.libelle, Validators.required],
      description: [this.produit.description, Validators.required],
      prixHC: [this.produit. prixHC, Validators.required],
      prixHT: [this.produit.prixHT, Validators.required],
      tva: [this.produit.tva, Validators.required],
      marque: [this.produit.marque, Validators.required],
      etat: [this.produit.etat, Validators.required],
      livraisonGratuite: [this.produit.livraisonGratuite, Validators.required],

    })
  }
ngOnInit() {
    this.initializeForm();
}
initializeForm(){
  this.produitForm = this.formBuilder.group({
    idProduit:[this.produit.idProduit,Validators.required],
    libelle: [this.produit.libelle, Validators.required],
    description: [this.produit.description, Validators.required],
    prixHC: [this.produit. prixHC, Validators.required],
    prixHT: [this.produit.prixHT, Validators.required],
    tva: [this.produit.tva, Validators.required],
    marque: [this.produit.marque, Validators.required],
    etat: [this.produit.etat, Validators.required],
    livraisonGratuite: [this.produit.livraisonGratuite, Validators.required],

  })
}
onNoClick(){
    this.dialogRef.close();
}
@Output() update= new EventEmitter<any>();
  onSubmit(){
    if(this.produitForm.valid){
      const produitData=this.produitForm.value;
      this.updateProduit(this.produit.idProduit,produitData)
    }
  }
  error:string='';
  updateProduit(id:number,produitData:any){
    this.produitsService.updateProduit(id,produitData)
      .subscribe({
        next:(u)=>{
          this.error="";

          this.update.emit(produitData);
          Swal.fire({
            icon:'success',
            title:'modifier',
            text:'Produit modifieé avec succès'
          });
          this.dialogRef.close();
        },
        error:(error)=>{
          this.error=error.error;
          console.error(this.error);
        }
      })
  }
}
