import { useNavigate } from "react-router";
import { Tab, useTabs } from "./tabs";

export const BottomBar = () => {
    const navigate = useNavigate();
    const tabs = useTabs()

    return (
        <div
         className="fixed bottom-0 left-0 right-0 bg-white shadow-md border m-2 border-gray-200 z-50 p-4
         rounded-lg flex justify-between items-center "
        >
            <div className="flex justify-around items-center w-full">
                {tabs.map((tab: Tab) => (
                    <div 
                        key={tab.label} 
                        className={`flex flex-col items-center text-sm cursor-pointer transition-all duration-300 ease-in-out
                            ${tab.isActive ? 'text-red-500 scale-110' : 'text-gray-500 hover:text-red-500'}`}
                        onClick={() => navigate(tab.path)}
                    >
                        <div className="transition-transform duration-300">
                            {tab.icon}
                        </div>
                        <p className="mt-1 transition-colors duration-300">{tab.label}</p>
                    </div>
                ))} 
            </div>
        </div>
    )
}