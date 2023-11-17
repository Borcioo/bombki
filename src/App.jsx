import { useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader, MeshStandardMaterial, Color } from "three";
import SideNav from "components/SideNav";
import Canvas3D from "components/Canvas3D";
import { Modal } from "components/Modal";
// import { ChristmasTreeView } from "components/ChristmasTreeView";
import InvisibleCanvas from "components/InvisibleCanvas";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import { setObj } from "@/store/objSlice";
import { useDispatch } from "react-redux";

function App(props) {
  // eslint-disable-next-line no-unused-vars
  const [lang, setLang] = useState(props.lang);
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.settings.settings);
  const obj = useSelector((state) => state.obj.obj);
  const texturesImages = useSelector((state) => state.texturesImages.texturesImages);
  const [objURL, setObjURL] = useState(settings?.filename);
  const loadedObj = useLoader(OBJLoader, `/${objURL}`);
  const [objLoading, setObjLoading] = useState(true);
  // const [showTree, setShowTree] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const handleShowTree = () => {
  //   setShowTree((prevState) => !prevState);
  // };

  const generateTexturesFromImages = (texturesImages) => {
    const textures = texturesImages.map((image) => {
      const texture = new TextureLoader().load(
        image.path,
        (texture) => {
          texture.offset.set(0, 0);
          texture.repeat.set(1, 1);
          texture.encoding = 3001;
        },
        () => {},
        (err) => {
          console.log(err);
        }
      );
      return { name: image.name, texture };
    });
    return textures;
  };

  useEffect(() => {
    if (loadedObj) {
      dispatch(setObj(loadedObj));
      setObjLoading(false);
    }
  }, [loadedObj]);

  useEffect(() => {
    if (settings?.filename && settings?.filename !== objURL) {
      setObjURL(settings?.filename);
    }
  }, [settings?.filename]);

  useEffect(() => {
    if (obj) {
      let textures = [];
      if (texturesImages.length > 0) {
        textures = generateTexturesFromImages(texturesImages);
      }

      const colorMaterial = new MeshStandardMaterial({
        color: new Color(settings?.bubbleColor),
      });

      obj.children.forEach((area) => {
        if (area.name === "bubble") {
          area.material = colorMaterial;
        } else {
          const textureByArea = textures.find((texture) => texture.name === area.name)?.texture || null;

          const texturedMaterial = new MeshStandardMaterial({
            map: textureByArea,
          });

          area.material = texturedMaterial;
        }
      });
    }
  }, [texturesImages]);

  return (
    <main className="flex flex-row h-screen w-screen flex-wrap sm:flex-nowrap">
      {objLoading && (
        <div className="w-full h-[50%] relative flex flex-col sm:h-screen justify-center items-center">Loading...</div>
      )}
      {!objLoading && <Canvas3D lang={lang} obj={obj} settings={settings} />}
      <Suspense fallback={null}>
        <SideNav setShowModal={setShowModal} lang={lang} />
      </Suspense>
      <Modal lang={lang} showModal={showModal} setShowModal={setShowModal} />
      <InvisibleCanvas />
      {/* {showTree && lang && <ChristmasTreeView lang={lang} setShowTree={setShowTree} />} */}
    </main>
  );
}

export default App;
