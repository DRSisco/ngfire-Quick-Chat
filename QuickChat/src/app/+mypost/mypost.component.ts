import { Component, OnInit } from '@angular/core';
import { PostEntryService } from "app/services/post-entry.service";

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.scss', '../shared/common.scss']
})
export class MypostComponent implements OnInit {

  constructor(private postService: PostEntryService) { }

  ngOnInit() {
    this.postService.showOnlyMyPost(true)
  }

}
