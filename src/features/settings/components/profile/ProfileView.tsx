import { useAuth } from "@/hooks/useAuth";
import { RiUserFill } from "@remixicon/react";
import { Avatar, Button } from "antd";
import { useState } from "react";
import { ProfileUpdate } from "./ProfileUpdate";

export function ProfileView() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div className="container mx-auto max-w-2xl bg-white border p-3 md:p-6 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-10 md:size-14">
            <RiUserFill />
          </Avatar>
          <div className="flex flex-col justify-center items-start md:gap-0">
            <h1 className="font-grotesk font-bold text-base md:text-xl leading-4 md:leading-5">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="font-grotesk text-xs md:text-sm">{user?.username}</p>
          </div>
        </div>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          Edit profile
        </Button>
      </div>
      {open && <ProfileUpdate onClose={() => setOpen(false)} />}
    </div>
  );
}
