import { useCallback, useEffect } from "react";
import {
  Form,
  Button,
  message,
  Card,
  Input,
  Select,
  Switch,
  Divider,
} from "antd";
import {
  initialOrganization,
  type SingleOrganization,
} from "./dto/organization.dto";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useCreateOrganizationMutation,
  useGetOrganizationByIdQuery,
  useUpdateOrganizationMutation,
} from "@/app/store/services/api.service";
import { RiArrowLeftLine, RiFileExcelLine } from "@remixicon/react";
import { organizationTypes } from "@/constants/organizationTypes";
import { countries } from "@/constants/countries";
import { X } from "lucide-react";

export function OrganizationFormPage() {
  const [form] = Form.useForm<SingleOrganization>();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");

  const [messageApi, contextHolder] = message.useMessage();

  const [createOrganization, { isLoading: createLoading }] =
    useCreateOrganizationMutation();

  const [updateOrganization, { isLoading: updateLoading }] =
    useUpdateOrganizationMutation();

  const { data: currentOrganization, isFetching: byIdLoading } =
    useGetOrganizationByIdQuery(String(id), {
      refetchOnMountOrArgChange: true,
      skip: !id,
    });

  useEffect(() => {
    if (currentOrganization && id) {
      form.setFieldsValue(currentOrganization);
    }
  }, [currentOrganization, form, id]);

  const handleSubmit = useCallback(
    async (values: SingleOrganization) => {
      try {
        if (id) {
          await updateOrganization({ ...values, _id: id }).unwrap();
          messageApi.success("Organization updated successfully");
        } else {
          await createOrganization(values).unwrap();
          messageApi.success("Organization created successfully");
        }

        navigate(-1);
      } catch (error) {
        console.error("Error submitting form:", error);
        messageApi.error("Failed to save organization. Please try again.");
      }
    },
    [createOrganization, id, messageApi, navigate, updateOrganization]
  );

  const isLoading = createLoading || updateLoading || byIdLoading;

  const pageTitle = id ? "Edit Organization" : "Create a new organization";

  const pageDescription = id
    ? "Update organization details"
    : "Create a new organization as a supplier, competitor or buyer";

  return (
    <div className="container mx-auto max-w-3xl w-full my-2">
      {contextHolder}
      <div className="grid gap-2">
        <div className="relative flex gap-2 items-center justify-between mb-2">
          <Button
            type="text"
            onClick={() => navigate(-1)}
            className="size-12 rounded-full p-0 -ml-3"
          >
            <RiArrowLeftLine />
          </Button>
          <div className="flex flex-col absolute left-1/2 -translate-x-1/2 items-center justify-center">
            <h1 className="text-lg font-bold leading-tight font-grotesk">
              {pageTitle}
            </h1>
            <p className="text-xs text-center text-stone-500 font-grotesk">
              {pageDescription}
            </p>
          </div>
          <Button type="text" className="size-12 rounded-full p-0 -ml-3">
            <RiFileExcelLine />
          </Button>
        </div>

        {byIdLoading && id ? (
          <div className="text-center py-8">Loading organization data...</div>
        ) : (
          <Form<SingleOrganization>
            form={form}
            initialValues={initialOrganization}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-6"
          >
            <div className="grid gap-4">
              <Card title="Basic information">
                <div className="grid gap-2">
                  <Form.Item
                    name="name"
                    label="Organization name"
                    rules={[{ required: true, message: "Required field" }]}
                  >
                    <Input />
                  </Form.Item>
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <Form.Item
                      name="type"
                      label="Organization type"
                      rules={[{ required: true, message: "Required field" }]}
                    >
                      <Select options={organizationTypes} />
                    </Form.Item>
                    <Form.Item name="isCompetitor" label="Competitor">
                      <Switch className="justify-center mx-auto block" />
                    </Form.Item>
                  </div>
                </div>
              </Card>
              <Card title="Location">
                <div className="grid gap-4">
                  <Form.Item name="location" label="Full address">
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item
                    name="country"
                    label="Country"
                    rules={[{ required: true, message: "Required field" }]}
                  >
                    <Select
                      labelRender={({ value }) => value}
                      options={countries.map((country) => ({
                        ...country,
                        value: country.label,
                        label: (
                          <span className="flex items-center justify-start gap-2">
                            <img
                              className="size-6"
                              src={country.image}
                              alt={country.emoji}
                            />
                            <span>{country.label}</span>
                          </span>
                        ),
                      }))}
                      showSearch
                    />
                  </Form.Item>
                </div>
              </Card>
              <Card title="Contacts">
                <div className="grid gap-4">
                  <Form.Item label="Phone numbers">
                    <Form.List name={["contacts", "phones"]}>
                      {(fields, { add, remove }) => (
                        <div className="grid gap-4">
                          <div className="grid gap-4 grid-cols-2">
                            {fields.map(({ key, name }, index) => (
                              <Form.Item
                                name={name}
                                key={key}
                                rules={[
                                  { required: true, message: "Required field" },
                                ]}
                              >
                                <Input
                                  placeholder="Phone number"
                                  suffix={
                                    <Button
                                      type="text"
                                      className="px-0 min-h-0"
                                      danger
                                      size="small"
                                    >
                                      <X
                                        className="size-4"
                                        onClick={() => remove(index)}
                                      />
                                    </Button>
                                  }
                                />
                              </Form.Item>
                            ))}
                          </div>
                          <Button onClick={() => add("")} type="dashed">
                            Add phone number
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                  <Divider />
                  <Form.Item label="Websites">
                    <Form.List name={["contacts", "websites"]}>
                      {(fields, { add, remove }) => (
                        <div className="grid gap-4">
                          {fields.map(({ key, name }, index) => (
                            <div className="grid grid-cols-2 gap-2" key={key}>
                              <Form.Item
                                name={[name, "title"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Required field",
                                  },
                                ]}
                              >
                                <Input placeholder="Title" />
                              </Form.Item>
                              <Form.Item
                                name={[name, "url"]}
                                key={key}
                                rules={[
                                  {
                                    required: true,
                                    message: "Required field",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="URL"
                                  suffix={
                                    <Button
                                      type="text"
                                      className="px-0 min-h-0"
                                      danger
                                      size="small"
                                    >
                                      <X
                                        className="size-4"
                                        onClick={() => remove(index)}
                                      />
                                    </Button>
                                  }
                                />
                              </Form.Item>
                            </div>
                          ))}
                          <Button onClick={() => add("")} type="dashed">
                            Add a website
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                  <Divider />
                  <Form.Item label="Social media">
                    <Form.List name={["contacts", "socialMedias"]}>
                      {(fields, { add, remove }) => (
                        <div className="grid gap-4">
                          {fields.map(({ key, name }, index) => (
                            <div className="grid grid-cols-2 gap-2" key={key}>
                              <Form.Item
                                name={[name, "title"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Required field",
                                  },
                                ]}
                              >
                                <Input placeholder="Title" />
                              </Form.Item>
                              <Form.Item
                                name={[name, "url"]}
                                key={key}
                                rules={[
                                  {
                                    required: true,
                                    message: "Required field",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="URL"
                                  suffix={
                                    <Button
                                      type="text"
                                      className="px-0 min-h-0"
                                      danger
                                      size="small"
                                    >
                                      <X
                                        className="size-4"
                                        onClick={() => remove(index)}
                                      />
                                    </Button>
                                  }
                                />
                              </Form.Item>
                            </div>
                          ))}
                          <Button onClick={() => add("")} type="dashed">
                            Add a social media account
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </div>
              </Card>
              <Card title="Product information">
                <div className="grid gap-4">
                  <Form.Item
                    name="productDescription"
                    label="Description of this organization's products"
                  >
                    <Input.TextArea placeholder="Product description" />
                  </Form.Item>
                  <Form.Item
                    name="tags"
                    label="Product or organization related tags"
                  >
                    <Select placeholder="Tags" mode="tags" />
                  </Form.Item>
                  <Form.Item label="Products">
                    <Form.List name={"products"}>
                      {(fields, { add, remove }) => (
                        <div className="grid gap-4">
                          {fields.map(({ key, name }, index) => (
                            <div className="grid grid-cols-2 gap-2" key={key}>
                              <Form.Item name={[name, "hsCode"]}>
                                <Input placeholder="HS Code" />
                              </Form.Item>
                              <Form.Item name={[name, "name"]} key={key}>
                                <Input
                                  placeholder="Product name"
                                  suffix={
                                    <Button
                                      type="text"
                                      className="px-0 min-h-0"
                                      danger
                                      size="small"
                                    >
                                      <X
                                        className="size-4"
                                        onClick={() => remove(index)}
                                      />
                                    </Button>
                                  }
                                />
                              </Form.Item>
                            </div>
                          ))}
                          <Button onClick={() => add("")} type="dashed">
                            Add a product
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </div>
              </Card>
            </div>
            <div className="sticky bottom-0 py-4 bg-stone-50 grid">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="h-12"
                loading={isLoading}
                disabled={isLoading}
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
