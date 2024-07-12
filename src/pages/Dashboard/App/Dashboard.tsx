import { DashboardMetrics } from "@components/Organism/DashboardMetrics"
import InvitedEventsTable from "@components/Organism/InvitedEventsTable/InvitedEventsTable"
import OrganizedEventsTable from "@components/Organism/OrganizedEventsTable/OrganizedEventTable"

export default function HomeApp() {
  return (
    <>
      <DashboardMetrics />
      <div className="flex md:flex-row flex-col gap-20 justify-between">
        <OrganizedEventsTable />
        <InvitedEventsTable />
      </div>
    </ >
  )
}