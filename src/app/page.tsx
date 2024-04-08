"use client";
import { api } from "@/trpc/react";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import UsersTab from "./components/UsersTab";
import UserProfile from "./components/UserProfile";

export default function Home() {
  const managers = api.user.getManagers.useQuery().data;
  const nurses = api.user.getNurses.useQuery();
  const admins = api.user.getAdmins.useQuery();
  const userRole = "admin";
  return (
    <main>
      <div className="m-9">
        <Tabs defaultValue={"admin"}>
          <TabsList className="mb-3 flex items-center justify-around rounded-md bg-slate-900 p-4 text-slate-50 shadow-lg">
            {userRole === "admin" && (
              <TabsTrigger value="manager">Managers</TabsTrigger>
            )}
            {(userRole === "admin" || "manager") && (
              <TabsTrigger value="nurse">Nurses</TabsTrigger>
            )}
            {userRole === "admin" && (
              <TabsTrigger value="admin">Admins</TabsTrigger>
            )}
          </TabsList>
          <UsersTab tabName="manager">
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
              {managers?.map((staff) => (
                <UserProfile
                  key={staff.userId}
                  firstName={staff.firstName}
                  lastName={staff.lastName}
                  email={staff.email}
                  role={staff.role}
                  id={String(staff.userId)}
                />
              ))}
            </div>
          </UsersTab>
          <UsersTab tabName="nurse">
            <div className="grid grid-cols-4 gap-2">
              {nurses?.data?.map((staff) => (
                <UserProfile
                  key={staff.userId}
                  firstName={staff.firstName}
                  lastName={staff.lastName}
                  email={staff.email}
                  role={staff.role}
                  id={String(staff.userId)}
                />
              ))}
            </div>
          </UsersTab>
          <UsersTab tabName="admin">
            <div className="grid grid-cols-4 gap-2">
              {admins?.data?.map((staff) => (
                <UserProfile
                  key={staff.userId}
                  firstName={staff.firstName}
                  lastName={staff.lastName}
                  email={staff.email}
                  role={staff.role}
                  id={String(staff.userId)}
                />
              ))}
            </div>
          </UsersTab>
        </Tabs>
      </div>
    </main>
  );
}
