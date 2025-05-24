import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderfooterComponent} from "./headerfooter/headerfooter.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {AjoutproduitComponent} from "./pages/ajoutproduit/ajoutproduit.component";
import {ProduitsComponent} from "./pages/produits/produits.component";
import {ModalComponent} from "./pages/modal/modal.component";
import {DetailsproduitsComponent} from "./pages/detailsproduits/detailsproduits.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {UnauthorizedComponent} from "./pages/unauthorized/unauthorized.component";
import {authGuard, authGuardadmin} from "./services/auth.guard";

const routes: Routes = [

  {path:'acceuil', component:HeaderfooterComponent,
    children:[
      {path:'', component:HomeComponent,canActivate:[authGuard]},
      {path:'users',component:UsersComponent,canActivate:[authGuard]},

      {path:'ajoutproduit', component:AjoutproduitComponent,canActivate:[authGuard]},
      {path:'produits', component:ProduitsComponent,canActivate:[authGuard]},
      {path:'produit/:id',component: DetailsproduitsComponent,canActivate:[authGuard]}
    ]
  },
  {path:'modal',component:ModalComponent},
  {path:'login', component:LoginComponent},
  {path:'admin',component:AdminComponent, canActivate:[authGuardadmin]},
  {path:'unauthorized',component:UnauthorizedComponent},
  {path:'', redirectTo:'acceuil',pathMatch:"full"},
  {path:'**', redirectTo:'acceuil'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
