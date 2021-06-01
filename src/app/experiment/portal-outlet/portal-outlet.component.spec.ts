import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalOutletComponent } from './portal-outlet.component';

describe('PortalOutletComponent', () => {
  let component: PortalOutletComponent;
  let fixture: ComponentFixture<PortalOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortalOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
