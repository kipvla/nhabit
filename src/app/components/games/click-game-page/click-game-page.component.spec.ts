import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickGamePageComponent } from './click-game-page.component';

describe('ClickGamePageComponent', () => {
  let component: ClickGamePageComponent;
  let fixture: ComponentFixture<ClickGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickGamePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
