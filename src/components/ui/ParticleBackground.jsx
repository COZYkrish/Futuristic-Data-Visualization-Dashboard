import Particles from "react-tsparticles"

export default function ParticleBackground(){

 return(

  <div className="fixed inset-0 -z-10">

   <Particles
    options={{
      particles:{
        number:{value:60},
        color:{value:"#00ffff"},
        size:{value:2},
        move:{speed:1},
        links:{
          enable:true,
          color:"#00ffff"
        }
      },
      background:{
        color:"#0b0f19"
      }
    }}
   />

  </div>

 )

}