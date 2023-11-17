import { useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";
import AlignCenter from "../TextSettings/AlignCenter";
import AlignLeft from "../TextSettings/AlignLeft";
import AlignRight from "../TextSettings/AlignRight";
import Bold from "../TextSettings/Bold";
import Underline from "../TextSettings/Underline";
import Italic from "../TextSettings/Italic";
import translations from "const/translations.json";

const Text = ({ settings, printArea, textId, lang }) => {
  const dispatch = useDispatch();

  const texts = settings?.printAreas?.find((printAreaSetting) => printAreaSetting.id === printArea.id)?.texts || [];
  const text = texts.find((t) => t.id == textId)?.content || "";

  const handleInputChange = (e) => {
    dispatch(
      setSettings({
        ...settings,
        printAreas: settings.printAreas.map((area) =>
          area.id === printArea.id
            ? { ...area, texts: area.texts.map((t) => (t.id === textId ? { ...t, content: e.target.value } : t)) }
            : area
        ),
      })
    );
  };

  return (
    <div className="w-full flex flex-col items-start gap-[10px]">
      <p className="text-[18px] font-bold leading-[150%]">{translations[lang].tabs.textSection.title}</p>
      <div className="w-full flex flex-row items-center">
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-row">
            <AlignLeft />
            <AlignCenter />
            <AlignRight />
          </div>
          <div className="flex flex-row gap-1">
            <Bold />
            <Italic />
            <Underline />
          </div>
        </div>
      </div>
      <textarea
        onChange={(e) => handleInputChange(e)}
        value={text}
        placeholder="Placeholder text"
        className="text-[16px]  px-4 py-[10px] w-full resize-none min-h-[120px] rounded-[7px] border-[1px] border-[#E0E0E0]"
      />
    </div>
  );
};

export default Text;
