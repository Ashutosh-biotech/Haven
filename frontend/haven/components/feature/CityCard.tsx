import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {ImageResult} from "@/components/interface/ImageResult";

type cityCardProps = {
    data: {
        name: string;
        slug: string;
        img?: ImageResult;
        url: string;
        isReadMore?: boolean;
        grid?: boolean;
    };
}

export default function CityCard({data}: cityCardProps) {
    return (
        <div
            key={data.slug}
            className={"snap-start shrink-0 w-full" + (data.grid ? "" : " sm:w-1/2 lg:w-1/3")}
        >
            <Link
                href={data.url}
                className="group relative block h-64 sm:h-80 lg:h-96 w-full rounded overflow-hidden"
            >

                <span
                    className="absolute inset-0 border-2 border-dashed border-teal-500 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                {data.isReadMore ? (
                    <div
                        className="relative h-full flex flex-col items-center justify-center bg-teal-50 text-center p-6 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-1 hover:shadow-xl">
                        <h3 className="text-xl font-bold text-gray-900">{data.name}</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            Explore all our featured cities and destinations
                        </p>
                        <button className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-sm">
                            Discover More
                        </button>
                    </div>
                ) : (
                    <div
                        className="relative h-full flex items-end rounded overflow-hidden transition-all duration-300 group-hover:shadow-2xl">

                        {data.img && (
                            <div className="absolute inset-0">
                                <Image
                                    src={data.img.url}
                                    alt={data.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw,
                                                           (max-width: 1024px) 50vw,
                                                           33vw"
                                    className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:-rotate-2"
                                />
                                <div
                                    className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                            </div>
                        )}

                        <div className="relative p-4 sm:p-6 lg:p-8 text-white z-10">
                            <h3 className="text-xl sm:text-2xl font-medium">{data.name}</h3>
                            <p className="mt-2 text-md text-gray-200">
                                Explore the Hotels and places in {data.name}.
                            </p>
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );
}