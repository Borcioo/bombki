import { useCallback } from "react";
import { debounce } from "lodash";
import SizeChanger from "components/SizeComponents/SizeChanger";
import FontSelect from "components/Inputs/FontPicker";
import ColorPicker from "components/Inputs/ColorPicker";
import { useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";
import translations from "const/translations.json";

const FontDetails = ({ settings, printArea, textId, lang }) => {
  const dispatch = useDispatch();

  const texts = settings?.printAreas?.find((printAreaSetting) => printAreaSetting.id === printArea.id)?.texts || [];
  const text = texts.find((t) => t.id === textId);

  const currentFontSize = text?.size || 0;
  const currentStrokeSize = text?.stroke?.width || 0;
  const currentFontColor = text?.color || "#000000";
  const currentStrokeColor = text?.stroke?.color || "#000000";

  const setFontValue = (value) => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue < 1) return;

    dispatch(
      setSettings({
        ...settings,
        printAreas: settings.printAreas.map((area) =>
          area.id === printArea.id
            ? {
                ...area,
                texts: area.texts.map((t) => (t.id === textId ? { ...t, size: parsedValue } : t)),
              }
            : area
        ),
      })
    );
  };

  const setStrokeValue = (value) => {
    const parsedValue = parseInt(value, 10);
    if (parsedValue < 1) return;

    dispatch(
      setSettings({
        ...settings,
        printAreas: settings.printAreas.map((area) =>
          area.id === printArea.id
            ? {
                ...area,
                texts: area.texts.map((t) =>
                  t.id === textId ? { ...t, stroke: { ...t.stroke, width: parsedValue } } : t
                ),
              }
            : area
        ),
      })
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedColorUpdate = useCallback(
    debounce((color) => {
      dispatch(
        setSettings({
          ...settings,
          printAreas: settings.printAreas.map((area) =>
            area.id === printArea.id
              ? { ...area, texts: area.texts.map((t) => (t.id === textId ? { ...t, color: color } : t)) }
              : area
          ),
        })
      );
    }, 300),
    [printArea, setSettings, settings]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceStrokeColorUpdate = useCallback(
    debounce((color) => {
      dispatch(
        setSettings({
          ...settings,
          printAreas: settings.printAreas.map((area) =>
            area.id === printArea.id
              ? {
                  ...area,
                  texts: area.texts.map((t) => (t.id === textId ? { ...t, stroke: { ...t.stroke, color: color } } : t)),
                }
              : area
          ),
        })
      );
    }, 300),
    [printArea, setSettings, settings]
  );

  return (
    <div className="w-full flex flex-col items-start gap-[10px]">
      <p className="text-[18px] font-bold leading-[150%] ">{translations[lang].tabs.textSection.fontDetails}</p>
      <FontSelect />
      <SizeChanger
        value={currentFontSize}
        onChange={(value) => setFontValue(value)}
        title={translations[lang].tabs.textSection.fontSize}
      />
      <ColorPicker onChange={(e) => debouncedColorUpdate(e.target.value)} value={currentFontColor} />
      <SizeChanger
        value={currentStrokeSize}
        onChange={(value) => setStrokeValue(value)}
        title={translations[lang].tabs.textSection.strokeWidth}
      />
      <ColorPicker onChange={(e) => debounceStrokeColorUpdate(e.target.value)} value={currentStrokeColor} />
    </div>
  );
};

export default FontDetails;
