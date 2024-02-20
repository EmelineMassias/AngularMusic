import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MusicService } from '../../services/music.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Music } from '../../models/music';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-music-detail',
  standalone: true,
  imports: [MatButtonModule, RouterModule, MatProgressBar, CommonModule],
  templateUrl: './music-detail.component.html',
  styleUrl: './music-detail.component.css'
})
export class MusicDetailComponent implements OnInit {
  isLoading: boolean = true;
  music?: Music;
  constructor(private activatedRoute: ActivatedRoute, private musicService: MusicService,
    private domSanitizer: DomSanitizer, private matDialog: MatDialog) {

  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.musicService.getOne(+id).subscribe(data => {
        this.music = data;
        if (typeof this.music.urlYoutube === "string") {
          this.music.urlYoutube = this.domSanitizer.bypassSecurityTrustResourceUrl(this.music.urlYoutube);
        }
        this.isLoading = false;
      })
    }
  }

  deleteMusicModal(enterAnimationDuration: string, exitAnimationDuration: string) {
    let dialog = this.matDialog.open(ModalConfirmComponent, {
      data: {music: this.music}, 
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialog.afterClosed().subscribe(result => {

    });
  }
}
