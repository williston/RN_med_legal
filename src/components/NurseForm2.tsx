'use client';

import React from 'react';

export interface NurseFormProps2 {
  rm?: string;
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
  vitals?: {
    bp?: string;
    hr?: string;
    respiratoryRate?: string;
    temperature?: string;
    o2?: string;
  };
  assessment?: {
    neuro?: string;
    cv?: string;
    resp?: string;
    gigu?: string;
    musculoskeletal?: string;
    psychSocial?: string;
    other?: string;
  };
  labs?: {
    wbc?: string;
    hgb?: string;
    hct?: string;
    plt?: string;
    pt?: string;
    ptt?: string;
    inr?: string;
    na?: string;
    k?: string;
    cl?: string;
    co2?: string;
    bun?: string;
    gluc?: string;
    creat?: string;
  };
  diagnosticTests?: string;
  planOfCare?: string;
}

interface FieldProps {
  label: string;
  type?: 'text' | 'textarea';
  value?: string;
}

const NurseForm2: React.FC<{data?:NurseFormProps2}> = ({ data = {} }) => {
  return (
    <div className="container mx-auto p-4 max-w-[8.5in] print:p-0 print:max-w-full print-page">
      <h1 className="text-2xl font-bold text-center mb-3 print:text-xl">NURSING STUDENT BRAIN</h1>
      <div className="grid grid-cols-4 gap-1 border border-gray-400 text-[12px] print:text-[9pt]">
        <SituationSection data={data} />
        <BackgroundSection data={data} />
        <AssessmentSection data={data} />
        <div className="col-span-4 flex">
          <LabValuesSection data={data} />
          <DiagnosticTestsSection data={data} />
        </div>
        <RecommendationSection data={data} />
      </div>
    </div>
  );
};

const SituationSection: React.FC<{ data: NurseFormProps2 }> = ({ data }) => (
  <div className="col-span-4 grid grid-cols-4 border-b border-gray-400">
    <div className="p-2 border-r border-gray-400">
      <h2 className="text-3xl font-bold">S</h2>
      <h3 className="text-sm">Situation</h3>
    </div>
    <div className="col-span-2 p-2 border-r border-gray-400">
      <Field label="Room:" value={data.rm} />
      <div className="grid grid-cols-3 gap-2">
        <Field label="Age:" value={data.age} />
        <Field label="Gender:" value={data.gender} />
        <Field label="Adm. Date:" value={data.admDate} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Code status:" value={data.codeStatus} />
        <Field label="Allergies:" value={data.allergies} />
      </div>
    </div>
    <div className="p-2">
      <Field label="Diagnosis/ Procedures:" type="textarea" value={data.diagnosisProcedures} />
      <Field label="IV:" value={data.iv} />
      <Field label="I&O:" value={data.io} />
    </div>
  </div>
);

const BackgroundSection: React.FC<{ data: NurseFormProps2}> = ({ data }) => (
  <div className="col-span-4 grid grid-cols-4 border-b border-gray-400">
    <div className="p-2 border-r border-gray-400">
      <h2 className="text-3xl font-bold">B</h2>
      <h3 className="text-sm">Background</h3>
    </div>
    <div className="col-span-2 p-2 border-r border-gray-400">
      <Field label="Important History:" type="textarea" value={data.importantHistory} />
      <Field label="Comorbidities:" type="textarea" value={data.comorbidities} />
    </div>
    <div className="p-2">
      <Field label="Fall risk:" value={data.fallRisk} />
      <Field label="Isolation:" value={data.isolation} />
      <Field label="Ulcers:" value={data.ulcers} />
    </div>
  </div>
);

const AssessmentSection: React.FC<{ data: NurseFormProps2 }> = ({ data }) => (
  <div className="col-span-4 grid grid-cols-4 border-b border-gray-400">
    <div className="p-2 border-r border-gray-400">
      <h2 className="text-3xl font-bold">A</h2>
      <h3 className="text-sm">Assessment</h3>
    </div>
    <div className="p-2 border-r border-gray-400">
      <Field label="BP:" value={data.vitals?.bp} />
      <Field label="HR:" value={data.vitals?.hr} />
      <Field label="RR:" value={data.vitals?.respiratoryRate} />
      <Field label="Temp:" value={data.vitals?.temperature} />
      <Field label="Pain:" value={data.vitals?.o2} />
    </div>
    <div className="col-span-2 p-2">
      <Field label="Neuro:" value={data.assessment?.neuro} />
      <Field label="CV:" value={data.assessment?.cv} />
      <Field label="Resp:" value={data.assessment?.resp} />
      <Field label="GI/GU:" value={data.assessment?.gigu} />
      <Field label="Musculoskeletal:" value={data.assessment?.musculoskeletal} />
      <Field label="Psych/Social:" value={data.assessment?.psychSocial} />
      <Field label="Other:" value={data.assessment?.other} />
    </div>
  </div>
);

