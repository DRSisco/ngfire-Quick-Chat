import { Component, OnInit } from '@angular/core';
import { PostEntryService } from "app/services/post-entry.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss', '../shared/common.scss']
})
export class PostListComponent implements OnInit {

  constructor(public postService: PostEntryService) { }

  ngOnInit() {
  }

}
