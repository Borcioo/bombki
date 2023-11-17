import { Slider } from "components/Slider";
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";

export const Zoom = () => {
  const settings = useSelector((state) => state.settings.settings);
  const printArea = useSelector((state) => state.printArea.printArea);
  const dispatch = useDispatch();

  const getZoom = ({ settings, printArea }) => {
    const image = settings.printAreas.find((area) => area.id === printArea.id).image || {};
    const imgScale = image.scale || 1;

    const zoom = imgScale * 100;
    return zoom;
  };

  const handleZoomSlide = (value) => {
    const newScale = value / 100;

    dispatch(
      setSettings({
        ...settings,
        printAreas: settings.printAreas.map((area) =>
          area.id === printArea.id ? { ...area, image: { ...area.image, scale: newScale } } : area
        ),
      })
    );
  };

  const handleZoom = (direction) => {
    const image = settings.printAreas.find((area) => area.id === printArea.id).image || {};
    const imgScale = image.scale || 1;
    const step = 0.1;
    let newScale = imgScale;

    switch (direction) {
      case "in":
        newScale += step;
        break;
      case "out":
        newScale -= step;
        break;
      default:
        break;
    }
    dispatch(
      setSettings({
        ...settings,
        printAreas: settings.printAreas.map((area) =>
          area.id === printArea.id ? { ...area, image: { ...area.image, scale: newScale } } : area
        ),
      })
    );
  };

  return (
    <div className="items-center justify-center flex flex-col">
      <div className="flex flex-row gap-[20px] w-full">
        <button onClick={() => handleZoom("out")} className="p-[10px] border-[1px] border-[#E0E0E0] rounded-[32px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path d="M16.014 7.99988L8.01404 7.99988" stroke="#4F4F4F" strokeWidth="2" />
            <path
              d="M7.77141 12.2425C10.1146 14.5857 13.9135 14.5857 16.2567 12.2425C18.5998 9.89937 18.5998 6.10038 16.2567 3.75724C13.9135 1.41409 10.1146 1.41409 7.77141 3.75724C5.42826 6.10038 5.42826 9.89937 7.77141 12.2425ZM7.77141 12.2425L6.00364 14.0103M6.00364 14.0103C6.35719 14.3638 6.35719 14.3638 6.00364 14.7174C5.65009 15.0709 3.52877 17.1923 3.17521 17.5458C2.82166 17.8994 2.82166 17.8994 2.46811 17.5458C2.11455 17.1923 2.11455 17.1923 2.46811 16.8387C2.82166 16.4852 4.94298 14.3638 5.29653 14.0103C5.65009 13.6567 5.65009 13.6567 6.00364 14.0103Z"
              stroke="#4F4F4F"
              strokeWidth="2"
            />
          </svg>
        </button>
        <Slider
          onValueChange={(e) => handleZoomSlide(e[0])}
          value={[getZoom({ settings, printArea })]}
          max={500}
          step={0.1}
        />
        <button onClick={() => handleZoom("in")} className="p-[10px] border-[1px] border-[#E0E0E0] rounded-[32px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path
              d="M16.014 7.99988L8.01404 7.99988M12.014 11.9999L12.014 7.99988L12.014 3.99988"
              stroke="#4F4F4F"
              strokeWidth="2"
            />
            <path
              d="M7.77141 12.2425C10.1146 14.5857 13.9135 14.5857 16.2567 12.2425C18.5998 9.89937 18.5998 6.10038 16.2567 3.75724C13.9135 1.41409 10.1146 1.41409 7.77141 3.75724C5.42826 6.10038 5.42826 9.89937 7.77141 12.2425ZM7.77141 12.2425L6.00364 14.0103M6.00364 14.0103C6.35719 14.3638 6.35719 14.3638 6.00364 14.7174C5.65009 15.0709 3.52877 17.1923 3.17521 17.5458C2.82166 17.8994 2.82166 17.8994 2.46811 17.5458C2.11455 17.1923 2.11455 17.1923 2.46811 16.8387C2.82166 16.4852 4.94298 14.3638 5.29653 14.0103C5.65009 13.6567 5.65009 13.6567 6.00364 14.0103Z"
              stroke="#4F4F4F"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
