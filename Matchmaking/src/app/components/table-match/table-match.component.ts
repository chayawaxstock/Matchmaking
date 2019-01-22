import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-table-match',
  templateUrl: './table-match.component.html',
  styleUrls: ['./table-match.component.scss']
})
export class TableMatchComponent implements OnInit {

  @Input() usersMatch:User[]=[];
  @Input() nameUser:User[]=[];
  constructor() { }

  ngOnInit() {
  }

}
