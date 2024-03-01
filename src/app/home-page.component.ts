import { Component } from '@angular/core';
import { FeaturesSectionComponent } from './features-section.component';

@Component({
  selector: 'solapp-home-page',
  imports: [],
  template: `
    <section class="text-center text-2xl px-24 py-32 bg-neutral bg-opacity-5">
      <p class="text-primary">Sweet Home</p>
    </section>
    
  `,
  standalone: true,
})
export class HomePageComponent {}
