import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGirlComponent } from './table-girl.component';

describe('TableGirlComponent', () => {
  let component: TableGirlComponent;
  let fixture: ComponentFixture<TableGirlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableGirlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGirlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
