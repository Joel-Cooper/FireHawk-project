import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataItemComponent } from './data-item.component';

describe('DataItemComponent', () => {
  let component: DataItemComponent;
  let fixture: ComponentFixture<DataItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
