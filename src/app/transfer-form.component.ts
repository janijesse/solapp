import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

export interface TransferFormModel {
  memo: string | null;
  amount: number | null;
  receiverAddress: string | null;
}
export interface TransferFormPayLoad {
  memo: string;
  amount: number;
  receiverAddress: string;
}

@Component({
  selector: 'solapp-transfer-form',
  template: `<form
    #form="ngForm"
    class="w-[400px]"
    (ngSubmit)="onSubmitForm(form)"
  >
    <mat-form-field appearance="fill" class="w-full mb-4">
      <mat-label>Concept</mat-label>
      <input
        name="memo"
        type="text"
        matInput
        placeholder="Payament for..."
        [(ngModel)]="model.memo"
        required
        #memoControl="ngModel"
      />
      <mat-icon matSuffix>description</mat-icon>
      @if (form.submitted && memoControl.errors) {
        <mat-error>
          @if (memoControl.errors['required']) {
            Concept is Required
          }
        </mat-error>
      } @else {
        <mat-hint>reason for transfer</mat-hint>
      }
    </mat-form-field>

    <mat-form-field appearance="fill" class="w-full mb-4">
      <mat-label>Amount</mat-label>
      <input
        name="amount"
        type="number"
        matInput
        min="0"
        placeholder="How Much money"
        [(ngModel)]="model.amount"
        required
        #amountControl="ngModel"
      />
      <mat-icon matSuffix>attach_money</mat-icon>
      @if (form.submitted && amountControl.errors) {
        <mat-error>
          @if (amountControl.errors['required']) {
            Amount > 0
          }
        </mat-error>
      } @else {
        <mat-hint>Amount > 0</mat-hint>
      }
    </mat-form-field>

    <mat-form-field appearance="fill" class="w-full mb-4">
      <mat-label>Receiver Address</mat-label>
      <input
        name="receiverAddress"
        type="text"
        matInput
        placeholder="Receiver Public Key "
        [(ngModel)]="model.receiverAddress"
        required
        #receiverAddressControl="ngModel"
      />
      <mat-icon matSuffix>key</mat-icon>
      @if (form.submitted && receiverAddressControl.errors) {
        <mat-error>
          @if (receiverAddressControl.errors['required']) {
            Receiver is required
          }
        </mat-error>
      } @else {
        <mat-hint>Solana Wallet Only</mat-hint>
      }
    </mat-form-field>
    <footer class="flex-justify-center">
      <button type="submit" mat-raised-button color="primary">Enviar</button>
    </footer>
  </form> `,
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInput, MatIcon, MatButton],
})
export class TransferFormComponent {
  readonly model: TransferFormModel = {
    memo: null,
    amount: null,
    receiverAddress: null,
  };

  @Output() readonly submitForm = new EventEmitter<TransferFormPayLoad>();

  onSubmitForm(form: NgForm) {
    if (
      form.invalid ||
      this.model.amount === null ||
      this.model.memo === null ||
      this.model.receiverAddress === null
    ) {
      console.error('El Formulario es inválido');
    } else {
      this.submitForm.emit({
        amount: this.model.amount,
        memo: this.model.memo,
        receiverAddress: this.model.receiverAddress,
      });
    }
  }
}
