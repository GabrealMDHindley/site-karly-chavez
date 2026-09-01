"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CORAL = new THREE.Color("#f0818a");
const PEACH = new THREE.Color("#f3a699");

function Constellation({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { base, phases, colors, pairs } = useMemo(() => {
    const rng = (seed: number) => {
      // deterministic layout so SSR/CSR and reloads agree
      let s = seed;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };
    const rand = rng(42);
    const base = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      base[i * 3] = (rand() - 0.5) * 16;
      base[i * 3 + 1] = (rand() - 0.5) * 9;
      base[i * 3 + 2] = (rand() - 0.5) * 6 - 2;
      phases[i] = rand() * Math.PI * 2;
      const c = CORAL.clone().lerp(PEACH, rand());
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const pairs: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = base[i * 3] - base[j * 3];
        const dy = base[i * 3 + 1] - base[j * 3 + 1];
        const dz = base[i * 3 + 2] - base[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < 4.6) pairs.push([i, j]);
      }
    }
    return { base, phases, colors, pairs };
  }, [count]);

  const positions = useMemo(() => new Float32Array(base), [base]);
  const linePositions = useMemo(
    () => new Float32Array(pairs.length * 6),
    [pairs]
  );

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useFrame(({ clock, pointer: p }) => {
    pointer.current.x += (p.x - pointer.current.x) * 0.04;
    pointer.current.y += (p.y - pointer.current.y) * 0.04;
    const t = reduced ? 0 : clock.elapsedTime * 0.25;

    for (let i = 0; i < count; i++) {
      positions[i * 3] = base[i * 3] + Math.sin(t + phases[i]) * 0.35;
      positions[i * 3 + 1] =
        base[i * 3 + 1] + Math.cos(t * 0.8 + phases[i] * 1.3) * 0.3;
      positions[i * 3 + 2] = base[i * 3 + 2];
    }
    for (let k = 0; k < pairs.length; k++) {
      const [i, j] = pairs[k];
      linePositions[k * 6] = positions[i * 3];
      linePositions[k * 6 + 1] = positions[i * 3 + 1];
      linePositions[k * 6 + 2] = positions[i * 3 + 2];
      linePositions[k * 6 + 3] = positions[j * 3];
      linePositions[k * 6 + 4] = positions[j * 3 + 1];
      linePositions[k * 6 + 5] = positions[j * 3 + 2];
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      attr.needsUpdate = true;
      pointsRef.current.rotation.y = pointer.current.x * 0.06;
      pointsRef.current.rotation.x = -pointer.current.y * 0.04;
    }
    if (linesRef.current) {
      const attr = linesRef.current.geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      attr.needsUpdate = true;
      linesRef.current.rotation.y = pointer.current.x * 0.06;
      linesRef.current.rotation.x = -pointer.current.y * 0.04;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#f0818a"
          transparent
          opacity={0.14}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function ConstellationScene() {
  const count =
    typeof window !== "undefined" && window.innerWidth < 768 ? 70 : 140;
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <Constellation count={count} />
    </Canvas>
  );
}
