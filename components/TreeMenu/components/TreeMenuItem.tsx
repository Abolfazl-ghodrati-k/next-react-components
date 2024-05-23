import { useEffect, useState } from "react";
import { TreeMenuItemProps } from "../types";
import { useTreeMenuContext } from "../context/TreeMenuContext";
import { useRouter } from "next/navigation";
import { useTreeMenuItemIsActive } from "../hooks/useTreeMenuItemIsActive";
import Link from "next/link";

const TreeMenuItem = ({
    name,
    icon,
    value,
    path,
    action,
    pathIsExternal,
    children,
    itemClassNames,
    badge,
    hasPadding,
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

    return (
        <div className={`${itemClassNames} TreeMenu-Item-Container`}>
            <div
                onClick={handleClick}
                className={`tree-menu-nav-link-container ${
                    hasPadding && "tree-menu-nav-link-container-has-padding"
                } `}
            >
                <div
                    className={`${
                        isMenuItemActive ? "tree-menu-nav-link-active" : ""
                    } tree-menu-nav-link ${
                        badge && "tree-menu-nav-link-with-badge"
                    }`}
                >
                    {children?.length ? (
                        <div
                            className="tree-menu-nav-link-arrow"
                            onClick={arrowClicked}
                            style={{
                                transform: `rotate(${
                                    expanded ? "90deg" : "0deg"
                                })`,
                            }}
                        >
                            {">"}
                        </div>
                    ) : null}
                    {icon && icon}
                    {pathIsExternal ? (
                        <a href={path} target="_blank" rel="noopener noreferer">
                            <span>{name}</span>
                        </a>
                    ) : (
                        <span>{name}</span>
                    )}
                </div>
                {badge && (
                    <div className="tree-menu-nav-link-badge">{badge}</div>
                )}
            </div>
            {expanded && children?.length && (
                <div
                    className={`tree-menu-nav-link-sub-menu ${
                        children.length > 2 &&
                        "tree-menu-nav-link-sub-menu-with-border"
                    } ${
                        children.length > 2 &&
                        hasPadding &&
                        "tree-menu-nav-link-sub-menu-with-border-has-padding"
                    }`}
                >
                    {children.map((childItem) => (
                        <TreeMenuItem
                            {...childItem}
                            itemClassNames={itemClassNames}
                            key={childItem.value}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeMenuItem;
