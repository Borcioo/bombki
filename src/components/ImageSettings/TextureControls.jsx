import { MoveButton } from "components/MoveButton";
import { canvasSize } from "const/canvasSettings";
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";
import translations from "const/translations.json";

export const TextureControls = ({ lang }) => {
  const settings = useSelector((state) => state.settings.settings);
  const printArea = useSelector((state) => state.printArea.printArea);
  const dispatch = useDispatch();

  const offsetImage = ({ settings, direction, setSettings }) => {
    const image = settings.printAreas.find((area) => area.id === printArea.id).image;
    if (image.src === null) {
      window.alert("Import texture image first");
    } else {
      const step = 25;
      let newPositionX = image.offset.x;
      let newPositionY = image.offset.y;

      switch (direction) {
        case "left":
          newPositionX -= step;
          break;
        case "right":
          newPositionX += step;
          break;
        case "up":
          newPositionY -= step;
          break;
        case "down":
          newPositionY += step;
          break;
        default:
          break;
      }

      dispatch(
        setSettings({
          ...settings,
          printAreas: settings.printAreas.map((area) => {
            return area.id === printArea.id
              ? { ...area, image: { ...area.image, offset: { x: newPositionX, y: newPositionY } } }
              : area;
          }),
        })
      );
    }
  };

  const resetOffsetImage = () => {
    const index = settings.printAreas.findIndex((area) => area.id === printArea.id);
    const canvasCenterX = canvasSize.width / 2;
    const canvasCenterY = canvasSize.height / 2;
    const imgScale = settings.printAreas[index].image.scale;
    const imagePositionX = canvasCenterX - (settings.printAreas[index].image.width * imgScale) / 2;
    const imagePositionY = canvasCenterY - (settings.printAreas[index].image.height * imgScale) / 2;

    dispatch(
      setSettings({
        ...settings,
        printAreas: settings.printAreas.map((area) => {
          return area.id === printArea.id
            ? { ...area, image: { ...area.image, offset: { x: imagePositionX, y: imagePositionY } } }
            : area;
        }),
      })
    );
  };

  return (
    <div className="flex flex-col w-full gap-[10px]">
      <div className="flex flex-wrap flex-col xl:flex-nowrap xl:flex-row w-full mt-[19px] justify-center items-center gap-[8px] lg:gap-[16px]">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 flex items-center justify-center">
            <MoveButton
              className="w-[55px] h-[55px]"
              name={translations[lang].tabs.imageSection.options.up}
              onClick={() =>
                offsetImage({
                  direction: "up",
                  settings,
                  setSettings,
                })
              }
            />
          </div>
          <div className="col-span-3 flex gap-4 items-center justify-center">
            <MoveButton
              className="w-[55px] h-[55px]"
              name={translations[lang].tabs.imageSection.options.left}
              onClick={() =>
                offsetImage({
                  direction: "left",
                  settings,
                  setSettings,
                })
              }
            />
            <button onClick={resetOffsetImage} className="w-[55px] h-[55px] rounded-[5px] bg-red-300">
              Reset
            </button>
            <MoveButton
              className="w-[55px] h-[55px]"
              name={translations[lang].tabs.imageSection.options.right}
              onClick={() =>
                offsetImage({
                  direction: "right",
                  settings,
                  setSettings,
                })
              }
            />
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <MoveButton
              className="w-[55px] h-[55px]"
              name={translations[lang].tabs.imageSection.options.down}
              onClick={() =>
                offsetImage({
                  direction: "down",
                  settings,
                  setSettings,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
