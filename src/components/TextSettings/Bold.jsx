import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";

const Bold = () => {
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
            ? { ...area, texts: area.texts.map((t) => (t.id === textId ? { ...t, bold: !t.bold } : t)) }
            : area
        ),
      })
    );
  };

  return (
    <button
      onClick={() => handleTextChangeOptions()}
      className={`p-1 border-[2px] rounded-[3px] ${text?.bold ? "border-[#2EA3F2]" : "border-transparent"}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 12H14C16.2091 12 18 10.2091 18 8C18 5.79086 16.2091 4 14 4H6V12ZM6 12H15C17.2091 12 19 13.7909 19 16C19 18.2091 17.2091 20 15 20H6V12Z"
          stroke={text?.bold ? "#2EA3F2" : "#333333"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default Bold;
