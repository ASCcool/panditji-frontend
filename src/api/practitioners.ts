import API from "./client";
import type { Practitioner } from "../types/models";

export async function getPractitionerMe() {
  const { data } = await API.get("/practitioners/me/");
  return data as Practitioner;
}

export async function createPractitionerDraft(payload: Partial<Practitioner>) {
  const { data } = await API.post("/practitioners/", payload);
  return data as Practitioner;
}

export async function patchPractitioner(id: number, payload: Partial<Practitioner>) {
  const { data } = await API.patch(`/practitioners/${id}/`, payload);
  return data as Practitioner;
}

export async function changePractitionerStatus(
  id: number,
  status: "draft" | "submitted" | "approved" | "rejected"
) {
  const { data } = await API.post(`/practitioners/${id}/change_status/`, { status });
  return data as { id:number; status: Practitioner["status"] };
}
