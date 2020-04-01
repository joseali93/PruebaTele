import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from 'src/app/modals/create/create.component';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['identification', 'name', 'start_date', 'start_hour','end_date',
'end_hour','extra_start_hour','extra_end_hour','reason'];
// displayedColumns2:
displayedColumns2: string[] = ['userId', 'title', 'body']

  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('paginator2', {static: true}) paginator2: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('sort2', {static: true}) sort2: MatSort;
  constructor(
    public dialog: MatDialog,
    public endpoint:ApiService
  ) { }

  ngOnInit(): void {
    this.getInfo()
    this.getInfo2()
  }
  create(){
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '900px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result){
        //creamos infor
        this.createInfo(result)
      }
    });
  }
  createInfo(item){
    this.endpoint.setInformation(item).subscribe(
      (response=>{
        console.log('response',response);
        this.getInfo()
      })
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  getInfo(){
    this.endpoint.getInformation().subscribe(
      (response=>{
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    )
  }
  getInfo2(){
    this.endpoint.getInternalPost().subscribe(
      (response2=>{
        console.log(response2);
        this.dataSource2 = new MatTableDataSource(<any> response2);
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      })
    )
  }

  insertPost(){
    this.endpoint.getaPost().subscribe(
      (response=>{
        console.log('response',response);
        this.endpoint.setPosts(response).subscribe(
          (resp=>{
            console.log('entro->',resp);

            this.getInfo2()

          })
        )
      })
    )
  }
  manyPost(){
    // console.log('entro aquo');
    
    this.endpoint.getmultiplePosts().subscribe(
      (response=>{
        // console.log('response',response);
        this.endpoint.setPosts(response).subscribe(
          (resp=>{
            // console.log('entro->',resp);
            this.getInfo2()

          })
        )
      })
    )
  }
}
