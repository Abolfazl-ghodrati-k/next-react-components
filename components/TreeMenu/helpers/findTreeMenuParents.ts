import { MenuItemStatus, TreeMenuItem } from "../types";

export const findParentsOfActivatedTreeMenuItem = (
    items: TreeMenuItem[],
    currentId: string,
    result: MenuItemStatus[]
) => {
    for (let i = 0; i < items.length; i += 1) {
        if (items[i].value === currentId) {
            return true;
        }
        if (
            items[i].children &&
            findParentsOfActivatedTreeMenuItem(
                items[i].children!,
                currentId,
                result
            )
        ) {
            result.push({ expanded: true, isActive: true, id: items[i].value });
            return true;
        }
    }
    return false;
};

export const getTreeMenuActiveElements = (
    menuItems: TreeMenuItem[],
    activeId: string
) => {
    const result: MenuItemStatus[] = [];
    if (menuItems) {
        findParentsOfActivatedTreeMenuItem(menuItems, activeId, result);
    }
    result.push({ expanded: true, isActive: true, id: activeId });

    return result.reverse();
};
