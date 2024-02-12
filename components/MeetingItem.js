import Link from "next/link";

export default function Meetings({ data }) {
    return (
        <>
            {data.map((action, index) => (
                <div
                    key={index}
                    style={{minWidth: '450px'}}
                    className="rounded-lg bg-gray-800 mb-4 sm:mb-0"
                >
                    <div className="sm:m-4 p-4">
                        <h3 className="text-3xl font-semibold leading-6 text-gray-200">
                            {action.title}
                        </h3>
                        <h4 className="mt-2 text-xl text-gray-100">{action.date}</h4>
                        <h4 className="mt-2 text-lg text-gray-300">{action.venue}</h4>
                        <p className="mt-2 text-sm text-gray-400">
                            {action.description}
                        </p>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-400 border-t border-gray-700">
                            {!action.voucherLink ? 
                            <>
                                <div className="flex w-0 flex-1">
                                    <Link
                                        title="stripe voucher"
                                        disabled
                                        href="#"
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border-r border-gray-700 bg-gray-800 py-4 text-sm font-semibold text-gray-600"
                                    >
                                        Purchase Voucher
                                    </Link>
                                </div>
                            </>
                            :
                            <>
                                <div className="flex w-0 flex-1">
                                    <Link
                                        title="stripe voucher"
                                        href={action.voucherLink}
                                        target="_blank"
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border-r border-gray-700 bg-gray-800 hover:bg-purple-900 py-4 text-sm font-semibold text-gray-400 hover:text-gray-200"
                                    >
                                        Purchase Voucher
                                    </Link>
                                </div>
                            </>
                            }
                            {!action.venueLink ? 
                            <>
                                <div className="-ml-px flex w-0 flex-1">
                                    <Link
                                        title="venue info"
                                        href="#"
                                        disabled
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-600"
                                    >
                                        Venue Info
                                    </Link>
                                </div>
                            </>
                            :
                            <>
                                <div className="-ml-px flex w-0 flex-1">
                                    <Link
                                        title="venue info"
                                        href={action.venueLink}
                                        target="_blank"
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-400 hover:text-gray-200"
                                    >
                                        Venue Info
                                    </Link>
                                </div>
                            </>
                            }
                            
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}