import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresschartComponent } from './progresschart.component';

describe('ProgresschartComponent', () => {
  let component: ProgresschartComponent;
  let fixture: ComponentFixture<ProgresschartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgresschartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresschartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
