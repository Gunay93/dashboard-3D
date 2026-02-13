import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addObject, updateObject } from "../redux/object/objectsSlice";
import Object3D from "../components/Object3D";

export default function Editor() {
  const objects = useSelector((state) => state.objects.items);
  const designers = useSelector((state) => state.designers.list);
  const dispatch = useDispatch();
  const [selectedObjectId, setSelectedObjectId] = useState(null);

  const handleDoubleClick = (event) => {
    event.stopPropagation();
    const { point } = event;

    const designerId =
      designers.length > 0 ? designers[0].id : null;

    if (!designerId) return;

    const newObj = {
      id: Date.now(),
      name: "New Object",
      attachedDesigner: designerId,
      color: "#ff9900",
      position: [point.x, 0.5, point.z],
      size: "normal",
    };

    dispatch(addObject(newObj));
  };

  const handleUpdateObject = (id, changes) => {
    dispatch(updateObject({ id, changes }));
  };

  const selectedObject = objects.find(
    (obj) => obj.id === selectedObjectId
  );
  return (
    <div
      className="canvas-wrapper"
    >
      <div>
        <Canvas

          shadows
          camera={{ position: [0, 0, 16], fov: 40 }}
        >
          <color attach="background" args={["#ffffff"]} />

          <ambientLight intensity={0.8} />
          <directionalLight
            castShadow
            position={[10, 15, 10]}
            intensity={1.2}
          />

          <OrbitControls maxPolarAngle={Math.PI / 2.1} />

          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
            onDoubleClick={handleDoubleClick}
          >
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial color="white" roughness={1}
              metalness={0} />
          </mesh>

          {objects.map((obj) => (
            <Object3D
              key={obj.id}
              object={obj}
              selected={obj.id === selectedObjectId}
              onSelect={() => setSelectedObjectId(obj.id)}
              onMove={(newPos) =>
                handleUpdateObject(obj.id, { position: newPos })
              }
            />
          ))}
        </Canvas>
      </div>

      {selectedObject && (
        <div className="editor-panel">
          <h3>Edit Object</h3>

          <label htmlFor="selectedColor">Color:</label>
          <input
            type="color"
            name="selectedColor"
            id="selectedColor"
            value={selectedObject.color || '#ff0000'}
            onChange={(e) =>
              handleUpdateObject(selectedObject.id, {
                color: e.target.value,
              })
            }
          />

          <label htmlFor="selectedSize">Size:</label>
          <select
            name="selectedSize"
            id="selectedSize"
            value={selectedObject.size}
            onChange={(e) =>
              handleUpdateObject(selectedObject.id, {
                size: e.target.value,
              })
            }
          >
            <option value="small">Small</option>
            <option value="normal">Normal</option>
            <option value="large">Large</option>
          </select>

          <label htmlFor="attachedDesigner">Attached Designer:</label>
          <select
            name="attachedDesigner"
            id="attachedDesigner"
            value={selectedObject.attachedDesigner}
            onChange={(e) =>
              handleUpdateObject(selectedObject.id, {
                attachedDesigner: e.target.value,
              })
            }
          >
            {designers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.fullName}
              </option>
            ))}
          </select>
        </div>
      )}

    </div>
  );
}
