import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,  } from '@angular/core';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  
})
export class MapComponent  implements OnInit, AfterViewInit{
   lat = 0 
  //  lat is from -90 to 90 vertical 
   long = 0 
  //  long is from -180 to 180
   map_width =0
   map_height = 0
   size= 2
   convert_coor = (lat:number, long:number)=>{
      if(this.canvas){
        this.map_width = this.canvas.nativeElement.width
        this.map_height = this.canvas.nativeElement.height
    
       let x= long + 180
       let y = lat + 90 
        x = (x/(2*180))*this.map_width
        y= (y/(2*90))*this.map_height
          this.long= x- this.size/2
          this.lat= this.map_height - y -this.size/2

      }else{
        console.error("no target element")
      }
   }
  
  ngOnInit() {
    navigator.geolocation.getCurrentPosition(
        position => {
       
          this.convert_coor(position.coords.latitude, position.coords.longitude)
        }
      );
    }
    
    @ViewChild('trker', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    
    ngAfterViewInit (){
      
      if(this.canvas){
        const ctx = this.canvas.nativeElement.getContext('2d');
        
        
        if(ctx){
        const dot = new Image()
        dot.src = '../../assets/map/dot_base.png' 
        dot.onload=()=>{
          // ctx.drawImage(dot,803,227, 10,10 )
          ctx.drawImage(dot, this.long,this.lat, this.size,this.size )
        
        }
            

        }else{
          console.error('failed to get canvas context')
        }
      }else{
        
        console.error('failed to get canvas')
      }

  }
}
