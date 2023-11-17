import { MoveButton } from "components/MoveButton";
import { useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";
import translations from "const/translations.json";

export const TextControls = ({ settings, printArea, textId, lang }) => {
  const dispatch = useDispatch();

  const offsetImage = ({ settings, direction, setSettings }) => {
    const texts = settings.printAreas.find((area) => area.id === printArea.id).texts;
    const text = texts.find((t) => t.id === textId);
    const step = 25;

    let newPositionX = text.position.x;
    let newPositionY = text.position.y;

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
        printAreas: settings.printAreas.map((area) =>
          area.id === printArea.id
            ? {
                ...area,
                texts: area.texts.map((t) =>
                  t.id === textId ? { ...t, position: { x: newPositionX, y: newPositionY } } : t
                ),
              }
            : area
        ),
      })
    );
  };

  const resetTextPosition = () => {
    dispatch(
      setSettings({
        ...settings,
        printAreas: settings.printAreas.map((area) =>
          area.id === printArea.id
            ? {
                ...area,
                texts: area.texts.map((t) => (t.id === textId ? { ...t, position: { x: 512, y: 512 } } : t)),
              }
            : area
        ),
      })
    );
  };

  return (
    <div className="flex flex-col w-full gap-[10px]">
      <div className="flex flex-wrap justify-center flex-col xl:flex-nowrap xl:flex-row w-full items-center gap-[8px] lg:gap-[16px]">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 flex items-center justify-center">
            <MoveButton
              className="w-[55px] h-[55px]"
              name={translations[lang].tabs.textSection.options.up}
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
              name={translations[lang].tabs.textSection.options.left}
              onClick={() =>
                offsetImage({
                  direction: "left",
                  settings,
                  setSettings,
                })
              }
            />
            <button onClick={resetTextPosition} className="w-[55px] h-[55px] rounded-[5px] bg-red-300">
              {translations[lang].tabs.textSection.options.reset}
            </button>
            <MoveButton
              className="w-[55px] h-[55px]"
              name={translations[lang].tabs.textSection.options.right}
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
              name={translations[lang].tabs.textSection.options.down}
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
