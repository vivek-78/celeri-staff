import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CardHeader, Card } from "@/components/ui/card";
import { type UserProfileCardProps } from "../types";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import EditUserDialogBox from "./EditUserDialogBox";
export default function UserProfile({
  firstName,
  lastName,
  email,
  id,
  role,
  imageSrc,
}: UserProfileCardProps) {
  const currentUserRole = "admin";
  return (
    <div className="hover:cursor-pointer">
      <Dialog>
        <DialogTrigger asChild>
          <Card className="w-[300px]">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage alt={firstName} src={imageSrc} />
                  <AvatarFallback>
                    {firstName.slice(0, 1)}
                    {lastName.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-semibold">
                    {firstName} {lastName}
                  </div>
                  <div className="text-xs text-gray-500">{email}</div>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className="text-xs font-medium">{id}</div>
                    <Badge>{role}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </DialogTrigger>
        {currentUserRole === "admin" && (
          <EditUserDialogBox
            firstName={firstName}
            lastName={lastName}
            email={email}
            role={role}
            roleName={""}
          />
        )}
      </Dialog>
    </div>
  );
}
