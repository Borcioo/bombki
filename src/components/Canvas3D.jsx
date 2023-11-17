import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import CameraControls from "components/CameraControls";
import CameraUI from "components/CameraUI";
import ViewOnTreeButton from "components/ViewOnTreeButton";
import cameraSettings from "const/cameraSettings";

const Model = ({ obj }) => {
  //eslint-disable-next-line
  return <primitive object={obj} scale={[0.05, 0.05, 0.05]} position={[0, 0, 0]} rotation={[0, 0, 0]} />;
};

const Canvas3D = ({ handleShowTree, obj, lang }) => {
  const [currentPosition, setCurrentPosition] = useState("front");

  return (
    <div className="w-full h-[50%] relative flex flex-col sm:h-screen">
      <CameraUI lang={lang} cameraSettings={cameraSettings} setCameraPosition={setCurrentPosition} />
      {/* <ViewOnTreeButton lang={lang} handleShowTree={handleShowTree} /> */}
      <Canvas
        className="h-full w-full"
        onCreated={({ camera }) => {
          camera.position.set(5, 0, 0);
        }}
      >
        <Suspense fallback={null}>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <ambientLight intensity={1.8} />
          <Model obj={obj} />
          <CameraControls activePosition={currentPosition} />
          <Environment preset="city" />
          <ContactShadows frames={1} scale={6} position={[0, -3, 0]} far={3} blur={5} opacity={0.4} color="#204080" />
          <OrbitControls enableZoom enablePan={false} enableRotate={true} dampingFactor={0.1} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Canvas3D;
