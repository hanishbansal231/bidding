import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SecondsToMinutesPipe } from '../../../core/pipes/seconds-to-minutes.pipe';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SecondsToMinutesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent, // Export HeaderComponent
    FooterComponent,   // Export FooterComponent if used
    SecondsToMinutesPipe
  ]
})
export class SharedModule { }
