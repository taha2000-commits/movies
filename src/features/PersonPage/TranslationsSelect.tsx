import CustomSelect, { SelectItem } from "../../components/CustomSelect";
import { MdOutlineTranslate } from "react-icons/md";
import { AnyObject, TranslationMedia } from "../../types/types";

const TranslationsSelect = ({
  translations,
  onChange,
}: {
  translations: TranslationMedia<AnyObject>[];
  onChange: (item?: SelectItem) => void;
}) => {
  return (
    <CustomSelect
      icon={<MdOutlineTranslate />}
      options={translations
        .filter((lang) => lang.data.biography != "")
        .map((lang) => {
          return {
            innerText: lang.name,
            value: lang.iso_639_1,
            data: lang.data,
          };
        })}
      title="Translations"
      onChange={(item) => {
        onChange(item);
      }}
    />
  );
};

export default TranslationsSelect;
