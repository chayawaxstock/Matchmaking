import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA, } from '@angular/material';


@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.scss']
})
export class DialogDetailComponent implements OnInit {

  form: FormGroup;
  description: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogDetailComponent>,
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
