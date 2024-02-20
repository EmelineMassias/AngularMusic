import { Routes } from '@angular/router';
import { MusicListComponent } from './components/music-list/music-list.component';
import { MusicDetailComponent } from './components/music-detail/music-detail.component';

export const routes: Routes = [
    { path: '', component: MusicListComponent },
    { path: ':id', component: MusicDetailComponent },
];
