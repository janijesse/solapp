import { Component } from "@angular/core";
import { BalanceSectionComponent } from "./balance-section.component";

@Component({
    selector: 'solapp-balance-page',
    template: `
        <solapp-balance-section></solapp-balance-section>
    `,
    standalone: true,
    imports: [BalanceSectionComponent]
})
export class BalancePageComponent {}