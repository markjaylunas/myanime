import { fetchAllWatchStatus, FetchAllWatchStatusSort } from "@/actions/action";
import { auth } from "@/auth";
import NotSignedIn from "@/components/ui/NotSignedIn";
import { WatchStatus } from "@/db/schema";
import { SearchParams } from "@/lib/types";
import WatchListTable from "./_components/table";

export default async function MyListPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const query =
    typeof searchParams?.query === "string" ? searchParams?.query : "";
  const page =
    typeof searchParams?.page === "string"
      ? parseInt(searchParams?.page) || 1
      : 1;
  const limit =
    typeof searchParams?.limit === "string"
      ? parseInt(searchParams?.limit) || 10
      : 10;
  const sort =
    typeof searchParams?.sort === "string" ? searchParams?.sort : "title";
  const direction =
    typeof searchParams?.direction === "string"
      ? searchParams?.direction
      : "descending";

  let statusListParams: string[];
  if (Array.isArray(searchParams?.status)) {
    statusListParams = searchParams.status;
  } else if (typeof searchParams?.status === "string") {
    statusListParams = [searchParams.status];
  } else {
    statusListParams = [
      "watching",
      "completed",
      "on-hold",
      "dropped",
      "plan-to-watch",
    ];
  }

  const status = statusListParams.map(
    (status) => status.toUpperCase().split("-").join("_") as WatchStatus
  );

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return <NotSignedIn />;

  const watchListData = await fetchAllWatchStatus({
    userId,
    page,
    limit,
    status,
    query,
    sort: sort as FetchAllWatchStatusSort,
    direction: direction as "ascending" | "descending",
  });

  return (
    <>
      <WatchListTable
        watchListData={watchListData}
        filters={{
          query,
          page,
          limit,
          status: statusListParams,
        }}
      />
    </>
  );
}
