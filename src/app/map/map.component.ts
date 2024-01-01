import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,  } from '@angular/core';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  
})
export class MapComponent  implements OnInit, AfterViewInit{
  
  ngOnInit() {
    // navigator.geolocation.getCurrentPosition(
      //   position => console.log(position)
      // );
    }
    
    @ViewChild('trker', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    ngAfterViewInit (){
      
      if(this.canvas){
        const ctx = this.canvas.nativeElement.getContext('2d');
        
        if(ctx){
          const backgroundImage = new Image();
          backgroundImage.src = './assets/map/Blue_Marble_2002.png';
          backgroundImage.onload = () => {
            // Draw the image onto the canvas as a background

              ctx.drawImage(backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
      
            
          };
      

        }else{
          console.error('failed to get canvas context')
        }
      }else{
        
        console.error('failed to get canvas')
      }

  }
}
