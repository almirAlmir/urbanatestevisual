import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoCartoes } from './gestao-cartoes';

describe('GestaoCartoes', () => {
  let component: GestaoCartoes;
  let fixture: ComponentFixture<GestaoCartoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestaoCartoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoCartoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
