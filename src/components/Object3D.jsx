import { useState, useRef } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useSelector } from "react-redux";

export default function Object3D({ object, onSelect, selected, onMove }) {
  const [hovered, setHovered] = useState(false);
  const designers = useSelector((state) => state.designers.list);
  const sizeMap = { small: 1, normal: 2, large: 3 };
  const scale = sizeMap[object.size] || 1;
  let color = object.color;
  if (selected) {
    const c = new THREE.Color(object.color);
    c.offsetHSL(0, 0, -0.3);
    color = `#${c.getHexString()}`;
  }
  else if (hovered) {
    const c = new THREE.Color(object.color);
    c.multiplyScalar(0.7);
    color = `#${c.getHexString()}`;
  }

  const meshRef = useRef();
  const [dragging, setDragging] = useState(false);
  const designer = designers.find(d => d.id.toString() === object.attachedDesigner.toString());
  const designerName = designer ? designer.fullName : "Unknown";
  return (
    <mesh
      ref={meshRef}
      position={object.position}
      scale={[scale, scale, scale]}
      castShadow
      receiveShadow
      onClick={(e) => { e.stopPropagation(); onSelect() }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={(e) => {
        e.stopPropagation();
        setDragging(true);
        e.target.setPointerCapture(e.pointerId);
      }}
      onPointerUp={(e) => {
        setDragging(false);
        e.target.releasePointerCapture(e.pointerId);
      }}      
      onPointerMove={(e) => {
        if (!dragging) return;
        e.stopPropagation();

        const newPosition = [
          e.point.x,
          scale / 2,
          e.point.z,
        ];

        meshRef.current.position.set(...newPosition);
        onMove(newPosition);
      }}


    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />

      <Html
        transform
        center
        position={[0.1, 1.5, 0]}
        distanceFactor={4}
      >
        <div className="object-info">
          <strong>{object.name}</strong>
          <div>Designer: {designerName}</div>
        </div>
      </Html>
    </mesh>
  );
}
