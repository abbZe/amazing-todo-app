import { Box } from '@mui/material'
import { MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { memo } from 'react'

type TasksPlaceholderCanvasProps = {
  themeMode: string
}

export const TasksPlaceholderCanvas: React.FC<TasksPlaceholderCanvasProps> = memo(({ themeMode }) => {
  return (
    <Box sx={{ position: 'relative', top: '10vh' }}>
      <Canvas
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          width: '100vw',
          height: '40vh',
          zIndex: '0',
        }}
      >
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={1} />
        <directionalLight position={[3, 3, 3]} />

        <Sphere args={[1, 100, 200]} scale={2.5}>
          <MeshDistortMaterial
            color={themeMode === 'dark' ? '#9b3cb9' : '#2aa198'}
            attach="material"
            distort={0.5}
            speed={1.7}
          />
        </Sphere>
      </Canvas>
    </Box>
  )
})
