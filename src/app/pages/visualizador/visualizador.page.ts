import { Component, OnInit } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
 
@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.page.html',
  styleUrls: ['./visualizador.page.scss'],
})
export class VisualizadorPage implements OnInit {

  constructor(private youtube: YoutubeVideoPlayer) { }

  ngOnInit() {
  }
  openMyVideo(id){
    this.youtube.openVideo(id);
  }
}