const LabValuesSection: React.FC<{ data: NurseFormProps2 }> = ({ data }) => {
  return (
    <div className="w-1/2 p-2 flex flex-wrap justify-between items-start">
      <div className="w-2/4 p-1">
        <WBCBranch data={data} />
      </div>
      <div className="w-1/4 p-1">
        <INRBranch data={data} />
      </div>
      <div className="w-1/4 p-1">
        {/* <CaMgPhosBranch /> */}
      </div>
      <div className="w-full p-1">
        <BottomRowBranch data={data} />
      </div>
    </div>
  );
}

const WBCBranch: React.FC<{ data: NurseFormProps2 }> = ({ data }) => {
  return (
    <div className="w-full">
      <svg viewBox="0 0 200 100" className="w-full h-auto">
        <g className="text-[10px]">
          <path d="M80 50 L140 50" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M50 30 L80 50 L50 70" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M170 30 L140 50 L170 70" stroke="currentColor" strokeWidth="1" fill="none" />
          <text x="10" y="55" textAnchor="start">{data.labs?.wbc ?? ''}</text>
          <text x="110" y="40" textAnchor="middle">{data.labs?.hgb ?? ''}</text>
          <text x="110" y="70" textAnchor="middle">{data.labs?.hct ?? ''}</text>
          <text x="160" y="55" textAnchor="start">{data.labs?.plt ?? ''}</text>
        </g>
      </svg>
    </div>
  );
};

const INRBranch: React.FC<{ data: NurseFormProps2 }> = ({ data }) => {
  return (
    <div className="w-full">
      <svg viewBox="0 0 100 105" className="w-full h-auto">
        <g className="text-[10px]">
          <path d="M25 35 L50 50 L50 80" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M75 35 L50 50" stroke="currentColor" strokeWidth="1" fill="none" />
          <text x="30" y="60" textAnchor="end">{data.labs?.pt ?? ''}</text>
          <text x="95" y="60" textAnchor="end">{data.labs?.ptt ?? ''}</text>
          <text x="35" y="30" textAnchor="start">{data.labs?.inr ?? ''}</text>
        </g>
      </svg>
    </div>
  );
};

const BottomRowBranch: React.FC<{ data: NurseFormProps2 }> = ({ data }) => {
  return (
    <div className="w-full">
      <svg viewBox="0 0 500 100" className="w-full h-auto">
        <g className="text-[10px]">
          <path d="M0 50 L300 50" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M100 20 L100 80" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M200 20 L200 80" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M300 50 L350 20 M300 50 L350 80" stroke="currentColor" strokeWidth="1" fill="none" />
          <text x="50" y="45" textAnchor="middle">{data.labs?.na ?? ''}</text>
          <text x="50" y="70" textAnchor="middle">{data.labs?.k ?? ''}</text>
          <text x="150" y="45" textAnchor="middle">{data.labs?.cl ?? ''}</text>
          <text x="150" y="70" textAnchor="middle">{data.labs?.co2 ?? ''}</text>
          <text x="250" y="45" textAnchor="middle">{data.labs?.bun ?? ''}</text>
          <text x="325" y="55" textAnchor="start">{data.labs?.gluc ?? ''}</text>
          <text x="230" y="75" textAnchor="start">{data.labs?.creat ?? ''}</text>
        </g>
      </svg>
    </div>
  );
};

const DiagnosticTestsSection: React.FC<{ data: NurseFormProps2 }> = ({ data }) => {
  return (
    <div className="w-1/2 p-2">
      <h2 className="text-sm font-bold mb-1">Diagnostic Tests/ Other Labs:</h2>
      <textarea 
        className="w-full h-28 p-1 border rounded text-[10px]"
        placeholder="Enter diagnostic tests and other labs here..."
        value={data.diagnosticTests || ''}
        readOnly
      ></textarea>
    </div>
  );
}

const RecommendationSection: React.FC<{ data: NurseFormProps2 }> = ({ data }) => (
  <div className="col-span-4 grid grid-cols-4">
    <div className="p-2 border-r border-gray-400">
      <h2 className="text-3xl font-bold">R</h2>
      <h3 className="text-sm">Recommendation</h3>
    </div>
    <div className="col-span-3 p-2">
      <Field label="Plan of Care:" type="textarea" value={data.planOfCare} />
    </div>
  </div>
);

const Field: React.FC<FieldProps> = ({ label, type = "text", value = '' }) => (
  <div className="mb-1">
    <label className="block text-[10px] font-medium">{label}</label>
    {type === "textarea" ? (
      <textarea className="w-full rounded p-1 text-[10px]" rows={2} value={value} readOnly></textarea>
    ) : (
      <input type="text" className="w-full rounded p-1 text-[10px]" value={value} readOnly />
    )}
  </div>
);

export default NurseForm2;

