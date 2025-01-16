import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";

export type ChildItem = {
  text: string;
};

type ItemCommonProps = {
  text: string;
  Icon: IconType;
};

type ItemWithChildren = ItemCommonProps & {
  children: ChildItem[];
};

type ItemWithoutChildren = ItemCommonProps & {
  to: ComponentProps<typeof Link>["to"];
};

export type Item = ItemWithChildren | ItemWithoutChildren;
