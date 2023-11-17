import { useState, useEffect, useRef } from "react";
import { Option } from "components/Inputs/Option";
import bubblesList from "const/bubblesList";
import { useSelector, useDispatch } from "react-redux";
import { setPrintArea } from "@/store/printAreaSlice";
import translations from "const/translations.json";

const SelectArea = ({ lang }) => {
  const bubble = useSelector((state) => state.bubble.bubble);
  const printArea = useSelector((state) => state.printArea.printArea);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [areasList, setAreasList] = useState([]);
  const wrapperRef = useRef(null);

  const getPrintAreas = (bubbleId) => {
    return bubblesList.find((bubble) => bubble.id === bubbleId).printAreas;
  };

  useEffect(() => {
    const availableBAreas = getPrintAreas(bubble.id).filter((area) => area.id !== printArea.id);
    setAreasList(availableBAreas);
  }, [bubble, printArea]);

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

  const handleOpen = () => {
    if (areasList.length > 0) {
      setIsOpen((prevState) => !prevState);
    }
  };

  const handleSelect = (option) => {
    dispatch(setPrintArea({ id: option.id, name: option.name }));
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-start gap-[10px]" ref={wrapperRef}>
      <p className="text-[18px] font-bold leading-[150%]">{translations[lang].tabs.bubbleSection.printArea}</p>
      <div className="w-full relative">
        <button
          onClick={handleOpen}
          className="w-full relative flex flex-row justify-between bg-[#FCFDFF] items-center px-[24px] border-[1px] border-[#E0E0E0] rounded-[5px] py-[12px]"
        >
          <div className="flex flex-row gap-[14px] justify-center items-center">
            <p>{printArea.name}</p>
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
            areasList.map((area, index) => <Option option={area} key={index} onClick={() => handleSelect(area)} />)}
        </div>
      </div>
    </div>
  );
};

export default SelectArea;
