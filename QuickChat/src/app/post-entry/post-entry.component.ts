import { PostWithAuthor, Post } from 'app/models/post.model';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { PostEntryService } from "app/services/post-entry.service";
import { MdSnackBar } from "@angular/material";

enum EditMode {
  NotEditable = 0,
  DisplayEditButton = 1,
  Editing= 2
}

@Component({
  selector: 'app-post-entry',
  templateUrl: './post-entry.component.html',
  styleUrls: ['./post-entry.component.scss', '../shared/common.scss']
})
export class PostEntryComponent implements OnInit {


  @Input() post : PostWithAuthor;
  public editingMode: EditMode = EditMode.NotEditable
  public updatedPostBody: string;

  constructor(public authService: AuthService, private postService: PostEntryService, public snackBar: MdSnackBar) {}

  ngOnInit() {
    if (this.post.authorKey == this.authService.currentUserId) {
      this.editingMode = EditMode.DisplayEditButton
    }
  }

  editPost(updateInputElem: HTMLInputElement): void {
    this.updatedPostBody = this.post.postBody
    this.editingMode = EditMode.Editing
    setTimeout(() => {
      updateInputElem.focus()
    }, 0)
  }

  removePost(): void {
    this.postService.remove(this.post.$key)
    let snackBarRef = this.snackBar.open("Post Removed", "UNDO", {
      duration: 5000
    })
    snackBarRef.onAction().subscribe( () => {
      console.log("Put her back down NOW")
      const restoredPost = new Post();
      restoredPost.postBody = this.post.postBody
      restoredPost.authorKey = this.authService.currentUserId
      this.postService.update(this.post.$key, restoredPost)
      let snackBarRef = this.snackBar.open("Post Restored", "", {
        duration: 1000
      })
    })
  }

  saveEdit(): void {
    const updatedPost = new Post()
    updatedPost.postBody = this.updatedPostBody
    updatedPost.authorKey = this.authService.currentUserId
    this.postService.update(this.post.$key, updatedPost)
    this.editingMode = EditMode.DisplayEditButton
  }

  cancelEdit(): void {
    this.editingMode = EditMode.DisplayEditButton
  }
}
