import { Component } from '@angular/core';
import {Item} from "../../models/items.model";
declare var $:any;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  items: Item []=[
    {id:1, name:"Item1", quantity:5,available:true},
    {id:2, name:"Item2", quantity:5,available:false},
    {id:3, name:"Item3", quantity:5,available:true},
    {id:4, name:"Item4", quantity:5,available:false},
  ];
  confirmDelete(){
    $('#deleteModal').modal('show');

  }
  closeDelete(){
    $('#deleteModal').modal('hide');
  }
  deleteItem(){

    console.log('Item deleted');

    this.closeDelete();


  }
  itemClick(item:Item){
    console.log('item clicked :',item)
  }
}
