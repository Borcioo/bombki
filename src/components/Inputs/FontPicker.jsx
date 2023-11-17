import "react-fontpicker-ts/dist/index.css";
import FontPicker from "react-fontpicker-ts";
import { cn } from "lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";
import { Suspense } from "react";
import FontFaceObserver from "fontfaceobserver";

const FontSelect = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.settings);
  const printArea = useSelector((state) => state.printArea.printArea);
  const textId = useSelector((state) => state.textId.textId);

  const texts = settings?.printAreas?.find((printAreaSetting) => printAreaSetting.id === printArea.id)?.texts || [];
  const text = texts.find((t) => t.id === textId) || {};

  const handleFontChange = (font) => {
    const fontObserver = new FontFaceObserver(font);

    fontObserver.load().then(() => {
      dispatch(
        setSettings({
          ...settings,
          printAreas: settings.printAreas.map((area) =>
            area.id === printArea.id
              ? { ...area, texts: area.texts.map((t) => (t.id === textId ? { ...t, font: font } : t)) }
              : area
          ),
        })
      );
    });
  };

  return (
    <>
      <div className="w-full border-b-[1px] border-[#E0E0E0] pb-[19px]">
        <p style={{ fontFamily: text?.font || "Open Sans" }}>Current font:</p>
        <div className={cn("w-full relative")}>
          <Suspense fallback={<div>Loading...</div>}>
            <FontPicker
              autoLoad
              loadAllVariants
              defaultValue={text?.font || "Open Sans"}
              value={(font) => {
                handleFontChange(font);
              }}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default FontSelect;
