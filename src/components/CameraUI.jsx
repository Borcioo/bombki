import { MoveButton } from "components/MoveButton";
import translations from "const/translations.json";

const CameraUI = ({ cameraSettings, setCameraPosition, lang }) => (
  <div className="items-start justify-center flex flex-row gap-[8px] relative sm:absolute sm:top-[10px] left-[10px] z-[10000] p-1">
    {cameraSettings.map((setting, index) => (
      <MoveButton
        name={translations[lang].canvas[setting.name.toLowerCase()]}
        key={index}
        onClick={() => setCameraPosition(setting.name)}
        className="bg-[#fff] p-2 min-w-[60px] text-sm"
      />
    ))}
  </div>
);

export default CameraUI;
