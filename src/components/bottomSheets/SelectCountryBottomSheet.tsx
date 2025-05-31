import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Form, InputGroup, Tab, Tabs } from "react-bootstrap";
import { HiOutlineSearch } from "react-icons/hi";
import { BottomSheet } from "../BottomSheet";
import "./SelectCountryBottomSheet.scss";
import { useCreateJourney } from "../../store/useCreateJourney";
import { Locale } from "../../interfaces/Locale";

interface Props {
  show: boolean;
  onChangeCountry: (v: Locale) => void;
  onClose: () => void;
}

export const SelectCountryBottomSheet = (props: Props) => {
  const [tab, setTab] = useState("ALL");
  const [search, setSearch] = useState("");

  const { locales } = useCreateJourney();

  useEffect(() => {
    if (props.show) {
      setTab("ALL");
      setSearch("");
    }
  }, [props.show]);

  const tabs: string[] = useMemo(() => {
    return _.uniq(locales.map(locale => locale.continent));
  }, [locales]);

  const currentCountryList: Locale[] = useMemo(() => {
    let list: Locale[] =
      tab === "ALL"
        ? locales
        : locales.filter(locale => locale.continent === tab);

    if (search) {
      list = list.filter(
        item =>
          item.countryKoreanName.toLowerCase().includes(search.toLowerCase()) ||
          item.countryEnglishName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return _.sortBy(list, ["order"]);
  }, [tab, search, locales]);

  return (
    <BottomSheet
      className="select-country-bottom-sheet"
      title="여행지 설정"
      isOpen={props.show}
      onClose={props.onClose}
    >
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="찾으시는 국가명을 입력해주세요"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <InputGroup.Text>
          <HiOutlineSearch className="text-[22px]" />
        </InputGroup.Text>
      </InputGroup>

      <Tabs activeKey={tab} onSelect={k => setTab(k!)} className="mb-3">
        <Tab eventKey="ALL" title="전체" />
        {tabs.map(t => (
          <Tab key={t} eventKey={t} title={t} />
        ))}
      </Tabs>

      <div className="h-[40vh] overflow-y-auto">
        {currentCountryList.map(item => (
          <div
            key={item.localeCode}
            className="select-country-bottom-sheet__item flex justify-between items-center h-[40px]"
            onClick={() => {
              props.onChangeCountry(item);
              props.onClose();
            }}
          >
            <div className="flex justify-between items-center">
              <img
                src={item.imageUrl}
                width={48}
                height={32}
                alt={item.countryKoreanName}
              />
              <div className="select-country-bottom-sheet__item-name ml-2">
                {item.countryKoreanName}
              </div>
            </div>
            <div>
              <div className="select-country-bottom-sheet__item-code">
                {item.currency}
              </div>
            </div>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
};
