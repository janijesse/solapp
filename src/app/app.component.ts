import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { MatAnchor } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TransferModalComponent } from './transfer-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionStore, injectPublicKey } from '@heavy-duty/wallet-adapter';
import { ShyftApiService } from './shyft-api.service';
import { FeaturesSectionComponent } from './features-section.component';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    MatAnchor,
    HdWalletMultiButtonComponent,
    FeaturesSectionComponent,
  ],
  selector: 'solapp-root',
  template: `
    <div class="bg-neutral">
      <header class="py-8 relative">
        <div class="navbar bg-base-100">
          <div >
            <img 
              width="30"
              height="5"
              src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=029"
            />
            <a class="text-3xl Bold ">Sol</a>
            <h2>APP</h2>
          </div>
          <div class="flex justify-center absolute top-4 right-4">
            <hd-wallet-multi-button />
          </div>
        </div>

        <nav>
          <ul class="flex justify-center items-center gap-4">
            <li >
              <a
                [routerLink]="['']"
                class="btn btn-xs sm:btn-md md:btn-md lg:btn-lg border-primary"
                >Home</a
              >
            </li>
            <li>
              <a
                [routerLink]="['balance']"
                class="btn btn-xs sm:btn-md md:btn-md lg:btn-lg border-primary"
                >Balance</a
              >
            </li>
            <li>
              <a
                [routerLink]="['transactions']"
                class="btn btn-xs sm:btn-md md:btn-md lg:btn-lg border-primary"
                >History</a
              >
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <router-outlet/>
      </main>
      <footer class=" bg-base-100">
        <solapp-features-section />
      </footer>
    </div>
  `,
})
export class AppComponent implements OnInit {
  private readonly _connectionStore = inject(ConnectionStore);
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  ngOnInit() {
    this._connectionStore.setEndpoint(this._shyftApiService.getEndpoint());
  }
}
