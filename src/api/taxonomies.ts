import API from "./client";
export async function fetchEnrollmentMetadata() {
  const { data } = await API.get("/taxonomies/enrollment_metadata/");
  return data as {
    astrology: {id:number; name:string}[];
    puja: {id:number; name:string}[];
    languages: {id:number; name:string}[];
    service_modes: {key:string; label:string}[];
    online_scopes: {key:string; label:string}[];
    countries: string[];
  };
}
