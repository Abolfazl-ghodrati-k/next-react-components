"use client";
import TreeMenu from "@/components/TreeMenu";
import { TreeMenuItem } from "@/components/TreeMenu/types";

const ComponentsData: TreeMenuItem[] = [
    {
        name: "TreeMenu",
        pathIsExternal: false,
        path: "/treemenu",
        value: "treemenu",
        icon: "1",
    },
    {
        name: "TreeMenu2",
        pathIsExternal: false,
        path: "/treemenu2",
        value: "treemenu2",
        icon: "2",
    },
];

export default function Home() {
    return (
        <main className="max-h-screen min-h-screen max-w-7xl mx-auto border-l-2 border-gray-200 border-r-2">
            <TreeMenu data={ComponentsData} />
        </main>
    );
}
