import { RequireAuth } from "@components/Molecules/RequireAuth";
import { Header } from "@components/Organism/Header";
import { HomeApp } from "@pages/Dashboard/App";
import CreateEvent from "@pages/Dashboard/CreateEvent/CreateEvent";
import JoinEvent from "@pages/Dashboard/JoinEvent/JoinEvent";
import { SingleInvitedEvent } from "@pages/Dashboard/SingleInvitedEvent";
import { SingleOrganizedEvent } from "@pages/Dashboard/SingleOrganizedEvent";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function RoutesComponent() {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex flex-col w-full gap-4 overflow-auto h-dvh pt-32 pb-8 bottom-16 px-32 relative">
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
        </Routes>
      </div>
    </BrowserRouter>
  )
}