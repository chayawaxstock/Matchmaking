import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';
import { Preference } from 'src/app/shared/models/preference';

@Component({
  selector: 'app-dialog-preference',
  templateUrl: './dialog-preference.component.html',
  styleUrls: ['./dialog-preference.component.scss']
})
export class DialogPreferenceComponent implements OnInit {

  form: FormGroup;
  description: Preference;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogPreferenceComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) 
  {
 
    this.description = data.preference;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
    })
  }

  submit(form) {
    this.dialogRef.close(`ok`);
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
