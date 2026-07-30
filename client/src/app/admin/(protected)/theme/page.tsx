"use client";

import { AdminSingletonPage } from "@/components/dashboard/AdminSingletonPage";
import { createSingletonApi } from "@/utils/createResourceApi";
import type { ThemeSettings } from "@/services/api/themeService";

const api = createSingletonApi<ThemeSettings>("/theme");

export default function AdminThemePage() {
  return (
    <AdminSingletonPage<ThemeSettings>
      title="Theme Manager"
      description="Sets the default theme new visitors see. Returning visitors keep their own saved choice."
      queryKey="admin-theme"
      api={api}
      fields={[
        {
          name: "mode",
          label: "Default mode",
          type: "select",
          options: [
            { label: "Dark", value: "dark" },
            { label: "Light", value: "light" },
          ],
        },
        {
          name: "accent",
          label: "Default accent",
          type: "select",
          options: [
            { label: "Purple", value: "purple" },
            { label: "Blue", value: "blue" },
            { label: "Black", value: "black" },
          ],
        },
        {
          name: "backgroundStyle",
          label: "Background style",
          type: "select",
          options: [
            { label: "Solid", value: "solid" },
            { label: "Gradient", value: "gradient" },
            { label: "Mesh", value: "mesh" },
          ],
        },
      ]}
    />
  );
}
