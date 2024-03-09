import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { FeaturesSectionComponent } from './features-section.component';
import { TransactionsSectionComponent } from './transactions-section.component';

@Component({
  selector: 'solapp-balance-page',
  imports: [BalanceSectionComponent],
  template: `
    <div class="flex justify-center gap-4">
      <solapp-balance-section />
    </div>
  `,
  standalone: true,
})
export class BalancePageComponent {}
