import { useEffect, useState } from "react";
import { TreeMenuItemProps } from "../types";
import { useTreeMenuContext } from "../context/TreeMenuContext";
import { useRouter } from "next/navigation";
import { useTreeMenuItemIsActive } from "../hooks/useTreeMenuItemIsActive";

const TreeMenuItem = ({
    name,
    value,
    path,
    action,
    pathIsExternal,
    children,
    itemClassNames,
}: TreeMenuItemProps) => {
    const [expanded, setExpanded] = useState(false);
    const { setActivatedMenuItemId } = useTreeMenuContext();
    const { push } = useRouter();
    const { isMenuItemActive, isMenuItemExpanded } =
        useTreeMenuItemIsActive(value);

    useEffect(() => {
        setExpanded(isMenuItemExpanded);
    }, [isMenuItemExpanded]);

    const handleClick = () => {
        if (!path && action) {
            action();
        }
        if (path) {
            if (pathIsExternal) {
                return;
            }
            push(path);
        }
        if (children) {
            if (expanded) {
                return;
            }
            setExpanded(true);
        }
        setActivatedMenuItemId(value);
    };

    const arrowClicked = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return <div className={`${itemClassNames}`}></div>;
};

export default TreeMenuItem;
