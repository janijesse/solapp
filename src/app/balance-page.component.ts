import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { FeaturesSectionComponent } from './features-section.component';
import { TransactionsSectionComponent } from './transactions-section.component';

@Component({
  selector: 'solapp-balance-page',
  imports: [
    FeaturesSectionComponent,
    BalanceSectionComponent,
    TransactionsSectionComponent,
  ],
  template: `
    <div>
      <section class="text-center text-2xl px-24 py-24 bg-white bg-opacity-5">
        <solapp-balance-section></solapp-balance-section>
        <solapp-transactions-section></solapp-transactions-section>
      </section>
      <footer>
        <solapp-features-section></solapp-features-section>
      </footer>
    </div>
  `,
  standalone: true,
})
export class BalancePageComponent {}
