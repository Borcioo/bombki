import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";

const AlignCenter = () => {
  const settings = useSelector((state) => state.settings.settings);
  const printArea = useSelector((state) => state.printArea.printArea);
  const textId = useSelector((state) => state.textId.textId);
  const dispatch = useDispatch();

  const texts = settings?.printAreas?.find((printAreaSetting) => printAreaSetting.id === printArea.id)?.texts || [];
  const text = texts.find((t) => t.id == textId);

  const handleTextChangeOptions = () => {
    dispatch(
      setSettings({
        ...settings,
        printAreas: settings.printAreas.map((area) =>
          area.id === printArea.id
            ? { ...area, texts: area.texts.map((t) => (t.id === textId ? { ...t, align: "center" } : t)) }
            : area
        ),
      })
    );
  };

  return (
    <button
      onClick={() => handleTextChangeOptions()}
      className={`p-1 border-[2px] rounded-[3px] ${
        text?.align === "center" ? "border-[#2EA3F2]" : "border-transparent"
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 10H6M21 6H3M21 14H3M18 18H6"
          stroke={text?.align === "center" ? "#2EA3F2" : "#333333"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default AlignCenter;
