import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

function Cube({ position }) {
 return (
  <mesh position={position}>
   <boxGeometry args={[1,1,1]} />
   <meshStandardMaterial color="cyan" />
  </mesh>
 )
}

export default function ThreeDChart({ data }) {

 return (
  <div className="h-[400px]">
   <Canvas>
    <ambientLight intensity={0.5} />
    <pointLight position={[10,10,10]} />

    {data.slice(0,10).map((_, i) => (
     <Cube key={i} position={[i*1.5,0,0]} />
    ))}

    <OrbitControls />
   </Canvas>
  </div>
 )
}