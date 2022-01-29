import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteComponent } from '../../shared/note/note.component';

import { MainComponent } from './main.component';

fdescribe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent, NoteComponent ],
      imports: [
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //detecta as alterações depois de alguma interação
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar a tag title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector("h1");

    expect(h1?.textContent).toEqual("Avanade Notes");
  });

  it('deve ser possível criar uma nova nota', async () => {
    //a configuração
    const compiled = fixture.nativeElement as HTMLElement;

    const newNoteMock = {
      text: "Minha nova nota",
    }

    const inputElem = compiled.querySelector("textarea");
    const buttonElem = compiled.querySelector("button");

    //a ação
    inputElem!.value = newNoteMock.text;
    inputElem!.dispatchEvent(new Event('input'));
    
    buttonElem?.click();

    fixture.detectChanges();

    //o que é esperado como resultado
    expect(compiled.querySelector("article")).toBeTruthy();
    expect(compiled.querySelector("article p:nth-child(2)")?.textContent).toEqual(newNoteMock.text);
  });

  it('deve ser possível delertar uma nota', async () => {
    //a configuração
    const compiled = fixture.nativeElement as HTMLElement;

    const newNoteMock = {
      text: "Minha nova nota",
    }

    const inputElem = compiled.querySelector("textarea");
    const buttonElem = compiled.querySelector("button");

    //a ação
    inputElem!.value = newNoteMock.text;
    inputElem!.dispatchEvent(new Event('input'));
    
    buttonElem?.click();

    fixture.detectChanges();

    //o que é esperado como resultado
    const deleteBtn = compiled.querySelector("#deleteBtn") as HTMLElement;
    deleteBtn!.click();

    fixture.detectChanges();

    expect(compiled.querySelector("article")).toBeFalsy();
  });

});
