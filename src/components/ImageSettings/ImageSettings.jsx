import Divider from "components/Divider";
import ImageUpload from "components/Inputs/ImageUpload";
import { TextureControls } from "components/ImageSettings/TextureControls";
import { Zoom } from "components/Inputs/Zoom";

const ImageSettings = ({ lang }) => {
  return (
    <div className="flex flex-col gap-[16px] w-full pb-8">
      <TextureControls lang={lang} />
      <ImageUpload lang={lang} />
      <Divider />
      <Zoom />
      <Divider />
    </div>
  );
};

export default ImageSettings;
