import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsVeiwListComponent } from './contacts-veiw-list.component';

describe('ContactsVeiwListComponent', () => {
  let component: ContactsVeiwListComponent;
  let fixture: ComponentFixture<ContactsVeiwListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsVeiwListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsVeiwListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
