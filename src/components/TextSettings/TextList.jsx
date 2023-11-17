import { useSelector, useDispatch } from "react-redux";
import { setSettings, setTextArea } from "@/store/settingsSlice";
import { setTextId } from "@/store/textIdSlice";
import { cn } from "lib/utils";
import translations from "const/translations.json";

const TextList = ({ lang }) => {
  const settings = useSelector((state) => state.settings.settings);
  const printArea = useSelector((state) => state.printArea.printArea);
  const textId = useSelector((state) => state.textId.textId);

  const renderText = (id) => {
    return `${translations[lang].tabs.textSection.textsList} (${translations[lang].tabs.textSection.selected} ${
      id ? translations[lang].tabs.textSection.title + " " + selectedTextItem : "none"
    })`;
  };

  const dispatch = useDispatch();

  const texts = settings?.printAreas?.find((printAreaSetting) => printAreaSetting.id === printArea.id)?.texts || [];
  const selectedTextItem = texts.find((textItem) => textItem.id === textId)
    ? texts.findIndex((textItem) => textItem.id === textId) + 1 || null
    : null;

  return (
    <div className="flex flex-col gap-[16px] w-full">
      <div className="flex flex-row items-center justify-between border-b-[1px] border-[#E0E0E0] pb-[10px]">
        <p className="text-[18px] leading-[150%] font-bold">{renderText(textId)}</p>
        {texts.length < 3 && (
          <button
            onClick={() => {
              dispatch(setTextArea());
            }}
            className={cn("rounded-[5px] text-center border-[1px] border-[#E0E0E0] bg-[#fff] p-2 min-w-[70px] text-sm")}
          >
            {translations[lang].tabs.textSection.add}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-[16px] w-full">
        {texts.map((text, index) => (
          <div key={text.id} className="flex flex-row items-center justify-between">
            <p className="text-[18px] leading-[150%] font-bold">
              {translations[lang].tabs.textSection.title} {index + 1}
            </p>
            <div className="flex flex-row items-center justify-between gap-1">
              <button
                onClick={() => {
                  dispatch(
                    setSettings({
                      ...settings,
                      printAreas: settings.printAreas.map((area) => {
                        return area.id === printArea.id
                          ? { ...area, texts: area.texts.filter((textItem) => textItem.id !== text.id) }
                          : area;
                      }),
                    })
                  );
                  dispatch(setTextId(null));
                }}
                className="rounded-[5px] text-center border-[1px] border-[#E0E0E0] bg-[#fff] p-2 min-w-[70px] text-sm"
              >
                {translations[lang].tabs.textSection.remove}
              </button>
              <button
                onClick={() => {
                  dispatch(setTextId(text.id));
                }}
                className="rounded-[5px] text-center border-[1px] border-[#E0E0E0] bg-[#fff] p-2 min-w-[70px] text-sm"
              >
                {translations[lang].tabs.textSection.edit}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextList;
