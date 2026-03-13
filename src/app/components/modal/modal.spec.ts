import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Modal } from './modal';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;

  const initialState = { todos: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal, StoreModule.forRoot({})],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
  });

  it('should show modal when isOpen() is true', () => {
    spyOn(component, 'isOpen').and.returnValue(true);
    fixture.detectChanges();

    const modal = fixture.debugElement.query(By.css('#modalOverlay'));
    expect(modal).toBeTruthy();
  });

  it('should emit closeModal when button Chiudi is clicked', () => {
    spyOn(component, 'isOpen').and.returnValue(true);
    spyOn(component.closeModal, 'emit');
    fixture.detectChanges();

    const closeBtn = fixture.debugElement.query(By.css('#closeModal'));
    closeBtn.nativeElement.click();

    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('Button Crea Todo should be of type submit', () => {
    spyOn(component, 'isOpen').and.returnValue(true);
    fixture.detectChanges();

    const submitBtn = fixture.debugElement.query(
      By.css('button[type="submit"]'),
    );
    expect(submitBtn).toBeTruthy();
  });
});
