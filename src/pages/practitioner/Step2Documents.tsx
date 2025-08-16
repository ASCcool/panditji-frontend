import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { uploadDocument } from "../../api/documents";
import { changePractitionerStatus } from "../../api/practitioners";

export default function Step2Documents() {
  const { id } = useParams();
  const practitionerId = Number(id);
  const nav = useNavigate();

  const [files, setFiles] = useState<{[k:string]: File | null}>({
    photo_id: null, address_proof: null, passport_photo: null
  });
  const [busy, setBusy] = useState(false);

  const uploadAll = async () => {
    setBusy(true);
    try {
      for (const kind of Object.keys(files)) {
        const f = files[kind];
        if (f) await uploadDocument(practitionerId, kind, f);
      }
      alert("Documents uploaded");
    } finally { setBusy(false); }
  };

  const submit = async () => {
    await changePractitionerStatus(practitionerId, "submitted");
    alert("Submitted for review");
    nav("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">Step 2 — Upload Documents</h2>
      {["photo_id", "address_proof", "passport_photo"].map((k) => (
        <div key={k} className="flex items-center gap-3">
          <label className="w-40 capitalize">{k.replace("_"," ")}</label>
          <input type="file" onChange={(e)=>setFiles({...files, [k]: e.target.files?.[0] || null})} />
        </div>
      ))}
      <div className="flex gap-3">
        <button disabled={busy} onClick={uploadAll} className="px-4 py-2 rounded bg-gray-600 text-white">
          {busy ? "Uploading..." : "Upload"}
        </button>
        <button onClick={submit} className="px-4 py-2 rounded bg-green-600 text-white">Submit</button>
      </div>
    </div>
  );
}
