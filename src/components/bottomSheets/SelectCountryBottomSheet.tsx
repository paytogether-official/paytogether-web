import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Form, InputGroup, Tab, Tabs } from "react-bootstrap";
import { HiOutlineSearch } from "react-icons/hi";
import { BottomSheet } from "../BottomSheet";
import "./SelectCountryBottomSheet.scss";

interface Props {
  show: boolean;
  onChangeCountry: (v: string) => void;
  onClose: () => void;
}

export const SelectCountryBottomSheet = (props: Props) => {
  const [tab, setTab] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (props.show) {
      setTab("ALL");
      setSearch("");
    }
  }, [props.show]);

  const currentCountryList = useMemo(() => {
    let list: Country[] =
      tab === "ALL"
        ? Object.values(countrys).flat()
        : countrys[tab as ContinentType];

    if (search) {
      list = list.filter(item => item.name.includes(search));
    }

    return _.sortBy(list, ["name"]);
  }, [tab, search]);

  return (
    <BottomSheet
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

      <Tabs
        id="controlled-tab-example"
        activeKey={tab}
        onSelect={k => setTab(k!)}
        className="mb-3"
      >
        <Tab eventKey="ALL" title="전체" />
        {tabs.map(t => (
          <Tab key={t.key} eventKey={t.key} title={t.name} />
        ))}
      </Tabs>

      <div className="h-[40vh] overflow-y-auto">
        {currentCountryList.map(item => (
          <div
            key={item.name}
            className="select-country-bottom-sheet__item flex justify-between items-center h-[40px]"
            onClick={() => {
              props.onChangeCountry(item.name);
              props.onClose();
            }}
          >
            <div className="flex justify-between items-center">
              <img
                src={`${process.env.PUBLIC_URL}/flags/${item.image}`}
                width={48}
                height={32}
                alt={item.name}
              />
              <div className="select-country-bottom-sheet__item-name ml-2">
                {item.name}
              </div>
            </div>
            <div>
              <div className="select-country-bottom-sheet__item-code">
                {item.code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
};

interface Country {
  name: string;
  image: string;
  code: string;
}

type ContinentType = "Asia" | "Europe" | "Oceania" | "America" | "Africa";

const countrys: Record<ContinentType, Country[]> = {
  Asia: [
    {
      name: "대한민국",
      image: "Korea.png",
      code: "KRW"
    }
  ],
  Europe: [
    {
      name: "영국",
      image: "British.png",
      code: "GBP"
    }
  ],
  Oceania: [
    {
      name: "뉴질랜드",
      image: "NewZealand.png",
      code: "NZD"
    }
  ],
  America: [
    {
      name: "미국",
      image: "America.png",
      code: "USD"
    }
  ],
  Africa: [
    {
      name: "사우디아라비아",
      image: "SaudiArabia.png",
      code: "SAR"
    }
  ]
};

const tabs: { key: ContinentType; name: string }[] = [
  {
    key: "Asia",
    name: "아시아"
  },
  {
    key: "Europe",
    name: "유럽"
  },
  {
    key: "Oceania",
    name: "오세아니아"
  },
  {
    key: "America",
    name: "아메리카"
  },
  {
    key: "Africa",
    name: "아프리카"
  }
];
