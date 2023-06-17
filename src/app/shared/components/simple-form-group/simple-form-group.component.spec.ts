import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleFormGroupComponent } from './simple-form-group.component';

describe('SimpleFormGroupComponent', () => {
  let component: SimpleFormGroupComponent;
  let fixture: ComponentFixture<SimpleFormGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleFormGroupComponent]
    });
    fixture = TestBed.createComponent(SimpleFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
