import API from "./client";

export async function uploadDocument(practitionerId: number, kind: string, file: File) {
  const form = new FormData();
  form.append("practitioner", String(practitionerId));
  form.append("kind", kind); // "photo_id" | "address_proof" | "passport_photo" | "certificate"
  form.append("file", file);
  const { data } = await API.post("/documents/", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function listDocuments(practitionerId: number) {
  const { data } = await API.get(`/documents/?practitioner=${practitionerId}`);
  return data as Array<{ id:number; kind:string; file:string }>;
}
