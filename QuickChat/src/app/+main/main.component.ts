import { PostEntryService } from 'app/services/post-entry.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss', '../shared/common.scss']
})
export class MainComponent implements OnInit {

  constructor(private postService: PostEntryService) { }

  ngOnInit() {
    this.postService.showOnlyMyPost(false)
  }

}
