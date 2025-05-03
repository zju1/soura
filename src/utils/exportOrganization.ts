import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import type { SingleOrganization } from "@/features/organizations/dto/organization.dto";

export function exportAsExcel(data: SingleOrganization[], fileName: string) {
  const sheetContent = data.map((item) => [
    item.name,
    item.country,
    item.isCompetitor ? "Yes" : "No",
    item.aggregatedVolume,
    item.topDestinationPorts?.join(", "),
    item.topDeparturePorts?.join(", "),
    item.totalShipments,
    `Sea: ${item.shipments?.sea || 0}, Air: ${
      item.shipments?.air || 0
    }, Rail: ${item.shipments?.rail || 0}, Land: ${item.shipments?.land}`,
    item.averageTEU?.perShipment,
    item.averageTEU?.perMonth,
    item.totalTEU,
    item.totalWeight,
    item.topHSCodes?.join(", "),
    item.location,
    item.products.map((item) => `${item.hsCode}: ${item.name}`).join(", "),
    item.tags.join(", "),
    item.productDescription,
  ]);

  const sheetData = [
    [
      "Organization name",
      "Country",
      "Competitor",
      "Aggregated volume",
      "TOP destination ports",
      "TOP departure ports",
      "Total shipments",
      "Shipments by type",
      "Average TEU per shipment",
      "Average TEU per month",
      "Total TEU",
      "Total weight",
      "TOP HS codes",
      "Location",
      "Products",
      "Tags",
      "Product description",
    ],
    ...sheetContent,
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(sheetData); // AOA = Array of Arrays

  // Create workbook and add the sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "MainData");

  // Generate buffer
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Trigger download
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  FileSaver.saveAs(blob, `${fileName}.xlsx`);
}
