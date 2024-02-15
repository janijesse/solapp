import { Component } from "@angular/core";
import { BalanceSectionComponent } from "./balance-section.component";

@Component({
    selector: 'solapp-balance-page', 
    template: `
    <section class="text-center text-3xl px-24 py-32 bg-white bg-opacity-5">

        <solapp-balance-section></solapp-balance-section>
    </section>
    `,
    standalone: true,
    imports: [BalanceSectionComponent],
})
export class BalancePageComponent {}