import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyDetailComponent } from './lobby-detail.component';

describe('LobbyDetailComponent', () => {
  let component: LobbyDetailComponent;
  let fixture: ComponentFixture<LobbyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LobbyDetailComponent]
    });
    fixture = TestBed.createComponent(LobbyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
