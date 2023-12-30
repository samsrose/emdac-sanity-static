import Link from "next/link"

export default function PositionItem({ data }) {
    return (
        <>
        {data.map((content, index) => (
            <tr key={index}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                    {content.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{content.position}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{content.date}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-0">
                    <Link href={content.file} className="text-indigo-400 hover:text-indigo-300">
                        Download
                    </Link>
                </td>
            </tr>
        ))}
        </>
    )
}