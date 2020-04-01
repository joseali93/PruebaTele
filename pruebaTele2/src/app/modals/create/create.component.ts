import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  public formCreate: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder:FormBuilder
  ) { 
    this.formCreate=this.creteForm()
  }

  ngOnInit(): void {
  }
  private creteForm(){
    return this.formbuilder.group(
      {
        identification:['',Validators.required],
        name:['',Validators.required],
        start_date:['',Validators.required],
        start_hour:['',Validators.required],
        end_date:['',Validators.required],
        end_hour:['',Validators.required],
        extra_start_hour:[''],
        extra_end_hour:[''],
        reason:['']
        
      }
    )
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  update(item:FormGroup){
    console.log(item);
    this.dialogRef.close(item.value)
  }
}
