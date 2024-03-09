import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { FeaturesSectionComponent } from './features-section.component';

@Component({
  selector: 'solapp-balance-page',
  imports: [FeaturesSectionComponent, BalanceSectionComponent],
  template: `
    <section class="text-center text-3xl px-24 py-32 bg-white bg-opacity-5">
      <solapp-balance-section></solapp-balance-section>
    </section>
    <footer><solapp-features-section></solapp-features-section></footer>
  `,
  standalone: true,
})
export class BalancePageComponent {}
