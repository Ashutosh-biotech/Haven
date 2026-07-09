import { LuStar, LuMapPin, LuCircleChevronRight } from "react-icons/lu";

interface PropsMap {
    coverImageUrl: string;
    name: string;
    starRating: number;
    brand: string;
    city: string;
    state: string;
    averageRating?: number | null;
    totalReviews: number;
}

export default function Header(props: PropsMap): React.ReactNode {

    return (
        <div style={{backgroundImage: `url(${props.coverImageUrl})`}}
             className={"w-screen h-scree bg-cover bg-no-repeat text-white bg-center"}>
            <div className={"flex items-center justify-center pt-40 pb-60 bg-[#000000b5]"}>
                <div className="container flex justify-between">
                    <div className={"flex flex-col gap-4"}>
                        <h1 className={"text-4xl font-bold"}>{props.name}</h1>
                        <div className={" flex gap-4"}>
                            <div className={"flex gap-3 text-yellow-300"}>
                                {[...Array(props.starRating)].map((_, index) => {
                                    return (
                                        <span key={index} className={"size-7"}><LuStar fill={"currentColor"}/></span>
                                    );
                                })}
                            </div>
                            <h3 className={"text-2xl"}>{props.brand}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={"size-10"}><LuMapPin /></span>
                            <span>{props.city}, {props.state}</span>
                        </div>
                        {props.averageRating != null && (<div
                            className={"flex items-center gap-3 bg-teal-600 text-shadow-none rounded-lg py-2 px-3 w-fit"}>
                            <span className={"size-5 text-shadow-white"}><LuStar fill={"currentColor"} /></span>
                            <span>{props.averageRating}</span>
                            <span>({props.totalReviews})</span>
                        </div>)}
                    </div>
                    <div>
                        <button
                            className="group relative inline-flex items-center overflow-hidden rounded-sm bg-teal-600 px-8 py-3 text-white cursor-pointer border border-teal-700">
                            <span className="absolute -end-full size-5 transition-all group-hover:inset-e-4">
                                <LuCircleChevronRight />
                            </span>
                            <span
                                className="text-sm font-medium transition-all group-hover:me-4"> Check Availability </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}