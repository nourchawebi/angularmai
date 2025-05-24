import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsproduitsComponent } from './detailsproduits.component';

describe('DetailsproduitsComponent', () => {
  let component: DetailsproduitsComponent;
  let fixture: ComponentFixture<DetailsproduitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsproduitsComponent]
    });
    fixture = TestBed.createComponent(DetailsproduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
