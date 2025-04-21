import {
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiBardFill,
  RiSearchLine,
} from "@remixicon/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building,
  User,
  Settings,
  CreditCard,
  Users,
  LifeBuoy,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockSuggestions = [
  "Find suppliers for cotton t-shirts in Bangladesh",
  "Electronics manufacturers in Shenzhen with low MOQ",
  "Sustainable furniture suppliers in Vietnam",
  "Packaging suppliers with recycled materials",
  "Textile manufacturers with GOTS certification",
];

export function SearchPage() {
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between h-screen gap-8">
      <div className="flex items-center justify-between w-full p-4">
        <button
          className="text-stone-600 flex items-center"
          onClick={() => navigate(-1)}
        >
          <RiArrowLeftLine />
        </button>
        <CompanyDropdown
          companyName="Acme Inc"
          userName="John Doe"
          userRole="Administrator"
        />
      </div>
      <div className="grid gap-2 mb-28">
        <h1 className="flex items-center justify-center gap-2  text-stone-700 px-4 py-2 rounded-bl-2xl rounded-tr-2xl -ml-2">
          <RiBardFill className="size-6" />
          <span className="text-xl font-medium">Sourcing Agent</span>
        </h1>
        <div className="flex items-center gap-2 min-w-[500px] max-w-[500px] bg-stone-200 rounded-full pr-1 py-1 border-stone-300 border relative">
          <input
            type="text"
            className="flex flex-1 bg-transparent px-6 outline-none font-normal"
            placeholder="Find worldwide suppliers and buyers..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <button className="bg-stone-600 rounded-full text-stone-200 size-8 flex items-center justify-center">
            <RiSearchLine className="size-4" />
          </button>
          {focused && (
            <div className="absolute top-12 left-0 bg-stone-200 border-stone-300 border shadow-lg rounded-2xl w-full max-h-[300px] overflow-y-auto z-10">
              <h2 className="font-semibold text-stone-700 mb-2 pt-3 px-4">
                Suggestions
              </h2>
              <ul className="list-none">
                {mockSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="text-sm font-normal pl-4 pr-2 cursor-pointer py-2 border-b border-b-stone-300/50 flex items-center justify-between group hover:bg-stone-300/50"
                  >
                    <span>{suggestion}</span>
                    <RiArrowRightSLine className="text-stone-400" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 w-full px-4 py-2">
        <p className="text-sm text-stone-500">© 2025 Sourcing Agent</p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-stone-500 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-stone-500 hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
}

interface CompanyDropdownProps {
  companyName?: string;
  companyLogo?: string;
  userName?: string;
  userRole?: string;
}

export function CompanyDropdown({
  companyName = "Acme Inc",
  userName = "John Doe",
  userRole = "Administrator",
}: CompanyDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 !outline-none !border-none !ring-0"
        >
          <span className="text-sm">{companyName}</span>
          <ChevronDown className="h-4 w-4 ml-2 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border border-gray-200 bg-white shadow-xl"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              {userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">
              {userRole} at {companyName}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Company</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Building className="mr-2 h-4 w-4" />
            <span>Company Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Team Members</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Personal Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
