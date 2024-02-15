import { Component } from "@angular/core";

@Component({
    selector: 'solapp-balance-section', 
    template: `
    <section>
        <h2>Balance</h2>
        <p>Este es tu saldo</p>
        
    </section>
    `,
    standalone: true,
})
export class BalanceSectionComponent {}