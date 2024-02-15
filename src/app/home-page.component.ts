import { Component } from "@angular/core";

@Component({
    selector: 'solapp-home-page', 
    template: `
    <section>
        <h2>Home</h2>
        <p>welcome to the home page</p>
    </section>
    `,
    standalone: true,
})
export class HomePageComponent {}