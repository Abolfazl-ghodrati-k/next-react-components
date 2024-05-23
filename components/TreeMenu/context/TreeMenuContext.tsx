import React, { createContext, useContext, useEffect, useState } from "react";
import { MenuItemStatus, TreeMenuProviderProps } from "../types";
import { getTreeMenuActiveElements } from "../helpers/findTreeMenuParents";

type FindParentContextType = {
    activeElements: MenuItemStatus[] | null;
    setActivatedMenuItemId: React.Dispatch<React.SetStateAction<string>>;
};

const initialState = {
    activeElements: null,
    setActivatedMenuItemId: () => {},
};

const TreeMenuContext = createContext<FindParentContextType>(initialState);

export const TreeMenuProvider: React.FC<TreeMenuProviderProps> = ({
    children,
    data,
    selectedId,
    mode = "toggle",
}) => {
    const [activeId, setActivatedMenuItemId] = useState("");
    const [activeElements, setActiveElements] = useState<MenuItemStatus[]>([]);

    useEffect(() => {
        setActivatedMenuItemId(selectedId);
    }, [selectedId]);

    useEffect(() => {
        if (mode === "toggle") {
            setActiveElements(getTreeMenuActiveElements(data, activeId));
        } else {
            setActiveElements((prevActiveElements) => {
                const updatedElements = getTreeMenuActiveElements(
                    data,
                    activeId
                );

                updatedElements.forEach((element) => {
                    const existingIndex = prevActiveElements?.findIndex(
                        (prevElement) => prevElement.id === element.id
                    );

                    if (existingIndex !== undefined || existingIndex !== -1) {
                        prevActiveElements?.splice(existingIndex, 1);
                    }
                });

                const updatedPrevActiveElements = prevActiveElements.map(
                    (activeElement) => ({ ...activeElement, isActive: false })
                );

                const newActiveElements = updatedPrevActiveElements
                    ? [...updatedPrevActiveElements, ...updatedElements]
                    : updatedElements;

                return newActiveElements;
            });
        }
    }, [activeId, mode, data]);

    return (
        <TreeMenuContext.Provider
            value={{ activeElements, setActivatedMenuItemId }}
        >
            {children}
        </TreeMenuContext.Provider>
    );
};

export const useTreeMenuContext = () => useContext(TreeMenuContext);
