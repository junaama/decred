import { Text } from "@/design-components/Text";
import Link from "next/link";
import styled from "styled-components";

type Tab = {
  name: string;
  count: number;
  active: boolean;
  path: string;
};

type Props = {
  tabList: Tab[];
};
export const Tabs = ({ tabList }: Props) => {
  return (
    <div>
      <UL>
        {tabList.map((tab) => (
          <FlexList>
            <FlexLink href={`?tab=${tab.path}`}>
              <Text.Heading color={tab.active ? "black" : "gray"} weight={700}>
                {tab.name}
              </Text.Heading>
              <Text.Heading color={tab.active ? "black" : "gray"} weight={500}>
                {tab.count}
              </Text.Heading>
            </FlexLink>
          </FlexList>
        ))}
      </UL>
    </div>
  );
};
const UL = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 32px;
`;
const FlexLink = styled(Link)`
  display: flex;
  gap: 8px;
  &:hover {
    background-color: rgba(113, 113, 113, 0.2);
  }
`;
const FlexList = styled.li`
  gap: 8px;
`;

const DEFAULT_TABS = [
  {
    name: "All",
    count: 30,
    path: "",
    active: true,
  },
  {
    name: "Poaps",
    count: 10,
    path: "poaps",
    active: false,
  },
  {
    name: "Kudos",
    count: 10,
    path: "kudos",
    active: false,
  },
  {
    name: "Git Poaps",
    count: 10,
    path: "gitpoaps",
    active: false,
  },
];
Tabs.defaultProps = {
  tabList: DEFAULT_TABS,
};
