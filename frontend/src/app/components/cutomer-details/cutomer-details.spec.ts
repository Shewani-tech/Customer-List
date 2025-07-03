import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerDetails } from './cutomer-details';

describe('CutomerDetails', () => {
  let component: CutomerDetails;
  let fixture: ComponentFixture<CutomerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutomerDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutomerDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
