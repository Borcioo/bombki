import { useRef } from "react";
import { canvasSize } from "const/canvasSettings";
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";
import translations from "const/translations.json";

const ImageUpload = ({ lang }) => {
  const settings = useSelector((state) => state.settings.settings);
  const printArea = useSelector((state) => state.printArea.printArea);
  const dispatch = useDispatch();

  const inputRef = useRef();
  const image = settings?.printAreas?.find((area) => area.id === printArea.id)?.image || {};

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;

        const img = new Image();
        img.src = base64String;

        img.onload = () => {
          const imageWidth = img.naturalWidth;
          const imageHeight = img.naturalHeight;
          const canvasCenterX = canvasSize.width / 2;
          const canvasCenterY = canvasSize.height / 2;
          const imagePositionX = canvasCenterX - imageWidth / 2;
          const imagePositionY = canvasCenterY - imageHeight / 2;

          dispatch(
            setSettings({
              ...settings,
              printAreas: settings.printAreas.map((area) =>
                area.id === printArea.id
                  ? {
                      ...area,
                      image: {
                        ...area.image,
                        src: base64String,
                        name: event.target.files[0].name,
                        scale: 1,
                        width: imageWidth,
                        height: imageHeight,
                        offset: { x: imagePositionX, y: imagePositionY },
                      },
                    }
                  : area
              ),
            })
          );
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleDeleteImage = () => {
    inputRef.current.value = "";
    dispatch(
      setSettings({
        ...settings,
        printAreas: settings.printAreas.map((area) =>
          area.id === printArea.id ? { ...area, image: { ...area.image, src: null, name: null } } : area
        ),
      })
    );
  };

  return (
    <div className="mt-[10px] w-full flex flex-col items-start gap-[10px]">
      <p className="text-[18px] font-bold leading-[150%]">{translations[lang].tabs.imageSection.subtitle}</p>
      <div className="w-full flex flex-row justify-between bg-[#FCFDFF] items-center px-[24px] border-[1px] border-[#E0E0E0] rounded-[5px] py-[12px]">
        <label className="flex flex-row gap-[14px] justify-center items-center cursor-pointer">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          {image.src ? (
            <img
              className="w-[36px] h-[36px] bg-[#E0E0E0] rounded-[3px] object-cover
            "
              src={image.src}
            />
          ) : (
            <div className="w-[36px] h-[36px] bg-[#E0E0E0] rounded-[3px]"></div>
          )}

          <p>{image.src ? image.name : `${translations[lang].tabs.imageSection.button}`}</p>
        </label>
        <button
          className="px-[6px] py-[6px]"
          onClick={() => {
            if (image.src) {
              handleDeleteImage();
            } else {
              document.getElementById("fileInput").click();
            }
          }}
        >
          {/* if image.src rotate icon 45deg */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="transition-all duration-300"
            style={image.src ? { transform: "rotate(45deg)" } : {}}
          >
            <path d="M10 2V18M18 10H2" stroke={image.src ? "#2EA3F2" : "#333333 "} strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
