import { MeetingCard } from "@/components/ui/MeetingCard";
import { getMeetings } from "@/lib/repositories/meetings";

export const revalidate = 30;

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <>
      <header className="flex flex-wrap bg-gray-900 lg:w-full sm:mx-auto pt-12 px-2">
        <div className="my-8 max-w-xl pr-4 text-center mx-auto">
          <h1 className="text-5xl lg:text-5xl font-bold text-gray-100 font-heading mb-2">
            Meetings
          </h1>
        </div>
      </header>
      <div className="min-h-screen bg-gray-900 w-full">
        <div className="py-4 px-4 grid mx-auto max-w-7xl">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 flex align-center justify-center h-full max-w-7xl mx-auto">
            <ul className="divide-y divide-gray-900 overflow-hidden rounded-lg bg-gray-900 shadow sm:grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 sm:gap-4 sm:divide-y-0">
              {meetings.map((meeting) => (
                <li key={meeting._id}>
                  <MeetingCard meeting={meeting} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
