import { PostEntryService } from 'app/services/post-entry.service';
import { Post } from './../models/post.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss', '../shared/common.scss']
})
export class CreatePostComponent implements OnInit {
  public postBody: string

  constructor(public authService: AuthService, private postService: PostEntryService) { }

  ngOnInit() {
  }

  onSubmit() : void {
    try {
      const post = new Post(
        {
        postBody : this.postBody,
        authorKey: this.authService.currentUserId
        }
      )
      if (this.postBody !== undefined && this.postBody !== "")
        this.postService.add(post)
      this.postBody = ""

    } catch (e) {
      console.log("Error on submit: ", e)
    }
  }

}
