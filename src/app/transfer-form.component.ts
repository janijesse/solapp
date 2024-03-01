import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface TransferFormModel {
  memo: string | null;
  receiverAddress: string | null;
  amount: number | null;
  token: {
    address: string;
    balance: number;
    info: { name: string; symbol: string; image: string };
  } | null;
}

export interface TransferFormPayload {
  memo: string;
  receiverAddress: string;
  amount: number;
  mintAddress: string;
}

@Component({
  selector: 'solapp-transfer-form',
  template: `
    <form class="w-[200px] bg-neutral" #form="ngForm" (ngSubmit)="onSubmit(form)">
      <mat-form-field class="w-full mb-4">
        <mat-label>Currency</mat-label>
        <mat-select
          [(ngModel)]="model.token"
          name="token"
          required
          [disabled]="disabled()"
          #tokenControl="ngModel"
        >
          @for (token of tokens(); track token) {
            <mat-option [value]="token">
              <div class="flex items-center gap-2">
                <img [src]="token.info.image" class="rounded-full w-8 h-8" />
                <span>{{ token.info.symbol }}</span>
              </div>
            </mat-option>
          }
        </mat-select>

        @if (form.submitted && tokenControl.errors) {
          <mat-error>
            @if (tokenControl.errors['required']) {
             Currency is required
            }
          </mat-error>
        } @else {
          <mat-hint>Currency you want to transfer</mat-hint>
        }
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Concept</mat-label>
        <input
          name="memo"
          type="text"
          matInput
          placeholder="Payament for..."
          [(ngModel)]="model.memo"
          required
          [disabled]="disabled()"
           #memoControl="ngModel"
        
           />
        <mat-icon matSuffix>description</mat-icon>

        @if (form.submitted && memoControl.errors) {
          <mat-error>
            @if (memoControl.errors['required']) {
              Concept is required.
            }
          </mat-error>
        } @else {
          <mat-hint>reason for transfer</mat-hint>
        }
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Receiver Address</mat-label>
        <input
          name="receiverAddress"
          matInput
          placeholder="Public Key de la cuenta destino."
          type="text"
          [(ngModel)]="model.receiverAddress"
          #receiverAddressControl="ngModel"
          required
          [disabled]="disabled()"
        />
        <mat-icon matSuffix>key</mat-icon>

        @if (form.submitted && receiverAddressControl.errors) {
          <mat-error>
            @if (receiverAddressControl.errors['required']) {
              Receiver Key is required
            }
          </mat-error>
        } @else {
          <mat-hint>reason.</mat-hint>
        }
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Amount</mat-label>
        <input
          name="amount"
          type="number"
          matInput
          placeholder="How much here"
          min="0"
          [(ngModel)]="model.amount"
          #amountControl="ngModel"
          required
          [disabled]="disabled()"
          [max]="tokenControl.value?.balance ?? undefined"
        />
        <mat-icon matSuffix>attach_money</mat-icon>

        @if (form.submitted && amountControl.errors) {
          <mat-error>
            @if (amountControl.errors['required']) {
              The amount is required.
            } @else if (amountControl.errors['min']) {
              The amount must be greater than 
            } @else if (amountControl.errors['max']) {
              The amount must be less than {{ tokenControl.value.balance }}.
            }
          </mat-error>
        } @else {
          <mat-hint>Amount to transfer.</mat-hint>
        }
      </mat-form-field>

      <footer class="flex justify-center gap-4">
        <button
          type="submit"
          class="btn btn-xs sm:btn-md md:btn-md lg:btn-lg border-primary"
          [disabled]="disabled()"
        >
          Enviar
        </button>
        <button
          type="button"
          class="btn btn-xs sm:btn-md md:btn-md lg:btn-lg border-error"
          (click)="onCancel()"
          [disabled]="disabled()"
        >
          Cancel
        </button>
      </footer>
    </form>
  `,
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    MatInput,
    MatIcon,
  ],
})
export class TransferFormComponent {
  private readonly _matSnackBar = inject(MatSnackBar);

  readonly tokens = input<
    {
      address: string;
      balance: number;
      info: { name: string; symbol: string; image: string };
    }[]
  >([]);
  readonly disabled = input<boolean>(false);

  @Output() readonly sendTransfer = new EventEmitter<TransferFormPayload>();
  @Output() readonly cancelTransfer = new EventEmitter();

  readonly model: TransferFormModel = {
    memo: null,
    receiverAddress: null,
    amount: null,
    token: null,
  };

  onSubmit(form: NgForm) {
    if (
      form.invalid ||
      this.model.memo === null ||
      this.model.receiverAddress === null ||
      this.model.amount === null ||
      this.model.token === null
    ) {
      this._matSnackBar.open('⚠️ El formulario es inválido.', 'Cerrar', {
        duration: 4000,
        horizontalPosition: 'end',
      });
    } else {
      this.sendTransfer.emit({
        amount: this.model.amount * 10 ** 9,
        receiverAddress: this.model.receiverAddress,
        memo: this.model.memo,
        mintAddress: this.model.token.address,
      });
    }
  }

  onCancel() {
    this.cancelTransfer.emit();
  }
}