import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { OrbitControls as ThreeOrbitControls } from "three/addons/controls/OrbitControls.js"

extend({ OrbitControlsImpl: ThreeOrbitControls })

function truncateLabel(label) {
 return label.length > 12 ? `${label.slice(0, 12)}...` : label
}

function buildSeries(data, xKey, yKey) {
 if (!xKey || !yKey) {
  return []
 }

 return data
  .map((row, index) => {
   const value = Number(row[yKey])

   if (!Number.isFinite(value)) {
    return null
   }

   return {
    id: `${xKey}-${yKey}-${index}`,
    label: truncateLabel(String(row[xKey] ?? `Row ${index + 1}`)),
    value
   }
  })
  .filter(Boolean)
  .slice(0, 10)
}

function Bar({ position, height, color }) {
 return (
  <mesh position={position} castShadow receiveShadow>
   <boxGeometry args={[0.9, height, 0.9]} />
   <meshStandardMaterial color={color} metalness={0.22} roughness={0.32} />
  </mesh>
 )
}

function SceneControls({ target, distance }) {
 const controlsRef = useRef(null)
 const { camera, gl } = useThree()

 useEffect(() => {
  camera.position.set(distance * 0.72, distance * 0.5, distance * 0.95)
  camera.lookAt(...target)
 }, [camera, distance, target])

 useFrame(() => {
  controlsRef.current?.update()
 })

 return (
  <orbitControlsImpl
   ref={controlsRef}
   args={[camera, gl.domElement]}
   enableDamping
   dampingFactor={0.08}
   enablePan
   minDistance={distance * 0.6}
   maxDistance={distance * 1.8}
   target={target}
   maxPolarAngle={Math.PI / 2.02}
  />
 )
}

function SceneDecorations({ width, depth, height, xLabel, yLabel, maxValue }) {
 const grid = useMemo(() => {
  const helper = new THREE.GridHelper(
   width + 2.5,
   Math.max(Math.round((width + 2.5) * 1.5), 6),
   "#155e75",
   "#0f172a"
  )

  helper.position.set(0, 0, 0)
  return helper
 }, [width])

 return (
  <>
   <primitive object={grid} />

   <mesh position={[0, height / 2, -depth / 2]}>
    <boxGeometry args={[width + 0.9, 0.03, 0.03]} />
    <meshStandardMaterial color="#475569" />
   </mesh>
   <mesh position={[-width / 2, height / 2, 0]}>
    <boxGeometry args={[0.03, height, 0.03]} />
    <meshStandardMaterial color="#475569" />
   </mesh>
   <mesh position={[0, 0.02, -depth / 2]}>
    <boxGeometry args={[width + 0.9, 0.03, 0.03]} />
    <meshStandardMaterial color="#334155" />
   </mesh>

   <Html position={[width / 2 + 0.7, 0.25, -depth / 2]} center>
    <span className="whitespace-nowrap text-xs text-slate-300">{xLabel}</span>
   </Html>
   <Html position={[-width / 2 - 0.45, height + 0.45, -depth / 2]} center>
    <span className="whitespace-nowrap text-xs text-slate-300 [writing-mode:vertical-rl] [text-orientation:mixed]">
     {yLabel}
    </span>
   </Html>
   <Html position={[-width / 2 - 0.45, 0.12, -depth / 2]} center>
    <span className="text-[10px] text-slate-400">0</span>
   </Html>
   <Html position={[-width / 2 - 0.45, height / 2, -depth / 2]} center>
    <span className="text-[10px] text-slate-400">{(maxValue / 2).toFixed(1)}</span>
   </Html>
   <Html position={[-width / 2 - 0.45, height, -depth / 2]} center>
    <span className="text-[10px] text-slate-400">{maxValue.toFixed(1)}</span>
   </Html>
  </>
 )
}

export default function ThreeDChart({ data, xKey, yKey }) {
 const bars = buildSeries(data, xKey, yKey)

 if (!data || data.length === 0) {
  return <div className="text-gray-400">Upload dataset to see 3D chart</div>
 }

 if (!xKey || !yKey || bars.length === 0) {
  return (
   <div className="flex h-[420px] items-center justify-center text-gray-400">
    Choose a category column and a numeric value column to render the 3D chart.
   </div>
  )
 }

 const maxValue = Math.max(...bars.map((bar) => Math.abs(bar.value)), 1)
 const chartHeight = 5.2
 const depth = 3.6
 const spacing = 1.2
 const width = Math.max((bars.length - 1) * spacing, 1.2)
 const distance = Math.max(width * 0.95, 8)

 return (
  <div className="relative h-[460px] overflow-hidden rounded-xl border border-white/10 bg-slate-950/70">
   <Canvas
    camera={{ position: [distance * 0.72, distance * 0.5, distance * 0.95], fov: 42 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, powerPreference: "high-performance" }}
    shadows
   >
    <color attach="background" args={["#020617"]} />
    <fog attach="fog" args={["#020617", distance, distance * 2.2]} />
    <ambientLight intensity={0.85} />
    <directionalLight
     castShadow
     intensity={1.25}
     position={[7, 10, 6]}
     shadow-mapSize-width={1024}
     shadow-mapSize-height={1024}
    />
    <pointLight intensity={0.45} position={[-5, 4, -3]} />

    <SceneControls target={[0, chartHeight / 2.8, 0]} distance={distance} />
    <SceneDecorations
     width={width}
     depth={depth}
     height={chartHeight}
     xLabel={xKey}
     yLabel={yKey}
     maxValue={maxValue}
    />

    {bars.map((bar, index) => {
     const height = Math.max((Math.abs(bar.value) / maxValue) * chartHeight, 0.35)
     const xPosition = index * spacing - ((bars.length - 1) * spacing) / 2

     return (
      <group key={bar.id}>
       <Bar
        position={[xPosition, height / 2, 0]}
        height={height}
        color={index % 2 === 0 ? "#22d3ee" : "#0ea5e9"}
       />
       <Html position={[xPosition, -0.15, 0.82]} center>
        <span className="max-w-16 text-center text-[10px] text-slate-300">{bar.label}</span>
       </Html>
       <Html position={[xPosition, height + 0.22, 0]} center>
        <span className="text-[10px] font-medium text-cyan-300">{bar.value.toFixed(1)}</span>
       </Html>
      </group>
     )
    })}

    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
     <planeGeometry args={[width + 4, depth + 3]} />
     <meshStandardMaterial color="#08111f" />
    </mesh>
   </Canvas>

   <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-300">
    Drag to rotate. Scroll to zoom. Shift + drag to pan.
   </div>
   <div className="pointer-events-none absolute sr-only">
    3D bar chart showing {yKey} by {xKey}.
   </div>
  </div>
 )
}
