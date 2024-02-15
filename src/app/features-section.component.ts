import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'solapp-features-section',
  template: `
    <nav>
      <ul class="flex justify-center items-center gap-4">
        <li>Rápida</li>
        <li>Eficiente</li>
        <li>Segura</li>
      </ul>
    </nav>
  `,
  standalone: true,
})
export class FeaturesSectionComponent {}
