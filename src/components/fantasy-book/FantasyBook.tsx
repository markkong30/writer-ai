'use client';

import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Book from './Model';

const Model = () => {
  return (
    <Canvas camera={{ position: [200, 200, 200], fov: 25 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 2, 1]} />
        <Book />
        <OrbitControls autoRotate />
      </Suspense>
    </Canvas>
  );
};

export default Model;
