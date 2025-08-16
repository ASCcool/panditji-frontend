import { useEffect, useState } from "react";
import { fetchEnrollmentMetadata } from "../../api/taxonomies";
import { createPractitionerDraft, patchPractitioner } from "../../api/practitioners";
import Input from "../../components/form/Input";
import MultiSelect from "../../components/form/MultiSelect";
import Select from "../../components/form/Select";
import { useNavigate } from "react-router-dom";

export default function Step1Profile() {
  const nav = useNavigate();
  const [meta, setMeta] = useState<any>(null);
  const [id, setId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<any>({
    // Personal Information
    full_name: "",
    date_of_birth: "",
    gender: "",
    permanent_address: "",
    current_address: "",
    primary_phone: "",
    alt_phone: "",
    whatsapp: "",
    email: "",
    
    // Professional Information
    years_experience: "",
    lineage: "",
    bio: "",
    
    // Expertise (Multi-select fields)
    expertise_ids: [],
    specific_puja_expertise_ids: [],
    language_ids: [],
    
    // Service Modes (Multi-select)
    preferred_service_modes: [],
    
    // Location & Travel
    inperson_primary_city: "",
    inperson_additional_cities: [],
    travel_radius_km: "",
    
    // Online Services
    online_scope: "global",
    online_specific_countries: [],
    
    // Availability (will be handled separately)
    availability: {
      mon: [["10:00", "18:00"]],
      tue: [["10:00", "18:00"]],
      wed: [["10:00", "18:00"]],
      thu: [["10:00", "18:00"]],
      fri: [["10:00", "18:00"]],
      sat: [["10:00", "18:00"]],
      sun: [["10:00", "18:00"]]
    },
    
    // Fee Preferences
    currency: "INR",
    consultation_fee: "",
    hourly_rate: "",
    puja_fees: [],
    
    // Affiliation
    affiliation_org: "",
    affiliation_role: "",
    motivation: "",
    
    // Banking
    bank_account_holder: "",
    bank_name: "",
    account_number: "",
    ifsc: "",
    upi_id: "",
    
    // Legal
    accepted_terms: false,
    background_check_consent: false
  });

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch metadata first
        const metadata = await fetchEnrollmentMetadata();
        setMeta(metadata);
        
        // Try to fetch existing practitioner data
        try {
          const response = await fetch('http://localhost:8000/api/practitioners/me/', {
            headers: {
              'Authorization': `Token ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const existingData = await response.json();
            setId(existingData.id);
            
            // Extract nested fee_preferences to flat form fields
            const feePrefs = existingData.fee_preferences || {};
            
            setForm((prev: any) => ({
              ...prev,
              ...existingData,
              // Extract fee preferences to flat fields
              currency: feePrefs.currency || "INR",
              consultation_fee: feePrefs.consultation_fee || "",
              hourly_rate: feePrefs.hourly_rate || "",
              puja_fees: feePrefs.puja_fees || [],
              // Ensure arrays are properly initialized
              expertise_ids: existingData.expertise_ids || [],
              specific_puja_expertise_ids: existingData.specific_puja_expertise_ids || [],
              language_ids: existingData.language_ids || [],
              preferred_service_modes: existingData.preferred_service_modes || [],
              inperson_additional_cities: existingData.inperson_additional_cities || [],
              online_specific_countries: existingData.online_specific_countries || []
            }));
          }
        } catch (error) {
          console.log("No existing practitioner data found, starting fresh");
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  async function save() {
    setSaving(true);
    try {
      const payload = { ...form };
      
      // Convert string numbers to actual numbers
      if (payload.years_experience) payload.years_experience = Number(payload.years_experience);
      if (payload.travel_radius_km) payload.travel_radius_km = Number(payload.travel_radius_km);
      
      // Process fee preferences - convert to nested structure for backend
      const feePreferences: any = {
        currency: payload.currency || "INR"
      };
      
      if (payload.consultation_fee) {
        feePreferences.consultation_fee = Number(payload.consultation_fee);
      }
      
      if (payload.hourly_rate) {
        feePreferences.hourly_rate = Number(payload.hourly_rate);
      }
      
      // Process puja_fees - convert amounts to numbers and filter out empty entries
      if (payload.puja_fees && payload.puja_fees.length > 0) {
        feePreferences.puja_fees = payload.puja_fees
          .filter((fee: any) => fee.puja_taxonomy_id && fee.amount)
          .map((fee: any) => ({
            puja_taxonomy_id: Number(fee.puja_taxonomy_id),
            amount: Number(fee.amount)
          }));
      }
      
      // Replace flat fee fields with nested fee_preferences
      delete payload.currency;
      delete payload.consultation_fee;
      delete payload.hourly_rate;
      delete payload.puja_fees;
      payload.fee_preferences = feePreferences;
      
      console.log("Sending payload to backend:", payload);
      
      const res = id ? await patchPractitioner(id, payload)
                     : await createPractitionerDraft(payload);
      
      if (!id) setId(res.id);
      alert("Profile saved successfully!");
      nav(`/practitioner/step2/${res.id}`);
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="max-w-3xl mx-auto p-6">Loading...</div>;
  }

  // Debug: Log current form state
  console.log("Current form state:", form);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Empanelment — Step 1 (Profile)</h1>
      
      {/* Personal Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Full Name *" 
            value={form.full_name} 
            onChange={e => setForm({...form, full_name: e.target.value})} 
            required 
          />
          <Input 
            label="Date of Birth *" 
            type="date" 
            value={form.date_of_birth} 
            onChange={e => setForm({...form, date_of_birth: e.target.value})} 
            required 
          />
          <Select 
            label="Gender *" 
            value={form.gender} 
            onChange={e => setForm({...form, gender: e.target.value})}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
          <Input 
            label="Email *" 
            type="email" 
            value={form.email} 
            onChange={e => setForm({...form, email: e.target.value})} 
            required 
          />
          <Input 
            label="Primary Phone *" 
            value={form.primary_phone} 
            onChange={e => setForm({...form, primary_phone: e.target.value})} 
            required 
          />
          <Input 
            label="Alternative Phone" 
            value={form.alt_phone} 
            onChange={e => setForm({...form, alt_phone: e.target.value})} 
          />
          <Input 
            label="WhatsApp" 
            value={form.whatsapp} 
            onChange={e => setForm({...form, whatsapp: e.target.value})} 
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Address Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Permanent Address *" 
            value={form.permanent_address} 
            onChange={e => setForm({...form, permanent_address: e.target.value})} 
            required 
          />
          <Input 
            label="Current Address" 
            value={form.current_address} 
            onChange={e => setForm({...form, current_address: e.target.value})} 
          />
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Professional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Years of Experience *" 
            type="number" 
            value={form.years_experience} 
            onChange={e => setForm({...form, years_experience: e.target.value})} 
            required 
          />
          <Input 
            label="Lineage/Tradition" 
            value={form.lineage} 
            onChange={e => setForm({...form, lineage: e.target.value})} 
          />
        </div>
        <div className="mt-4">
          <Input 
            label="Bio/Introduction" 
            value={form.bio} 
            onChange={e => setForm({...form, bio: e.target.value})} 
            className="w-full"
          />
        </div>
      </div>

      {/* Expertise & Languages */}
      {meta && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Expertise & Languages</h2>
          <div className="space-y-4">
            <MultiSelect 
              label="Expertise (Astrology + Puja) *"
              value={form.expertise_ids || []}
              onChange={(selectedValues) => {
                console.log("Expertise selected:", selectedValues);
                setForm({
                  ...form, 
                  expertise_ids: selectedValues.map(v => Number(v))
                });
              }}
              getOptionLabel={(value) => {
                const allExpertise = [...meta.astrology, ...meta.puja];
                const item = allExpertise.find(t => t.id === value);
                return item ? item.name : String(value);
              }}
              required
            >
              {[...meta.astrology, ...meta.puja].map((t: any) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </MultiSelect>

            <MultiSelect 
              label="Specific Puja Expertise (subset of above)"
              value={form.specific_puja_expertise_ids || []}
              onChange={(selectedValues) => {
                console.log("Specific Puja selected:", selectedValues);
                setForm({
                  ...form, 
                  specific_puja_expertise_ids: selectedValues.map(v => Number(v))
                });
              }}
              getOptionLabel={(value) => {
                const item = meta.puja.find((t: any) => t.id === value);
                return item ? item.name : String(value);
              }}
            >
              {meta.puja.map((t: any) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </MultiSelect>

            <MultiSelect 
              label="Languages *"
              value={form.language_ids || []}
              onChange={(selectedValues) => {
                console.log("Languages selected:", selectedValues);
                setForm({
                  ...form, 
                  language_ids: selectedValues.map(v => Number(v))
                });
              }}
              getOptionLabel={(value) => {
                const item = meta.languages.find((t: any) => t.id === value);
                return item ? item.name : String(value);
              }}
              required
            >
              {meta.languages.map((t: any) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </MultiSelect>
          </div>
        </div>
      )}

      {/* Service Modes */}
      {meta && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Service Modes</h2>
          <div className="space-y-4">
            <MultiSelect 
              label="Preferred Service Modes *"
              value={form.preferred_service_modes || []}
              onChange={(selectedValues) => {
                console.log("Service modes selected:", selectedValues);
                setForm({
                  ...form, 
                  preferred_service_modes: selectedValues.map(v => String(v))
                });
              }}
              getOptionLabel={(value) => {
                const item = meta.service_modes.find((s: any) => s.key === value);
                return item ? item.label : String(value);
              }}
              required
            >
              {meta.service_modes.map((s: any) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </MultiSelect>

            <Select 
              label="Online Scope" 
              value={form.online_scope} 
              onChange={e => setForm({...form, online_scope: e.target.value})}
            >
              {meta.online_scopes.map((s: any) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </Select>

            {form.online_scope === "specific_countries" && (
              <MultiSelect 
                label="Online Specific Countries"
                value={form.online_specific_countries || []}
                onChange={(selectedValues) => {
                  console.log("Online countries selected:", selectedValues);
                  setForm({
                    ...form, 
                    online_specific_countries: selectedValues.map(v => String(v))
                  });
                }}
                getOptionLabel={(value) => {
                  // Map country codes to readable names
                  const countryNames: { [key: string]: string } = {
                    'IN': 'India',
                    'US': 'United States',
                    'GB': 'United Kingdom'
                  };
                  return countryNames[value] || String(value);
                }}
              >
                {meta.countries && meta.countries.map((country: string) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </MultiSelect>
            )}
          </div>
        </div>
      )}

      {/* Location & Travel */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Location & Travel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Primary City (In-person) *" 
            value={form.inperson_primary_city} 
            onChange={e => setForm({...form, inperson_primary_city: e.target.value})} 
            required 
          />
          <Input 
            label="Travel Radius (km)" 
            type="number" 
            value={form.travel_radius_km} 
            onChange={e => setForm({...form, travel_radius_km: e.target.value})} 
          />
        </div>
        <div className="mt-4">
                      <MultiSelect 
              label="Additional Cities (In-person)"
              value={form.inperson_additional_cities || []}
              onChange={(selectedValues) => {
                console.log("Additional cities selected:", selectedValues);
                setForm({
                  ...form, 
                  inperson_additional_cities: selectedValues.map(v => String(v))
                });
              }}
            >
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Prayagraj">Prayagraj</option>
            <option value="Lucknow">Lucknow</option>
          </MultiSelect>
        </div>
      </div>

      {/* Fee Preferences */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Fee Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Select 
            label="Currency" 
            value={form.currency} 
            onChange={e => setForm({...form, currency: e.target.value})}
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </Select>
          <Input 
            label="Consultation Fee" 
            type="number" 
            value={form.consultation_fee} 
            onChange={e => setForm({...form, consultation_fee: e.target.value})} 
            placeholder="e.g., 500"
          />
          <Input 
            label="Hourly Rate" 
            type="number" 
            value={form.hourly_rate} 
            onChange={e => setForm({...form, hourly_rate: e.target.value})} 
            placeholder="e.g., 1000"
          />
        </div>
        
        {/* Puja Fees Section */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-medium">Puja-Specific Fees</h3>
            <button
              type="button"
              onClick={() => {
                const newPujaFee = { puja_taxonomy_id: "", amount: "" };
                setForm({
                  ...form,
                  puja_fees: [...(form.puja_fees || []), newPujaFee]
                });
              }}
              className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              + Add Puja Fee
            </button>
          </div>
          
          {form.puja_fees && form.puja_fees.length > 0 ? (
            <div className="space-y-3">
              {form.puja_fees.map((pujaFee: any, index: number) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded border">
                  <div className="flex-1">
                    <Select
                      label="Puja Type"
                      value={pujaFee.puja_taxonomy_id}
                      onChange={e => {
                        const updatedFees = [...form.puja_fees];
                        updatedFees[index].puja_taxonomy_id = Number(e.target.value);
                        setForm({...form, puja_fees: updatedFees});
                      }}
                    >
                      <option value="">Select Puja Type</option>
                      {meta && meta.puja && meta.puja.map((p: any) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Amount"
                      type="number"
                      value={pujaFee.amount}
                      onChange={e => {
                        const updatedFees = [...form.puja_fees];
                        updatedFees[index].amount = e.target.value;
                        setForm({...form, puja_fees: updatedFees});
                      }}
                      placeholder="e.g., 3000"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedFees = form.puja_fees.filter((_: any, i: number) => i !== index);
                      setForm({...form, puja_fees: updatedFees});
                    }}
                    className="mt-6 px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No puja fees added yet. Click "Add Puja Fee" to set specific rates.</p>
          )}
        </div>
      </div>

      {/* Affiliation */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Affiliation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Affiliation Organization" 
            value={form.affiliation_org} 
            onChange={e => setForm({...form, affiliation_org: e.target.value})} 
          />
          <Input 
            label="Affiliation Role" 
            value={form.affiliation_role} 
            onChange={e => setForm({...form, affiliation_role: e.target.value})} 
          />
        </div>
        <div className="mt-4">
          <Input 
            label="Motivation for Joining" 
            value={form.motivation} 
            onChange={e => setForm({...form, motivation: e.target.value})} 
            className="w-full"
          />
        </div>
      </div>

      {/* Banking Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Banking Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Account Holder Name" 
            value={form.bank_account_holder} 
            onChange={e => setForm({...form, bank_account_holder: e.target.value})} 
          />
          <Input 
            label="Bank Name" 
            value={form.bank_name} 
            onChange={e => setForm({...form, bank_name: e.target.value})} 
          />
          <Input 
            label="Account Number" 
            value={form.account_number} 
            onChange={e => setForm({...form, account_number: e.target.value})} 
          />
          <Input 
            label="IFSC Code" 
            value={form.ifsc} 
            onChange={e => setForm({...form, ifsc: e.target.value})} 
          />
          <Input 
            label="UPI ID" 
            value={form.upi_id} 
            onChange={e => setForm({...form, upi_id: e.target.value})} 
          />
        </div>
      </div>

      {/* Legal Agreements */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Legal Agreements</h2>
        
        {/* Terms and Conditions */}
        <div className="mb-4">
          <div className="bg-white p-4 rounded border max-h-40 overflow-y-auto">
            <h4 className="font-medium text-gray-800 mb-2">Terms and Conditions</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>1. Service Agreement:</strong> By joining our platform, you agree to provide authentic spiritual and religious services in accordance with traditional practices and your stated expertise.</p>
              <p><strong>2. Professional Conduct:</strong> You must maintain professional behavior, respect client privacy, and provide services with integrity and honesty.</p>
              <p><strong>3. Fee Structure:</strong> All fees must be transparently communicated to clients. You are responsible for setting and collecting your own fees.</p>
              <p><strong>4. Client Confidentiality:</strong> You must maintain strict confidentiality of all client information and consultations.</p>
              <p><strong>5. Platform Guidelines:</strong> You agree to follow all platform policies, including those related to content, behavior, and service quality.</p>
              <p><strong>6. Liability:</strong> The platform acts as a facilitator and is not liable for the quality or outcome of services provided by practitioners.</p>
              <p><strong>7. Termination:</strong> Either party may terminate this agreement with appropriate notice. Violation of terms may result in immediate removal.</p>
            </div>
          </div>
          <label className="flex items-start space-x-3 mt-3">
            <input 
              type="checkbox" 
              checked={form.accepted_terms} 
              onChange={e => setForm({...form, accepted_terms: e.target.checked})}
              required
              className="mt-1"
            />
            <span className="text-sm">I have read, understood, and agree to the terms and conditions above *</span>
          </label>
        </div>

        {/* Background Check Consent */}
        <div className="mb-4">
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-800 mb-2">Background Verification Consent</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>To ensure the safety and trust of our community, we conduct background verification for all practitioners. This includes:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Identity verification</li>
                <li>Criminal background check</li>
                <li>Professional reference verification</li>
                <li>Document authenticity verification</li>
              </ul>
              <p className="mt-2"><strong>Note:</strong> Your personal information will be handled with strict confidentiality and used solely for verification purposes.</p>
            </div>
          </div>
          <label className="flex items-start space-x-3 mt-3">
            <input 
              type="checkbox" 
              checked={form.background_check_consent} 
              onChange={e => setForm({...form, background_check_consent: e.target.checked})}
              required
              className="mt-1"
            />
            <span className="text-sm">I consent to background verification and understand the verification process described above *</span>
          </label>
        </div>
      </div>

      <button 
        disabled={saving} 
        onClick={save} 
        className="w-full px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save & Continue"}
      </button>
    </div>
  );
}
