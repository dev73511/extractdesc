import { useEffect, useState, useRef } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from "react-redux"

function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            {/* <Skeleton className="h-[125px] w-[250px] rounded-xl" /> */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                {/* <Skeleton className="h-4 w-[200px]" /> */}
            </div>
        </div>
    )
}

const Body = () => {
    const homeState = useSelector((state) => state.home)
    const bottomRef = useRef(null);
    const [desc, setDesc] = useState([]);

    useEffect(() => {
        if (homeState?.descriptionResponse && Object.keys(homeState?.descriptionResponse)?.length > 0) {
            const res = homeState?.descriptionResponse?.data
            setDesc((prev) => [...prev, { data: res }])
            bottomRef?.current?.scrollIntoView();
        }
    }, [homeState?.descriptionResponse])

    useEffect(() => {
        if(homeState?.descriptionError && Object.keys(homeState?.descriptionError)?.length > 0){
            alert(homeState?.descriptionError?.errorMessage)
        }
    }, [homeState?.descriptionError])

    return (
        <div className="flex-1 overflow-y-auto">
            {/* description box */}
            <div className="flex gap-3 p-4 justify-center" data-name="container">
                <div className="flex flex-col gap-5">
                    {
                        desc.map((item, index) => (
                            <div key={index?.toString()} className="px-5 py-3 shadow-sm rounded-sm bg-gray-100 whitespace-pre-wrap">
                                {item?.data}
                            </div>
                        ))
                    }
                    {
                        homeState?.loadingDescription && (
                            <SkeletonCard />
                        )
                    }

                </div>
            </div>
            <div ref={bottomRef} className="pt-5 mb-20" />
        </div>
    )
}

export default Body