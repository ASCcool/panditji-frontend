export type FeePreferences = {
    currency?: string;
    consultation_fee?: number | null;
    hourly_rate?: number | null;
    puja_fees?: { puja_taxonomy_id: number; amount: number }[];
  };
  
  export type Practitioner = {
    id: number;
    full_name: string;
    email: string;
    permanent_address: string;
    expertise_ids: number[];
    specific_puja_expertise_ids: number[];
    language_ids: number[];
    preferred_service_modes: string[];
    inperson_primary_city?: string;
    inperson_additional_cities?: string[];
    online_scope?: string;
    online_specific_countries?: string[];
    availability?: Record<string, [string, string][]>;
    fee_preferences?: FeePreferences;
    status: "draft" | "submitted" | "approved" | "rejected";
    created_at: string;
    updated_at: string;
  };
  