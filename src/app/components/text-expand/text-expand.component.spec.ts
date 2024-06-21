import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextExpandComponent } from './text-expand.component';

describe('TextExpandComponent', () => {
  let component: TextExpandComponent;
  let fixture: ComponentFixture<TextExpandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextExpandComponent]
    });
    fixture = TestBed.createComponent(TextExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
