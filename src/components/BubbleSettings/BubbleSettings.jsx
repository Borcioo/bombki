import BaubleColor from "components/BaubleColor";
import Divider from "components/Divider";
import SelectArea from "components/Inputs/SelectArea";
import SelectBauble from "components/Inputs/SelectBauble";

const BubbleSettings = ({ lang }) => {
  return (
    <div className="flex flex-col gap-[16px] w-full pb-8">
      <SelectBauble lang={lang} />
      <Divider />
      <SelectArea lang={lang} />
      <Divider />
      <BaubleColor lang={lang} />
    </div>
  );
};

export default BubbleSettings;
