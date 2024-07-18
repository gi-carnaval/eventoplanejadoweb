import { RequireAuth } from "@components/Molecules/RequireAuth";
import { Header } from "@components/Organism/Header";
import { HomeApp } from "@pages/Dashboard/App";
import CreateEvent from "@pages/Dashboard/CreateEvent/CreateEvent";
import JoinEvent from "@pages/Dashboard/JoinEvent/JoinEvent";
import { SingleInvitedEvent } from "@pages/Dashboard/SingleInvitedEvent";
import { SingleOrganizedEvent } from "@pages/Dashboard/SingleOrganizedEvent";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import EventRequest from "@src/pages/Dashboard/EventRequest/EventRequest";
import EventValidator from "@src/pages/Dashboard/EventValidator/EventValidator";
import Notifications from "@src/pages/Dashboard/Notifications";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <Header />
      <div className="w-full h-[calc(100dvh-5rem)] top-10 md:px-32 relative overflow-auto">
        <div className="overflow-auto flex flex-col gap-10 my-16 mx-10">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/app" element={
              <RequireAuth>
                <HomeApp />
              </RequireAuth>
            } />
            <Route path="/eventos" element={
              <RequireAuth>
                <CreateEvent />
              </RequireAuth>
            } />
            <Route path="/organizer/:eventId" element={
              <RequireAuth>
                <SingleOrganizedEvent />
              </RequireAuth>
            } />
            <Route path="/participant/:eventId" element={
              <RequireAuth>
                <SingleInvitedEvent />
              </RequireAuth>
            } />
            <Route path="/join/:eventId" element={
              <RequireAuth>
                <JoinEvent />
              </RequireAuth>
            } />
            <Route path="/notifications" element={
              <RequireAuth>
                <Notifications />
              </RequireAuth>
            } />
            <Route path="/requests" element={
              <RequireAuth>
                <EventRequest />
              </RequireAuth>
            } />
            <Route path="/validation/:eventId" element={
              <RequireAuth>
                <EventValidator />
              </RequireAuth>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}