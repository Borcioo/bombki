import { useRef, useCallback } from "react";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";
import translations from "const/translations.json";

const BaubleColor = ({ lang }) => {
  const settings = useSelector((state) => state.settings.settings);
  const dispatch = useDispatch();

  const inputRef = useRef();

  const debouncedColorUpdate = useCallback(
    debounce((color) => {
      dispatch(setSettings({ ...settings, bubbleColor: color }));
    }, 300),
    [settings]
  );

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    debouncedColorUpdate(newColor);
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="w-full flex flex-col items-start gap-[10px]">
      <p className="text-[18px] font-bold leading-[150%]">{translations[lang].tabs.bubbleSection.bubbleColor}</p>
      <button
        className="w-full flex flex-row justify-between items-center px-[24px] border-[1px] bg-[#FCFDFF] border-[#E0E0E0] rounded-[5px] py-[12px]"
        onClick={handleButtonClick}
      >
        <div className="flex flex-row gap-[14px] justify-center items-center">
          <input
            className="min-w-[36px] min-h-[36px] bg-[#E0E0E0] rounded-[3px] webkit-appearance-none appearance-none"
            type="color"
            value={settings?.bubbleColor}
            onChange={handleColorChange}
            ref={inputRef}
          />
          <p>{settings?.bubbleColor.toUpperCase()}</p>
        </div>

        <div className="px-[6px] py-[6px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M14.9999 8.33332L11.6666 4.99999M2.08325 17.9167L4.90356 17.6033C5.24813 17.565 5.42042 17.5459 5.58146 17.4937C5.72433 17.4475 5.86029 17.3821 5.98566 17.2995C6.12696 17.2063 6.24954 17.0837 6.49469 16.8386L17.4999 5.83332C18.4204 4.91285 18.4204 3.42046 17.4999 2.49999C16.5795 1.57951 15.0871 1.57951 14.1666 2.49999L3.16136 13.5052C2.91621 13.7504 2.79363 13.8729 2.70045 14.0142C2.61778 14.1396 2.55243 14.2756 2.50618 14.4185C2.45405 14.5795 2.43491 14.7518 2.39662 15.0964L2.08325 17.9167Z"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default BaubleColor;
