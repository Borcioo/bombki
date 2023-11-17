import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";

const Underline = () => {
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
            ? { ...area, texts: area.texts.map((t) => (t.id === textId ? { ...t, underline: !t.underline } : t)) }
            : area
        ),
      })
    );
  };

  return (
    <button
      onClick={() => handleTextChangeOptions()}
      className={`p-1 border-[2px] rounded-[3px] ${text?.underline ? "border-[#2EA3F2]" : "border-transparent"}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 4V11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11V4M4 21H20"
          stroke={text?.underline ? "#2EA3F2" : "#333333"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default Underline;
