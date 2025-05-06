import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store.config";
import { envVariables } from "@/config/env";
import { SingleOrganization } from "@/features/organizations/dto/organization.dto";
import type { RequestParamsType } from "@/@types";
import type { SingleAlert } from "@/features/alerts/list/form/AlertForm";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: envVariables.BASE_URL,
    prepareHeaders: (headers, api) => {
      const { auth } = api.getState() as RootState;

      if (auth.access_token) {
        headers.set("Authorization", `Bearer ${auth.access_token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["ORGANIZATIONS", "ALERTS"],
  endpoints: (builder) => ({
    getOrganizations: builder.query<SingleOrganization[], RequestParamsType>({
      query: (params) => ({
        params,
        url: "organizations",
      }),
      providesTags: ["ORGANIZATIONS"],
    }),
    createOrganization: builder.mutation<
      SingleOrganization,
      SingleOrganization
    >({
      query: (body) => ({
        body,
        url: "organizations",
        method: "POST",
      }),
      invalidatesTags: ["ORGANIZATIONS"],
    }),
    updateOrganization: builder.mutation<
      SingleOrganization,
      SingleOrganization
    >({
      query: ({ _id, ...body }) => ({
        body,
        url: `organizations/${_id}`,
        method: "PUT",
      }),
      invalidatesTags: ["ORGANIZATIONS"],
    }),
    deleteOrganization: builder.mutation<SingleOrganization, string>({
      query: (id) => ({
        url: `organizations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ORGANIZATIONS"],
    }),
    getOrganizationById: builder.query<SingleOrganization, string>({
      query: (id) => ({
        url: `organizations/${id}`,
      }),
    }),
    importOrganizations: builder.mutation<
      {
        createdOrganizations: any[];
        extractedContent: any[];
      },
      FormData
    >({
      query: (body) => ({
        url: `files/orgfile`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["ORGANIZATIONS"],
    }),

    getAlerts: builder.query<SingleAlert[], RequestParamsType>({
      query: (params) => ({
        params,
        url: "alerts",
      }),
      providesTags: ["ALERTS"],
    }),
    createAlert: builder.mutation<SingleAlert, SingleAlert>({
      query: (body) => ({
        body,
        url: "alerts",
        method: "POST",
      }),
      invalidatesTags: ["ALERTS"],
    }),
    updateAlert: builder.mutation<SingleAlert, SingleAlert>({
      query: ({ _id, ...body }) => ({
        body,
        url: `alerts/${_id}`,
        method: "PUT",
      }),
      invalidatesTags: ["ALERTS"],
    }),
    deleteAlert: builder.mutation<SingleAlert, string>({
      query: (id) => ({
        url: `alerts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ALERTS"],
    }),
    getAlertById: builder.query<SingleAlert, string>({
      query: (id) => ({
        url: `alerts/${id}`,
      }),
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useGetOrganizationByIdQuery,
  useDeleteOrganizationMutation,
  useImportOrganizationsMutation,

  useCreateAlertMutation,
  useGetAlertsQuery,
  useUpdateAlertMutation,
  useDeleteAlertMutation,
} = api;
