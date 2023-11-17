import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import translations from "const/translations.json";

import { Environment, OrbitControls } from "@react-three/drei";
import { MeshStandardMaterial, TextureLoader } from "three";

const Model = ({ obj }) => {
  //eslint-disable-next-line
  return <primitive object={obj} scale={[0.05, 0.05, 0.05]} position={[0, 0, 0]} rotation={[0, 0, 0]} />;
};

export const ChristmasTreeView = ({ setShowTree, lang }) => {
  const [obj, setObj] = useState(null);
  const [woodTexture, setWoodTexture] = useState(null);
  const [leavesTexture, setLeavesTexture] = useState(null);
  const loadedObj = useLoader(OBJLoader, `/choinka3.obj`);

  useEffect(() => {
    if (loadedObj) {
      setObj(loadedObj);
    }
  }, [loadedObj]);

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      "/wood.jpg",
      (texture) => {
        setWoodTexture(texture);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the texture.", error);
      }
    );
    loader.load(
      "/leaves.jpg",
      (texture) => {
        setLeavesTexture(texture);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the texture.", error);
      }
    );
  }, []);

  useEffect(() => {
    if (woodTexture) {
      woodTexture.repeat.set(1, 1);
      woodTexture.offset.set(0, 0);
      woodTexture.encoding = 3001;

      const texturedMaterial = new MeshStandardMaterial({
        map: woodTexture,
      });

      const textureTargetChild = obj.children[1];
      if (textureTargetChild && textureTargetChild.isMesh) {
        textureTargetChild.material = texturedMaterial;
      }
    }
    if (leavesTexture) {
      leavesTexture.repeat.set(1, 1);
      leavesTexture.offset.set(0, 0);
      leavesTexture.encoding = 3001;

      const texturedMaterial = new MeshStandardMaterial({
        map: leavesTexture,
      });

      const textureTargetChild = obj.children[0];
      if (textureTargetChild && textureTargetChild.isMesh) {
        textureTargetChild.material = texturedMaterial;
      }
    }
  }, [woodTexture, leavesTexture]);

  return (
    <div className="w-screen h-screen absolute left-0 top-0 z-[190000]">
      {obj && (
        <Canvas
          className="h-full w-full"
          onCreated={({ camera }) => {
            camera.position.set(5, 0, 0);
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.8} />
            <Model obj={obj} />
            <Environment preset="park" background />
            <OrbitControls enableZoom enablePan={false} enableRotate={true} enableDamping />
          </Suspense>
        </Canvas>
      )}
      {obj && (
        <button
          onClick={() => setShowTree(false)}
          className="absolute top-2 right-2 p-2 bg-red-500 rounded-md text-white"
        >
          {translations[lang].back}
        </button>
      )}
    </div>
  );
};
