import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceSelectorComponent } from './choice-selector.component';

describe('ChoiceSelectorComponent', () => {
  let component: ChoiceSelectorComponent;
  let fixture: ComponentFixture<ChoiceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoiceSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
