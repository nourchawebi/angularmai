import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutproduitComponent } from './ajoutproduit.component';

describe('AjoutproduitComponent', () => {
  let component: AjoutproduitComponent;
  let fixture: ComponentFixture<AjoutproduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutproduitComponent]
    });
    fixture = TestBed.createComponent(AjoutproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
