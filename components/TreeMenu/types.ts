import { ReactNode } from "react";

export type TreeMenuItem = {
    children?: TreeMenuItem[];
    path?: string;
    pathIsExternal?: boolean;
    name: string | number | ReactNode;
    value: string;
    icon?: ReactNode | string;
    hasPadding?: boolean;
    action?: () => void;
};

export type TreeMenuProps = {
    data: TreeMenuItem[];
    wrapperClassNames?: string;
    itemClassNames?: string;
    selectedId?: string;
    mode?: "toggle" | "accordion";
};

export type TreeMenuItemProps = TreeMenuItem & { itemClassNames?: string };

export type TreeMenuProviderProps = {
    children: ReactNode;
    data: TreeMenuItem[];
    selectedId: string;
    mode?: "toggle" | "accordion";
};

export type MenuItemStatus = {
    expanded: boolean;
    isActive: boolean;
    id: string;
};
