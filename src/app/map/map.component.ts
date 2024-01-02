import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
// import * as gifler from 'gifler'

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  
})
export class MapComponent  implements OnInit, AfterViewInit {
   lat = 0 
  //  lat is from -90 to 90 vertical 
   long = 0 
  //  long is from -180 to 180
   map_width =0
   map_height = 0
   size= 2
   render_coor= false
   dot_arr_src=['../../assets/map/0.png','../../assets/map/1.png','../../assets/map/2.png','../../assets/map/3.png','../../assets/map/4.png' ]
   dot_arr: HTMLImageElement[] = [];
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

 
        animate_dot =(ctx:CanvasRenderingContext2D, x:number,y:number,size:number)=>{
          let pos = 0 
          const len =this.dot_arr_src.length
          
          
              this.dot_arr_src.forEach((src)=>{
                
                const dot = new Image();
                dot.src = src;
                this.dot_arr.push(dot);
                
              })
              const loop = ()=>{
                
                setTimeout(()=>{
                  if(this.canvas){
                    if(pos<len){
                      
                      ctx.clearRect(x, y, size, size);
                      ctx.drawImage(this.dot_arr[pos],x,y,size,size)
                      pos++
                    }else{
                      pos= len -1
                      ctx.clearRect(x, y, size, size);
      
                    ctx.drawImage(this.dot_arr[pos],x,y,size,size)
                    pos =0 
                   }
    loop()
  }
},74)

}
loop()
}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(
        position => {
       
          this.convert_coor(position.coords.latitude, position.coords.longitude)
          this.render_coor=true
        }
      );
    }
    
    @ViewChild('trker', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;
    
    ngAfterViewInit (){
      
      if(this.canvas){
        const ctx = this.canvas.nativeElement.getContext('2d');
       
        
        if(ctx){
        const dot = new Image()
        dot.src = '../../assets/map/4.png' 
        
        dot.onload=()=>{
          this.animate_dot(ctx, this.long,this.lat, this.size)
          // ctx.drawImage(dot, this.long,this.lat, this.size,this.size )
          for (let _i = 0; _i < 8; _i++) {
            let x = this.map_width* Math.random()
            let y = this.map_height* Math.random()
            ctx.drawImage(dot ,x,y,this.size +1 , this.size+1)

        }

        }
       
        
            

        }else{
          console.error('failed to get canvas context')
        }
      }else{
        
        console.error('failed to get canvas')
      }

  }
}
