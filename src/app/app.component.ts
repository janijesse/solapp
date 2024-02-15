import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { MatAnchor } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  standalone: true,
  imports: [RouterModule, RouterLink, MatAnchor, HdWalletMultiButtonComponent],
  selector: 'solapp-root',
  template: `
    <header class="py-8 relative">
      <a [routerLink]="['']" mat-raised-button>Home</a>
      <h1 class="text-5xl text-center mb-4">Solapp</h1>
      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li></li>
          <li>
            <a [routerLink]="['balance']" mat-raised-button>Balance</a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
