// Fallback JSX IntrinsicElements to unblock build when custom JSX elements (e.g., R3F primitives) are not typed
// Note: This is a permissive typing to prevent TS errors for unknown JSX tags like <group>, <mesh>, etc.
// If you want stricter typing, ensure @react-three/fiber ThreeElements augmentation is correctly picked up.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}
export {}
