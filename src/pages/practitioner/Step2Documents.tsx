import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { uploadDocument, listDocuments, deleteDocument } from "../../api/documents";
import { changePractitionerStatus } from "../../api/practitioners";

interface Document {
  id: number;
  practitioner: number;
  kind: string;
  file: string;
  verified_at: string | null;
  uploaded_at: string;
}

export default function Step2Documents() {
  const { id } = useParams();
  const practitionerId = Number(id);
  const nav = useNavigate();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [files, setFiles] = useState<{[k:string]: File | null}>({
    photo_id: null, 
    address_proof: null, 
    passport_photo: null,
    certificate: null
  });
  const [uploading, setUploading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fileErrors, setFileErrors] = useState<{[k:string]: string}>({});

  // Document type configurations
  const documentTypes = [
    { key: "photo_id", label: "Photo ID", icon: "🆔", description: "Government issued photo identification", required: true },
    { key: "address_proof", label: "Address Proof", icon: "🏠", description: "Utility bill or address verification document", required: true },
    { key: "passport_photo", label: "Passport Photo", icon: "📸", description: "Recent passport size photograph", required: true },
    { key: "certificate", label: "Additional Certificate", icon: "🏆", description: "Any additional certificates or documents (optional)", required: false }
  ];

  // Load existing documents
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await listDocuments(practitionerId);
      setDocuments(docs);
    } catch (error) {
      console.error("Error loading documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadSingleDocument = async (kind: string, file: File) => {
    setUploading(kind);
    try {
      await uploadDocument(practitionerId, kind, file);
      await loadDocuments(); // Reload documents
      setFiles(prev => ({ ...prev, [kind]: null })); // Clear file input
      alert(`${documentTypes.find(d => d.key === kind)?.label} uploaded successfully!`);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(null);
    }
  };

  const deleteDocumentHandler = async (docId: number) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    
    setDeleting(docId);
    try {
      await deleteDocument(docId);
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
      alert("Document deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const openDocument = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  const submitForReview = async () => {
    if (documents.length < 3) {
      alert("Please upload all required documents before submitting for review.");
      return;
    }

    setSubmitting(true);
    try {
      await changePractitionerStatus(practitionerId, "submitted");
      alert("Profile submitted for review successfully! 🎉");
      nav("/");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getDocumentByKind = (kind: string) => {
    return documents.find(doc => doc.kind === kind);
  };

  const validateFile = (file: File, kind: string): string | null => {
    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return `File size must be less than 5MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`;
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return 'Only JPG, PNG, GIF images and PDF files are allowed';
    }

    return null; // No error
  };

  const handleFileChange = (kind: string, file: File | null) => {
    // Clear previous error
    setFileErrors(prev => ({ ...prev, [kind]: '' }));

    if (!file) {
      setFiles(prev => ({ ...prev, [kind]: null }));
      return;
    }

    // Validate file
    const error = validateFile(file, kind);
    if (error) {
      setFileErrors(prev => ({ ...prev, [kind]: error }));
      setFiles(prev => ({ ...prev, [kind]: null }));
      return;
    }

    // File is valid
    setFiles(prev => ({ ...prev, [kind]: file }));
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent drop-shadow-lg mb-2">
            Step 2 — Upload Documents
          </h1>
          <p className="text-gray-600 text-lg">Upload required documents to complete your profile</p>
        </div>

        {/* Document Upload Sections */}
        <div className="space-y-6">
          {documentTypes.map((docType) => {
            const existingDoc = getDocumentByKind(docType.key);
            const isUploading = uploading === docType.key;
            const hasFile = files[docType.key];

            return (
              <div key={docType.key} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                {/* Document Header */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{docType.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold">{docType.label}</h3>
                      <p className="text-sm opacity-90">{docType.description}</p>
                    </div>
                  </div>
                </div>

                {/* Document Content */}
                <div className="p-6">
                  {existingDoc ? (
                    // Existing Document Display
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">✅</span>
                          </div>
                          <div>
                            <p className="font-medium text-green-800">Document Uploaded</p>
                            <p className="text-sm text-green-600">
                              Uploaded on {new Date(existingDoc.uploaded_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openDocument(existingDoc.file)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
                          >
                            <span>👁️</span>
                            View
                          </button>
                                                     <button
                             onClick={() => deleteDocumentHandler(existingDoc.id)}
                             disabled={deleting === existingDoc.id}
                             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 disabled:opacity-50"
                           >
                            {deleting === existingDoc.id ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <span>🗑️</span>
                            )}
                            {deleting === existingDoc.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // File Upload Section
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors duration-300">
                        <div className="space-y-3">
                          <span className="text-4xl">📁</span>
                          <div>
                            <p className="text-gray-600">
                              {hasFile ? hasFile.name : `Click to upload ${docType.label.toLowerCase()}`}
                            </p>
                            {hasFile && (
                              <p className="text-sm text-gray-500 mt-1">
                                Size: {(hasFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => setFiles({...files, [docType.key]: e.target.files?.[0] || null})}
                            className="hidden"
                            id={`file-${docType.key}`}
                          />
                          <label
                            htmlFor={`file-${docType.key}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
                          >
                            <span>📤</span>
                            Choose File
                          </label>
                        </div>
                      </div>

                      {/* Upload Button */}
                      {hasFile && (
                        <button
                          onClick={() => uploadSingleDocument(docType.key, hasFile!)}
                          disabled={isUploading}
                          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3"
                        >
                          {isUploading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <span>🚀</span>
                              Upload {docType.label}
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Upload Progress</h3>
            <span className="text-sm text-gray-600">
              {documents.length} of 3 documents uploaded
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{width: `${(documents.length / 3) * 100}%`}}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {documents.length === 3 ? "🎉 All documents uploaded! Ready to submit." : "Please upload all required documents to proceed."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => nav(`/practitioner/step1`)}
            className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-gray-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <span className="flex items-center gap-3">
              <span>⬅️</span>
              Back to Profile
            </span>
          </button>

          <button
            onClick={submitForReview}
            disabled={documents.length < 3 || submitting}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-green-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <span>📤</span>
                Submit for Review
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
