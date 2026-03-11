import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"

function buildSeries(data) {
 const firstRow = data[0] ?? {}
 const numericKeys = Object.keys(firstRow).filter((key) =>
  data.some((row) => Number.isFinite(Number(row[key])))
 )

 const metricKey = numericKeys[0]

 if (!metricKey) {
  return { metricKey: null, bars: [] }
 }

 const bars = data
  .slice(0, 12)
  .map((row, index) => {
   const value = Number(row[metricKey])

   if (!Number.isFinite(value)) {
    return null
   }

   return {
    id: `${metricKey}-${index}`,
    label: String(row.Name ?? row.PassengerId ?? index + 1),
    value
   }
  })
  .filter(Boolean)

 return { metricKey, bars }
}

function Bar({ position, height, color }) {
 return (
  <mesh position={position} castShadow receiveShadow>
   <boxGeometry args={[0.9, height, 0.9]} />
   <meshStandardMaterial color={color} metalness={0.25} roughness={0.3} />
  </mesh>
 )
}

function CameraRig() {
 const angleRef = useRef(0)

 useFrame(({ camera }, delta) => {
  angleRef.current += delta * 0.35
  camera.position.x = Math.sin(angleRef.current) * 8
  camera.position.z = Math.cos(angleRef.current) * 8
  camera.position.y = 5
  camera.lookAt(0, 1.5, 0)
 })

 return null
}

export default function ThreeDChart({ data }) {
 const { metricKey, bars } = buildSeries(data)

 if (!data || data.length === 0) {
  return <div className="text-gray-400">Upload dataset to see 3D chart</div>
 }

 if (!metricKey || bars.length === 0) {
  return (
   <div className="flex h-[400px] items-center justify-center text-gray-400">
    No numeric column is available for the 3D chart.
   </div>
  )
 }

 const maxValue = Math.max(...bars.map((bar) => bar.value), 1)

 return (
  <div className="h-[400px] overflow-hidden rounded-xl border border-white/10 bg-slate-950/70">
   <Canvas
    camera={{ position: [5,5,5], fov: 60 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, powerPreference: "high-performance" }}
    shadows
   >
    <color attach="background" args={["#020617"]} />
    <fog attach="fog" args={["#020617", 8, 20]} />
    <ambientLight intensity={0.8} />
    <directionalLight
     castShadow
     intensity={1.2}
     position={[6, 10, 6]}
     shadow-mapSize-width={1024}
     shadow-mapSize-height={1024}
    />
    <pointLight intensity={0.5} position={[-6, 4, -2]} />
    <CameraRig />

    {bars.map((bar, index) => {
     const height = Math.max((bar.value / maxValue) * 6, 0.4)

     return (
      <Bar
       key={bar.id}
       height={height}
       color={index % 2 === 0 ? "#22d3ee" : "#0ea5e9"}
       position={[index * 1.25 - ((bars.length - 1) * 1.25) / 2, height / 2, 0]}
      />
     )
    })}

    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
     <planeGeometry args={[24, 8]} />
     <meshStandardMaterial color="#08111f" />
    </mesh>
   </Canvas>
   <div className="pointer-events-none absolute sr-only">
    3D bar chart showing {metricKey}.
   </div>
  </div>
 )
}
