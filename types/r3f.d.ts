import { ThreeElements } from '@react-three/fiber'

declare global {
  namespace JSX {
    // Extiende los elementos intrínsecos para reconocer etiquetas de three-fiber como <mesh/>
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {}
