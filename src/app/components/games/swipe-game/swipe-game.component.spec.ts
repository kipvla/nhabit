import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeGameComponent } from './swipe-game.component';

describe('SwipeGameComponent', () => {
  let component: SwipeGameComponent;
  let fixture: ComponentFixture<SwipeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwipeGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
