import { useState, useEffect, useRef, useMemo } from "react";
import { Option } from "components/Inputs/Option";
import bubblesList from "const/bubblesList";
import { useSelector, useDispatch } from "react-redux";
import { setBubble } from "store/bubbleSlice";
import { setSettings } from "store/settingsSlice";
import translations from "const/translations.json";

const SelectBauble = ({ lang }) => {
  const settings = useSelector((state) => state.settings.settings);
  const bubble = useSelector((state) => state.bubble.bubble);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (settings && bubble) {
      const oldSettings = settings;
      const oldAreas = oldSettings.printAreas;
      const defSettings = bubblesList.find((singleBubble) => singleBubble.id === bubble.id);
      const defAreas = defSettings.printAreas;
      const mergedAreas = defAreas.map((defArea) => {
        const oldArea = oldAreas.find((oldArea) => oldArea.id === defArea.id);
        if (oldArea) {
          return { ...defArea, ...oldArea, name: defArea.name };
        } else {
          return defArea;
        }
      });

      const mergedSettings = {
        ...defSettings,
        ...oldSettings,
        printAreas: mergedAreas,
        name: defSettings.name,
        filename: defSettings.filename,
      };

      dispatch(setSettings(mergedSettings));
    }
  }, [bubble]);

  const handleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (singleBubble) => {
    const userConfirmed = window.confirm(
      "Selecting bauble will can reset part of the changes. Do you want to proceed?"
    );

    if (userConfirmed) {
      dispatch(setBubble({ id: singleBubble.id, name: singleBubble.name }));

      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const availableBubbles = useMemo(() => {
    return bubblesList.filter((singleBubble) => singleBubble.id !== bubble.id);
  }, [bubble]);

  return (
    <div className="w-full flex flex-col items-start mt-[10px] gap-[10px]" ref={wrapperRef}>
      <p className="text-[18px] font-bold leading-[150%]">{translations[lang].tabs.bubbleSection.bubbles}</p>
      <div className="w-full relative">
        <button
          onClick={handleOpen}
          className="w-full relative flex flex-row justify-between bg-[#FCFDFF] items-center px-[24px] border-[1px] border-[#E0E0E0] rounded-[5px] py-[12px]"
        >
          <div className="flex flex-row gap-[14px] justify-center items-center">
            <p>{bubble.name}</p>
          </div>
          <div className={`px-[6px] py-[6px] ease duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 7L10 14L17 7" stroke="#8C8C8C" strokeWidth="2" />
            </svg>
          </div>
        </button>
        <div
          className={`${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } bg-[#FCFDFF] mt-[1px] ease duration-300 cursor-default absolute w-full top-[100%] left-0 z-50`}
        >
          {isOpen &&
            availableBubbles.map((singleBubble, index) => (
              <Option option={singleBubble} key={index} onClick={() => handleSelect(singleBubble)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SelectBauble;
