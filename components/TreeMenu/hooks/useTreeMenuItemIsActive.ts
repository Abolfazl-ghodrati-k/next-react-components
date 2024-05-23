import { useTreeMenuContext } from "../context/TreeMenuContext";

export const useTreeMenuItemIsActive = (currentId: string) => {
    const { activeElements } = useTreeMenuContext();
    const elementStatus = activeElements?.find(({ id }) => id === currentId);

    return {
        isMenuItemActive: elementStatus?.isActive || false,
        isMenuItemExpanded: elementStatus?.expanded || false,
    };
};
