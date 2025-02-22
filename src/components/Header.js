import { Captions  } from "lucide-react";

const Header = () => {

    return (
        <div className=" bg-white w-full flex border-b-[1px] sm:px-4  py-3 px-4 lg:px-6 justify-center items-center shadow-sm">
            <div className="flex gap-3 items-center justify-center">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                    <p>Get Description</p>
                    <Captions size={18} className="" />
                </div>
            </div>
        </div>
    )
}

export default Header