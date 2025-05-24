import {Component, OnInit} from '@angular/core';
import {ProduitsService} from "../../services/produits.service";
import {PageEvent} from "@angular/material/paginator";
import Swal from "sweetalert2";
import {MatDialog} from "@angular/material/dialog";
import {ModifierproduitComponent} from "../modifierproduit/modifierproduit.component";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent  implements OnInit {
  constructor(private productService: ProduitsService, public dialog:MatDialog) {
  }

  message: string = '';
  public produits: any = [];
  filtredproduits: any = [];

  getProducts() {
    this.productService.getAllProduits().subscribe({
      next: (response) => {
        this.message = "success";
        this.produits = this.filtredproduits = response;
        this.paginateReclamations();
      }
    })
  }

  ngOnInit() {
    this.getProducts()
  }

  paginatedReclamations: any = [];
  pageSize = 3;
  currentPage = 0;

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateReclamations();
  }

  paginateReclamations() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedReclamations = this.filtredproduits.slice(startIndex, endIndex);
  }

  OndeleteReclamation(id: number | undefined) {
    if (id != null) {
      Swal.fire({
        title: 'étes-vous sur?',
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduit(id).subscribe(
            data => {
              Swal.fire('Supprimé!', 'Votre produit a été supprimé.', 'success');

              this.getProducts()
            }
          )
        }
      })
    }

  }

  selectetat: string = 'ALL';

  filterproducts() {
    if (this.selectetat !== undefined && this.selectetat != null && this.selectetat != 'ALL') {
      const selectdEtatNumber = Number(this.selectetat)
      this.filtredproduits = this.produits.filter((produit: any) => produit.etat === selectdEtatNumber);
    } else {
      this.getProducts()
    }
    this.paginateReclamations();
  }


  searchKeyword: string = '';

  searchProduits() {
    if (this.searchKeyword) {
      this.filtredproduits = this.filtredproduits.filter((produit: any) =>
        produit.libelle.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        produit.marque.toLowerCase().includes(this.searchKeyword.toLowerCase())
      )


    }else {
      this.filtredproduits=this.produits;
    }
    this.paginateReclamations();
  }
  selectedProduit:any;
  openDialog(produit: any){
    this.selectedProduit=produit;
    const dialogRef=this.dialog.open(
      ModifierproduitComponent,
      {width:'auto',
        data:{produit:this.selectedProduit}
      }
    );
    dialogRef.componentInstance.update.subscribe((updateproduit:any)=>{
      const index=this.produits.findIndex((item:any)=> item.idProduit===updateproduit.idProduit);

if(index!== -1)  {
  this.produits[index].libelle=updateproduit.libelle;
  this.produits[index].description=updateproduit.description;
  this.produits[index].marque=updateproduit.marque;
  this.filtredproduits=this.produits;
}  })
this.paginateReclamations();
  }
}
