import { Alert, Box } from '@mui/material'
import { MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

type TasksPlaceholderProps = {
  themeMode: 'light' | 'dark'
}

export const TasksPlaceholder: React.FC<TasksPlaceholderProps> = ({ themeMode }) => {
  const alertBg = () => themeMode === 'dark' ? '#121212' : '#fdf6e3'
  const alertText = () => themeMode === 'dark' ? '#fff' : '#657b83'

  return (
    <>
      {location.pathname === '/favorite' ? (
        <Alert sx={{ backgroundColor: `${alertBg()}`, color: `${alertText()}` }} severity="info">
          Пусто, самое время добавить что-нибудь в избранное
        </Alert>
      ) : (
        <Alert sx={{ backgroundColor: `${alertBg()}`, color: `${alertText()}` }} severity="info">
          Время создать заметку
        </Alert>
      )}
      <Box sx={{ position: 'relative', top: '10vh' }}>
        <Canvas
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            width: '100vw',
            height: '22rem',
            zIndex: '0',
          }}
        >
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={1} />
          <directionalLight position={[3, 3, 3]} />

          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial color={themeMode === 'dark' ? "#9b3cb9" : "#2aa198"} attach="material" distort={0.5} speed={1.7} />
          </Sphere>
        </Canvas>
      </Box>
    </>
  )
}
