import { useState } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { useSelector } from "react-redux";

export default function Object3D({ object, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const designers = useSelector((state) => state.designers.list);
  const sizeMap = { small: 1, normal: 2, large: 3 };
  const scale = sizeMap[object.size] || 1;
  let color = object.color;
  if (hovered) {
    const c = new THREE.Color(object.color);
    c.multiplyScalar(0.7);
    color = `#${c.getHexString()}`;
  }
  const designer = designers.find(d => d.id.toString() === object.attachedDesigner.toString());
  const designerName = designer ? designer.fullName : "Unknown";
  return (
    <mesh
      position={object.position}
      scale={[scale, scale, scale]}
      castShadow
      receiveShadow
      onClick={(e) => { e.stopPropagation(); onSelect() }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
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
