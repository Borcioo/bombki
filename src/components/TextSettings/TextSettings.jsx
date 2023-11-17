import Divider from "components/Divider";
import Text from "components/Inputs/Text";
import FontDetails from "components/TextSettings/FontDetails";
import { TextControls } from "components/TextSettings/TextControls";
import TextSettingsWrapper from "components/TextSettings/TextSettingsWrapper";
import TextList from "components/TextSettings/TextList";

import { useSelector } from "react-redux";

const TextSettings = ({ lang }) => {
  const settings = useSelector((state) => state.settings.settings);
  const printArea = useSelector((state) => state.printArea.printArea);
  const textId = useSelector((state) => state.textId.textId);
  const texts = settings?.printAreas?.find((printAreaSetting) => printAreaSetting.id === printArea.id)?.texts || [];

  return (
    <div className="flex flex-col gap-[16px] w-full pb-8">
      <TextList lang={lang} />
      <TextSettingsWrapper texts={texts} textId={textId}>
        <TextControls lang={lang} settings={settings} printArea={printArea} textId={textId} />
        <Text lang={lang} settings={settings} printArea={printArea} textId={textId} />
        <Divider />
        <FontDetails lang={lang} settings={settings} printArea={printArea} textId={textId} />
      </TextSettingsWrapper>
    </div>
  );
};

export default TextSettings;
