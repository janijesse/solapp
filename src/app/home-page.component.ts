import { Component } from '@angular/core';
import { FeaturesSectionComponent } from './features-section.component';

@Component({
  selector: 'solapp-home-page',
  imports: [FeaturesSectionComponent],
  template: `
    <section class="text-center text-3xl px-24 py-32 bg-white bg-opacity-5">
      <h2>Sweet Home</h2>
    </section>
    <footer><solapp-features-section></solapp-features-section></footer>
  `,
  standalone: true,
})
export class HomePageComponent {}
