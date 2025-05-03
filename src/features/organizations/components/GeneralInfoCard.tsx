import { Card, Tag } from "antd";
import moment from "moment";
import type { SingleOrganization } from "../dto/organization.dto";
import {
  RiCalendarFill,
  RiEarthFill,
  RiFlagFill,
  RiInformationFill,
  RiMapPinFill,
  RiPhoneFill,
  RiSmartphoneFill,
} from "@remixicon/react";

export function GeneralInfoCard(props: SingleOrganization) {
  return (
    <Card
      classNames={{
        body: "!p-4 lg:!p-8",
      }}
    >
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-1.5">
          <div className="flex items-center gap-2">
            <RiFlagFill className="shrink-0 size-4 text-gray-400" />
            <p className="font-sans">{props.country}</p>
          </div>
          <div className="flex items-center gap-2">
            <RiMapPinFill className="shrink-0 size-4 text-gray-400" />
            <p className="font-sans">{props.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <RiInformationFill className="shrink-0 size-4 text-gray-400" />
            <p className="capitalize font-sans">{props.type}</p>
          </div>
          <div className="flex items-center gap-2">
            <RiCalendarFill className="shrink-0 size-4 text-gray-400" />
            <p className="font-sans">
              {moment(props.createdAt).format("DD-MMMM, YYYY, HH:mm")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <RiCalendarFill className="shrink-0 size-4 text-gray-400" />
            <p className="font-sans">
              {moment(props.updatedAt).format("DD-MMMM, YYYY, HH:mm")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <RiPhoneFill className="shrink-0 size-4 text-gray-400" />
            <p className="font-sans">{props.contacts.phones.join(", ")}</p>
          </div>
          <div className="flex items-center gap-2">
            <RiEarthFill className="shrink-0 size-4 text-gray-400" />
            <div className="flex gap-4 gap-y-0 flex-wrap items-start">
              {props.contacts.websites.map((item) => (
                <a
                  key={item.url}
                  className="text-blue-600 underline "
                  href={item.url}
                >
                  {item.url}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <RiSmartphoneFill className="shrink-0 size-4 text-gray-400" />
            <div className="flex gap-4 gap-y-0 flex-wrap items-start">
              {props.contacts.socialMedias.map((item) => (
                <a
                  key={item.url}
                  className="text-blue-600 underline font-sans"
                  href={item.url}
                >
                  {item.url}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <h2 className="font-grotesk font-medium">Tags:</h2>
          <div className="flex gap-1 flex-wrap">
            {props.tags.map((item) => (
              <Tag key={item}> {item} </Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
