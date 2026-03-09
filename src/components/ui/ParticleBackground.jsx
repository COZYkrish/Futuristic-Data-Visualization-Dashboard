import Particles from "react-tsparticles"

export default function ParticleBackground(){

 return(

 <Particles
  options={{
   particles:{
    number:{value:60},
    color:{value:"#00ffff"},
    size:{value:2},
    move:{speed:1}
   },
   background:{color:"#0b0f19"}
  }}
 />

 )

}