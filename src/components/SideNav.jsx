import ExportTextures from "components/ExportTextures";
import Divider from "components/Divider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/Tabs";
import TextSettings from "components/TextSettings/TextSettings";
import ImageSettings from "components/ImageSettings/ImageSettings";
import BubbleSettings from "components/BubbleSettings/BubbleSettings";
import translations from "const/translations.json";

const SideNav = ({ setShowModal, lang }) => {
  return (
    <div className="sm:h-full flex flex-col-reverse sm:flex-col w-full sm:max-w-[488px] min-w-[320px] border-l-[1px] border-[#E0E0E0]">
      <div className="flex sm:h-full flex-col gap-[8px] w-full sm:overflow-y-auto">
        <div className="w-full flex items-center justify-center flex-col px-8 sm:pt-8">
          <div className="w-full flex items-center justify-center flex-row">
            <p className="w-full text-[24px]  lg:text-[28px] leading-[150%] font-bold lg:flex">
              {translations[lang].title}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="rounded-[5px] text-center border-[1px] border-[#E0E0E0] bg-[#fff] p-2 min-w-[70px] text-sm"
            >
              Import
            </button>
          </div>
          <Divider />
        </div>
        <Tabs defaultValue="settings" className="w-full px-8 h-full">
          <TabsList className="w-full justify-evenly rounded-sm ">
            <TabsTrigger value="settings" className="w-full rounded-sm">
              {translations[lang].tabs.bubbleSection.title}
            </TabsTrigger>
            <TabsTrigger value="text" className="w-full rounded-sm">
              {translations[lang].tabs.textSection.title}
            </TabsTrigger>
            <TabsTrigger value="image" className="w-full rounded-sm">
              {translations[lang].tabs.imageSection.title}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <BubbleSettings lang={lang} />
          </TabsContent>
          <TabsContent value="text">
            <TextSettings lang={lang} />
          </TabsContent>
          <TabsContent value="image">
            <ImageSettings lang={lang} />
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex flex-col gap-[8px] w-full px-8 py-2 sm:py-8 justify-self-end">
        <ExportTextures lang={lang} />
      </div>
    </div>
  );
};

export default SideNav;
