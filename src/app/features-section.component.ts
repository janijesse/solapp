import { Component, inject } from '@angular/core';


@Component({
  selector: 'solapp-features-section',
  template: `
    <nav>
      <ul class="flex justify-center items-center gap-4">
        <li >Rápida</li>
        <li >Eficiente</li>
        <li >Segura</li>
      </ul>
    </nav>
  `,
  standalone: true,
})
export class FeaturesSectionComponent {}
