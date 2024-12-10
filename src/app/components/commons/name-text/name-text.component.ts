import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'text-input-box',
  template: `
  <div>
    <mat-form-field class="fullwidth" appearance="legacy">
      <mat-label>{{labelName}}</mat-label>
      <input 
        [name]="nameValue"
        [(ngModel)]="ngModelValue"
        (ngModelChange)="onValueChange($event)"
        [formControl]="formControlValue"
        required
        matInput 
        [placeholder]="placeholderValue"
        [maxlength]="maxLengthValue"
        [mask]="maskValue"
        [type]="typeValue"
      >
      <mat-icon matSuffix>{{icon}}</mat-icon>
    </mat-form-field>
  </div>
  `,
  styleUrls: ['./name-text.component.css']
})
export class NameTextComponent implements OnInit {
  @Input() labelName: string = '';
  @Input() nameValue: string = '';
  @Input() ngModelValue: string = '';
  @Input() formControlValue?: FormControl;
  @Input() placeholderValue: string = 'Ex.. Fulano de Tal';
  @Input() maxLengthValue: string = '50';
  @Input() maskValue: string = ''
  @Input() typeValue: string = ''
  @Input() icon: any = ''
  
  @Output() ngModelValueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  onValueChange(value: string): void {
    this.ngModelValueChange.emit(value);
  }
  
}
