import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Music } from '../../models/music';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-music-list',
  standalone: true,
  imports: [RouterModule, MatProgressBarModule, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './music-list.component.html',
  styleUrl: './music-list.component.css'
})
export class MusicListComponent implements OnInit {

  musics?: Music[];
  isLoading: boolean = true;
  constructor(private musicService: MusicService,) {
  }

  ngOnInit(): void {
    this.musicService.getAll().subscribe(data => {
      this.musics = data;
      this.isLoading = false;

    })
  }
}


