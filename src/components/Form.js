import React, { useState } from "react";
import { SendHorizonal  } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { actions as homeAction } from '@/core/ducks/home'


const Form = () => {

    const dispatch = useDispatch()
    const homeState = useSelector((state) => state.home)
    const [inputValue, setInputValue] = useState("");
    const APICall = () => {
        const payload = {
            url: inputValue
        }
        dispatch(homeAction.fetchDescription(payload))
    }

    const handleInput = (e) => {
        let value = e?.target?.value;
        console.log("Value :", value);
        setInputValue(value)
    } 

    const handleSubmit = (e) =>  {
        e.preventDefault()
        if(!inputValue){
            alert("Please enter a url")
            return false
        }
        APICall()
    } 

    return (
        <div className="">
            <div className=" py-4 px-4 border-t-2 bg-white rounded-t-xl flex items-center gap-2 lg:gap-4 w-full">
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2 lg:gap-4 w-full"
                >
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Enter or past url"
                            className="
                                text-black
                                font-light
                                py-2
                                px-4
                                bg-neutral-100
                                w-full
                                rounded-full
                                focus:outline-none
                            "
                            onChange={handleInput}
                        />
                    </div>

                    <button
                        type="submit"
                        className="
                            rounded-full
                            p-2
                            bg-sky-500
                            cursor-pointer
                            hover:bg-sky-600
                            transition
                        "
                        disabled={homeState?.loadingDescription}
                    >
                        <SendHorizonal size={18} className="text-white" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Form