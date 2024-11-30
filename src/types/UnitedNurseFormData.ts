interface UnifiedNurseFormData {
    // Common fields (required for both forms)
    dx?: string;
    pmh?: string;
    neuro?: string;
    cards: string;
    resp?: string;
    gi?: string;
    gu?: string;
    skinWound?: string;
    vitals: {
      temperature: string;
      bp?: string;
      hr?: string;
      o2?: string;
      respiratoryRate?: string;
      ls?: string;
    };
    labs?: {
      bnp?: string;
      ck?: string;
      trop?: string;
      ptInr?: string;
      ptt?: string;
      wbc?: string;
      hgb?: string;
      hct?: string;
      plt?: string;
      pt?: string;
      inr?: string;
      na?: string;
      k?: string;
      cl?: string;
      co2?: string;
      bun?: string;
      creat?: string;
      gluc?: string;
      tbil?: string;
      alkP?: string;
      ast?: string;
      alt?: string;
    };
  
    // Fields that may be specific to one form or the other (optional)
    meds?: string;
    fs?: string;
    cathEpLab?: {
      fent?: string;
      versed?: string;
      cont?: string;
      ivf?: string;
    };
    plans?: string;
    callMD?: {
      hrLow?: string;
      hrHigh?: string;
      sbpLow?: string;
      sbpHigh?: string;
      dbpHigh?: string;
      tHigh?: string;
      rrLow?: string;
      rrHigh?: string;
      o2Low?: string;
      pttHigh?: string;
    };
    activity?: string;
    precaution?: string;
    diet?: string;
    nameAge?: string;
    code?: string;
    allergy?: string;
    md?: string;
    lc?: string;
    rm?: string;
  
    // Additional fields from NursingStudentBrainData (optional)
    age?: string;
    gender?: string;
    admDate?: string;
    codeStatus?: string;
    allergies?: string;
    diagnosisProcedures?: string;
    iv?: string;
    io?: string;
    importantHistory?: string;
    comorbidities?: string;
    fallRisk?: string;
    isolation?: string;
    ulcers?: string;
    assessment?: {
      neuro?: string;
      cv?: string;
      resp?: string;
      gigu?: string;
      musculoskeletal?: string;
      psychSocial?: string;
      other?: string;
    };
    planOfCare?: string;
  }

  export default UnifiedNurseFormData;