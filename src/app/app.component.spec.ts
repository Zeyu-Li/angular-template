import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angularTemplate'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angularTemplate');
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angularTemplate app is running!');
  });

  it('should show the command for the selected next step', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const terminalText = (): string | undefined => compiled.querySelector('.terminal pre')?.textContent;
    expect(terminalText()).toBe('ng generate component xyz');

    const materialCard = Array.from(compiled.querySelectorAll<HTMLElement>('.card'))
      .find(card => card.textContent?.includes('Angular Material'));
    materialCard?.click();
    await fixture.whenStable();
    expect(terminalText()).toBe('ng add @angular/material');
  });
});
