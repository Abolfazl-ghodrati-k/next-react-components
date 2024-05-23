"use client";
import TreeMenu from "@/components/TreeMenu";
import { TreeMenuItem } from "@/components/TreeMenu/types";

const menuItems: TreeMenuItem[] = [
    {
        name: "Home",
        path: "https://google.com",
        pathIsExternal: false,
        value: "1",
    },
    {
        name: "Profile",
        action: () => {
            console.log("clicked");
        },
        value: "2",
    },
    {
        name: "Settings",
        action: () => {
            console.log("clicked");
        },
        value: "3",
        children: [
            {
                name: "Account",
                action: () => {
                    console.log("clicked");
                },
                value: "4",
            },
            {
                name: "google",
                path: "https://google.com",
                pathIsExternal: true,
                value: "5",
                children: [
                    {
                        name: "Credentials",
                        action: () => {
                            console.log("clicked");
                        },
                        value: "6",
                    },
                    {
                        name: "2-FA",
                        path: "https://google.com",
                        pathIsExternal: true,
                        value: "7",
                    },
                ],
            },
        ],
    },
];

export default function Home() {
    return (
        <main className="max-h-screen min-h-screen max-w-7xl mx-auto border-l-2 border-gray-200 border-r-2">
            <TreeMenu data={menuItems} />
        </main>
    );
}
