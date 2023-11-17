import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import cameraSettings from "const/cameraSettings";

const CameraControls = ({ activePosition }) => {
  const { camera } = useThree();
  const prevPosition = useRef(activePosition);

  useEffect(() => {
    if (!camera) return;

    camera.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
  }, [camera]);

  useEffect(() => {
    if (!camera) return;

    if (activePosition && prevPosition.current !== activePosition) {
      const newPosition = cameraSettings.find((p) => p.name === activePosition).position;
      camera.position.set(...newPosition);

      prevPosition.current = activePosition;
    }
  }, [activePosition, camera]);

  return null;
};

export default CameraControls;
