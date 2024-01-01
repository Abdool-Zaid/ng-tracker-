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
   convert_coor = (lat:number, long:number)=>{
      if(this.canvas){
        let x =this.canvas.nativeElement.getBoundingClientRect().x
        let y =this.canvas.nativeElement.getBoundingClientRect().y
        this.map_width = this.canvas.nativeElement.getBoundingClientRect().width
        this.map_height = this.canvas.nativeElement.getBoundingClientRect().height
        x= long + 180
        y = lat + 90 
        console.log(x,y)
        x = (x/(2*180))*this.map_width
        y= (y/(2*90)*this.map_height)
        console.log(x,y)
          this.lat= y
          this.long= x

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
          ctx.drawImage(dot, this.long,this.lat, 10,10 )
        }
            

        }else{
          console.error('failed to get canvas context')
        }
      }else{
        
        console.error('failed to get canvas')
      }

  }
}
