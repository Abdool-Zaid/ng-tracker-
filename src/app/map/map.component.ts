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
   size= 4
   convert_coor = (lat:number, long:number)=>{
      if(this.canvas){
        let x =this.canvas.nativeElement.getBoundingClientRect().x
        let y =this.canvas.nativeElement.getBoundingClientRect().y
        this.map_width = this.canvas.nativeElement.getBoundingClientRect().width
        this.map_height = this.canvas.nativeElement.getBoundingClientRect().height
        x= long + 180
        y = lat + 90 
        x = (x/(2*180))*this.map_width
        y= (y/(2*90))*this.map_height
          this.lat= y- this.size/2
          this.long= x- this.size/2

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
          // ctx.drawImage(dot, Math.floor(this.long),Math.floor(this.lat), 10,10 )
          // ctx.drawImage(dot,803,227, 10,10 )
          ctx.drawImage(dot, 160,100, this.size,this.size )
          ctx.drawImage(dot, 5,5, 1,1 )
        
        }
            

        }else{
          console.error('failed to get canvas context')
        }
      }else{
        
        console.error('failed to get canvas')
      }

  }
}
