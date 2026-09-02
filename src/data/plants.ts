export interface Plant {
  id: string;
  code: string;
  name: string;
  location: string;
  status: "Active" | "Inactive";
}

export const defaultPlants: Plant[] = [
  { id: "p1", code: "KSP", name: "Kamanda Steel Plant", location: "Kamanda", status: "Active" },
];
