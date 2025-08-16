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
  return data as Array<{ 
    id: number; 
    practitioner: number; 
    kind: string; 
    file: string; 
    verified_at: string | null; 
    uploaded_at: string; 
  }>;
}

export async function deleteDocument(documentId: number) {
  const { data } = await API.delete(`/documents/${documentId}/`);
  return data;
}
