import { PostWithAuthor } from 'app/models/post.model';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "app/services/auth.service";

@Component({
  selector: 'app-post-entry',
  templateUrl: './post-entry.component.html',
  styleUrls: ['./post-entry.component.scss', '../shared/common.scss']
})
export class PostEntryComponent implements OnInit {
  constructor(public authService: AuthService) { }

  @Input() post : PostWithAuthor;

  ngOnInit() {
  }

}
