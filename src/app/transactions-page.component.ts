import { Component } from '@angular/core';
import { TransactionsSectionComponent } from './transactions-section.component';

@Component({
  selector: 'solapp-transactions-page',
  imports: [TransactionsSectionComponent],
  template: `
    <div>
      <section class="text-center text-2xl px-24 py-32 bg-neutral bg-opacity-5">
        <solapp-transactions-section/>
      </section>
    </div>
  `,
  standalone: true,
})
export class TransactionsPageComponent {}
