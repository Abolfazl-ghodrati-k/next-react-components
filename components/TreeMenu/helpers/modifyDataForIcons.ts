import { TreeMenuItem } from "../types";

export const modifyDataForIcons = (data: TreeMenuItem[]): TreeMenuItem[] => {
    const newData = [...data];

    const hasIcon = newData.some((item) => item.icon);

    if (hasIcon) {
        newData.forEach((item) => {
            if (!item.icon) {
                const newItem = { ...item, hasPadding: true };
                const index = newData.indexOf(item);
                newData[index] = newItem;
            }
        });
    }

    newData.forEach((item) => {
        if (item.children) {
            const newItem = {
                ...item,
                children: modifyDataForIcons(item.children),
            };
            const index = newData.indexOf(item);
            newData[index] = newItem;
        }
    });

    return newData;
};
