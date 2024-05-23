import { useMemo } from "react";
import { TreeMenuProvider } from "./context/TreeMenuContext";
import { TreeMenuProps } from "./types";
import { modifyDataForIcons } from "./helpers/modifyDataForIcons";
import TreeMenuItem from "./components/TreeMenuItem";

const TreeMenu = ({
    data,
    wrapperClassNames,
    itemClassNames,
    selectedId = "",
    mode,
}: TreeMenuProps) => {
    const modifiedData = useMemo(() => modifyDataForIcons(data), [data]);
    return (
        <TreeMenuProvider
            data={modifiedData}
            selectedId={selectedId}
            mode={mode}
        >
            <div className={`${wrapperClassNames} TreeMenu-Container`}>
                {modifiedData.map((item) => (
                    <TreeMenuItem {...item} key={item.value} />
                ))}
            </div>
        </TreeMenuProvider>
    );
};

export default TreeMenu;
