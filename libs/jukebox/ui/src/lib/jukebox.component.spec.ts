import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JukeboxComponent } from './jukebox.component';

describe('JukeboxComponent', () => {
  let component: JukeboxComponent;
  let fixture: ComponentFixture<JukeboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JukeboxComponent],
      imports: [HttpClientModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(JukeboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
