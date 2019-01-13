import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA, } from '@angular/material';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  form: FormGroup;
  description: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {

    this.description = data.id;
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
