import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibaryComponent } from './libary.component';

describe('LibaryComponent', () => {
  let component: LibaryComponent;
  let fixture: ComponentFixture<LibaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
