import translations from "const/translations.json";
const TextSettingsWrapper = ({ children, texts, textId }) => {
  const lang = "pl";
  if (texts.length > 0 && textId !== null) {
    return children;
  }
  return <p className="text-[18px] leading-[150%] font-bold">{translations[lang].tabs.textSection.empty}</p>;
};

export default TextSettingsWrapper;
