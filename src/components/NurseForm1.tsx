'use client'
import React from 'react';
import { useState } from 'react';

export interface NurseFormProps1 {
  patientInfo?: {
    room?: string;
    code?: string;
    doctors?: string;
    patient?: string;
    allergies?: string;
  };
  diagnosis?: string;
  vitalSigns?: {
    temperature?: string;
    heartRate?: string;
    bloodPressure?: string;
    respiratoryRate?: string;
    oxygenSaturation?: string;
  };
  labs?: {
    wbc?: string;
    hgb?: string;
    hct?: string;
    plt?: string;
    tbil?: string;
    alkP?: string;
    ast?: string;
    alt?: string;
    na?: string;
    k?: string;
    cl?: string;
    co2?: string;
    bun?: string;
    gluc?: string;
    creat?: string;
    ptInr?: string;
    ptt?: string;
    ca?: string;
    mg?: string;
    phos?: string;
  };
  history?: string;
  bloodSugar?: string[];
  systemStatus?: {
    neurological?: {
      status?: string;
      details?: string;
      physicalExam?: {
        mentalStatus?: string;
        cranialNerves?: string;
        motorFunction?: string;
        sensoryFunction?: string;
        reflexes?: string;
      };
    };
    cardiovascular?: {
      status?: string;
      details?: string;
      physicalExam?: {
        heartSounds?: string;
        pulses?: string;
        neckExam?: string;
        edema?: string;
      };
    };
    respiratory?: {
      status?: string;
      details?: string;
      physicalExam?: {
        breathSounds?: string;
        respiratoryEffort?: string;
        chestMovement?: string;
      };
    };
    gastrointestinalGenitourinary?: {
      status?: string;
      details?: string;
      physicalExam?: {
        abdominalExam?: string;
        bowelSounds?: string;
        urinaryOutput?: string;
      };
    };
    skin?: {
      status?: string;
      details?: string;
      physicalExam?: {
        color?: string;
        turgor?: string;
        lesions?: string;
        wounds?: string;
      };
    };
  };
  careInfo?: {
    ivFluids?: {
      status?: string;
      details?: string;
      access?: string;
    };
    dietFeeding?: {
      type?: string;
      restrictions?: string;
      assistanceNeeded?: string;
    };
    activity?: {
      level?: string;
      restrictions?: string;
      assistiveDevices?: string;
    };
    vte?: {
      prophylaxis?: string;
      contraindications?: string;
      notes?: string;
    };
    medications?: {
      current?: string;
      prn?: string;
      recentChanges?: string;
      administrationNotes?: string;
    };
  };
  notes?: string;
  imaging?: {
    xrayUltrasound?: {
      findings?: string;  // Consolidated field for all XR/US findings
      notes?: string;     // Any additional notes or context
    };
    ctScan?: {
      findings?: string;  // Consolidated field for all CT findings
      notes?: string;     // Any additional notes or context
    };
    mri?: {
      findings?: string;  // Consolidated field for all MRI findings
      notes?: string;     // Any additional notes or context
    };
  };
  plan?: {
    immediateActions?: string[];
    pendingTests?: string[];
    medicationChanges?: string;
    consultations?: string[];
    monitoringInstructions?: string;
  };
  toDoList?: {
    highPriority?: Array<{
      task: string;
      dueTime?: string;
    }>;
    routine?: string[];
    beforeEndOfShift?: string[];
  };
  teleDowngradeCriteria?: {
    "Stable resp./Off BiPAP/CPAP"?: boolean;
    "Stable cardiac monitor rhythm w/ normalizing HR"?: boolean;
    "Improving lactate"?: boolean;
    "Fever trending down"?: boolean;
    "K>3 or <6; Mg >1.5; Na>120"?: boolean;
    "Hgb >7 & no evidence of ongoing GI Bleed"?: boolean;
    "Cr at baseline or trending down"?: boolean;
    "Down trending troponin"?: boolean;
  };
  onUpdate?: (data: NurseFormProps1) => void;
}



type PatientInfoKey = 'room' | 'code' | 'doctors' | 'patient' | 'allergies' | 'consults';

const fieldToKeyMap: { [key: string]: PatientInfoKey | '' } = {
  'Room': 'room',
  'Code': 'code',
  'Doctors': 'doctors',
  'Patient': 'patient',
  'Allergies': 'allergies',
  'Consults': 'consults'
};

const NurseForm1: React.FC<{ data?: NurseFormProps1, onUpdate?: (data: NurseFormProps1) => void }> = ({ data, onUpdate }) => {

  const [formData, setFormData] = useState<NurseFormProps1>(data || {});

  // First, let's create a type for the section parameter
  type FormSection = keyof NurseFormProps1;

  // Update the handleInputChange function to remove 'any' types
  const handleInputChange = (
    section: FormSection,
    field?: string,
    subField?: string
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newFormData = { ...formData };
    if (subField) {
      // @ts-expect-error - Dynamic property access on formData[section] needs type assertion
      newFormData[section] = {
        ...(newFormData[section] as Record<string, unknown>),
        [field as string]: {
          ...(newFormData[section] as Record<string, Record<string, unknown>>)?.[field as string],
          [subField]: e.target.value
        }
      };
    } else if (field) {
      // @ts-expect-error - Dynamic property access on formData[section] needs type assertion
      newFormData[section] = {
        ...(newFormData[section] as Record<string, unknown>),
        [field]: e.target.value
      };
    } else {
      (newFormData[section] as unknown) = e.target.value;
    }
    
    setFormData(newFormData);
    onUpdate?.(newFormData);
  };

  return (
    <div className="w-full mx-auto p-4 bg-gray-100 print:p-1 print:bg-white print:w-[8in] print:h-[10.5in] print:mx-auto print:overflow-hidden">
      <div className="bg-white shadow-md rounded px-6 pt-6 pb-6 mb-4 print:shadow-none print:rounded-none print:p-1 print:box-border">
        {/* Patient Info Section */}
        <div className="grid grid-cols-6 border border-gray-300 gap-0 mb-0 print:mb-0 print:text-[9px] print:h-[0.5in]">
  {(['Room', 'Code', 'Doctors', 'Patient', 'Allergies', ''] as const).map((field) => (
    <div key={field} className={`border-l-2 border-gray-300 -mb-4 pt-1 px-3 pb-5 print:mb-auto print:pt-0 print:px-0.5 print:pb-0.5 ${
      field === 'Allergies' ? 'col-span-2 overflow-visible min-h-fit' : 'col-span-1 overflow-hidden'
    }`}>
      <label className="block text-gray-700 text-base font-bold mb-2 print:mb-[-4px] print:text-[9px] truncate">
        {field}
      </label>
      <div className={`text-gray-700 text-sm whitespace-normal print:text-[9px] print:text-wrap ${
        field === 'Allergies' ? 'overflow-visible' : 'overflow-hidden'
      }`}>
        {field !== '' && fieldToKeyMap[field] ? (
          field === 'Allergies' ? (
            <textarea
              value={formData.patientInfo?.[fieldToKeyMap[field] as keyof typeof formData.patientInfo] || ''}
              onChange={handleInputChange('patientInfo', fieldToKeyMap[field])}
              className="w-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent whitespace-pre-wrap break-words resize-none leading-tight"
              style={{ wordBreak: 'break-word' }}
              placeholder={`Enter ${field.toLowerCase()}`}
            />
          ) : (
            <input
              type="text"
              value={formData.patientInfo?.[fieldToKeyMap[field] as keyof typeof formData.patientInfo] || ''}
              onChange={handleInputChange('patientInfo', fieldToKeyMap[field])}
              className="w-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent whitespace-normal break-normal"
              placeholder={`Enter ${field.toLowerCase()}`}
            />
          )
        ) : null}
      </div>
    </div>
  ))}
</div>

{/* HPI/Diagnosis and Vital Signs Section */} 
<div className="grid grid-cols-2 gap-6 mb-6 print:mt-0 print:gap-1 print:mb-1 print:text-[9px] print:h-[2.25in]">
  {/* Left column - HPI/Diagnosis with Vital Signs */}
  <div className="border rounded p-3 print:p-0.5 print:overflow-hidden flex flex-col">
    <div className="flex-grow">
      <label className="block text-gray-700 text-base font-bold mb-3 print:text-[9px] print:mb-0.5">
        HPI/Diagnosis
      </label>
      <textarea
        value={formData.diagnosis || ''}
        onChange={handleInputChange('diagnosis')}
        className="w-full h-36 border-none focus:ring-1 focus:ring-blue-500 resize-none bg-transparent text-base print:h-[1.2in] print:leading-tight print:text-[10px]"
        placeholder="Enter diagnosis"
      />
    </div>
    
    {/* Vital Signs section with print-specific styling */}
    <div className="mt-auto print:mt-1 border-t pt-2 print:pt-0.5">
      <label className="block text-gray-700 text-base font-bold mb-2 print:text-[9px] print:mb-0.5">
        Vital Signs
      </label>
      <div className="flex flex-wrap justify-between text-md print:gap-0 print:text-[11px]">
        <div>
          T: <input
            type="text"
            value={formData.vitalSigns?.temperature || ''}
            onChange={handleInputChange('vitalSigns', 'temperature')}
            className="w-16 border-none focus:ring-1 focus:ring-blue-500 bg-transparent"
          />
        </div>
        <div>
          HR: <input
            type="text"
            value={formData.vitalSigns?.heartRate || ''}
            onChange={handleInputChange('vitalSigns', 'heartRate')}
            className="w-16 border-none focus:ring-1 focus:ring-blue-500 bg-transparent"
          />
        </div>
        <div>
          BP: <input
            type="text"
            value={formData.vitalSigns?.bloodPressure || ''}
            onChange={handleInputChange('vitalSigns', 'bloodPressure')}
            className="w-16 border-none focus:ring-1 focus:ring-blue-500 bg-transparent"
          />
        </div>
        <div>
          RR: <input
            type="text"
            value={formData.vitalSigns?.respiratoryRate || ''}
            onChange={handleInputChange('vitalSigns', 'respiratoryRate')}
            className="w-16 border-none focus:ring-1 focus:ring-blue-500 bg-transparent"
          />
        </div>
        <div className='print:text-[9px]'>
          O2: <input
            type="text"
            value={formData.vitalSigns?.oxygenSaturation || ''}
            onChange={handleInputChange('vitalSigns', 'oxygenSaturation')}
            className="w-auto border-none focus:ring-1 focus:ring-blue-500 bg-transparent"
          />
        </div>
      </div>
    </div>
  </div>

  {/* Rest of the code remains the same... */}
          
          {/* Labs Section */}
<div className="border p-3 rounded print:p-0.5 print:text-[9px] print:overflow-hidden">
  <h2 className="mb-3 text-gray-700 text-base font-bold px-1 print:text-[9px] print:mb-0.5">LABS</h2>
  <div className="flex flex-col space-y-3 print:space-y-0.5">
    <div className='flex flex-row justify-between'>
      <div className="lab-diagram w-7/12">
        <svg viewBox="0 0 200 75" className="w-full h-auto mr-0">
          <g className="text-sm print:text-[9px]">
            <path d="M80 50 L140 50" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M50 30 L80 50 L50 70" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M170 30 L140 50 L170 70" stroke="currentColor" strokeWidth="1" fill="none" />
            <foreignObject x="10" y="40" width="40" height="30">
              <input
                type="text"
                value={formData.labs?.wbc || ''}
                onChange={handleInputChange('labs', 'wbc')}
                className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-sm print:text-[9px]"
                placeholder="WBC"
              />
            </foreignObject>
            <foreignObject x="90" y="25" width="40" height="30">
              <input
                type="text"
                value={formData.labs?.hgb || ''}
                onChange={handleInputChange('labs', 'hgb')}
                className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-center text-sm print:text-[9px]"
                placeholder="HGB"
              />
            </foreignObject>
            <foreignObject x="90" y="55" width="40" height="30">
              <input
                type="text"
                value={formData.labs?.hct || ''}
                onChange={handleInputChange('labs', 'hct')}
                className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-center text-sm print:text-[9px]"
                placeholder="HCT"
              />
            </foreignObject>
            <foreignObject x="160" y="40" width="40" height="30">
              <input
                type="text"
                value={formData.labs?.plt || ''}
                onChange={handleInputChange('labs', 'plt')}
                className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-sm print:text-[9px]"
                placeholder="PLT"
              />
            </foreignObject>
          </g>
        </svg>
      </div>
      <div className='w-5/12 flex items-center justify-center'>
        <svg viewBox="0 0 125 125" className="w-full h-auto max-w-[80px]">
          <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="2" />
          <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="2" />
          <foreignObject x="40" y="0" width="40" height="30">
            <input
              type="text"
              value={formData.labs?.tbil || ''}
              onChange={handleInputChange('labs', 'tbil')}
              className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-sm print:text-[11px]"
              placeholder="TBIL"
            />
          </foreignObject>
          <foreignObject x="40" y="75" width="40" height="30">
            <input
              type="text"
              value={formData.labs?.alkP || ''}
              onChange={handleInputChange('labs', 'alkP')}
              className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-sm print:text-[11px]"
              placeholder="ALK-P"
            />
          </foreignObject>
          <foreignObject x="10" y="35" width="40" height="30">
            <input
              type="text"
              value={formData.labs?.ast || ''}
              onChange={handleInputChange('labs', 'ast')}
              className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-sm print:text-[11px]"
              placeholder="AST"
            />
          </foreignObject>
          <foreignObject x="70" y="35" width="40" height="30">
            <input
              type="text"
              value={formData.labs?.alt || ''}
              onChange={handleInputChange('labs', 'alt')}
              className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-sm print:text-[11px]"
              placeholder="ALT"
            />
          </foreignObject>
        </svg>
      </div>
    </div>
    <div className='w-full'>
      <svg viewBox="0 0 500 100" className="w-full h-auto">
        <g className="text-md print:text-[11px]">
          <path d="M20 50 L300 50" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M100 20 L100 80" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M200 20 L200 80" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M300 50 L350 20 M300 50 L350 80" stroke="currentColor" strokeWidth="2" fill="none" />
          <foreignObject x="30" y="20" width="40" height="30">
            <input
              type="text"
              value={formData.labs?.na || ''}
              onChange={handleInputChange('labs', 'na')}
              className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-center text-lg print:text-[14px]"
              placeholder="Na"
            />
          </foreignObject>
          <foreignObject x="30" y="55" width="40" height="30">
            <input
              type="text"
              value={formData.labs?.k || ''}
              onChange={handleInputChange('labs', 'k')}
              className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-center text-lg print:text-[14px]"
              placeholder="K"
            />
          </foreignObject>
          <foreignObject x="130" y="20" width="40" height="30">
            <input
              type="text"
              value={formData.labs?.cl || ''}
              onChange={handleInputChange('labs', 'cl')}
              className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-center text-lg print:text-[14px]"
              placeholder="Cl"
            />
          </foreignObject>
          <foreignObject x="130" y="55" width="40" height="30">
            <input
              type="text"
              value={formData.labs?.co2 || ''}
              onChange={handleInputChange('labs', 'co2')}
              className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-center text-lg print:text-[14px]"
              placeholder="CO2"
            />
          </foreignObject>
          <foreignObject x="230" y="20" width="40" height="30">
            <input
              type="text"
              value={formData.labs?.bun || ''}
              onChange={handleInputChange('labs', 'bun')}
              className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-center text-lg print:text-[14px]"
              placeholder="BUN"
            />
          </foreignObject>
          <foreignObject x="330" y="35" width="40" height="30">
            <input
              type="text"
              value={formData.labs?.gluc || ''}
              onChange={handleInputChange('labs', 'gluc')}
              className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-lg print:text-[14px]"
              placeholder="Gluc"
            />
          </foreignObject>
          <foreignObject x="240" y="55" width="40" height="30">
            <input
              type="text"
              value={formData.labs?.creat || ''}
              onChange={handleInputChange('labs', 'creat')}
              className="w-full h-full border-none focus:ring-1 focus:ring-blue-500 bg-transparent text-lg print:text-[14px]"
              placeholder="Creat"
            />
          </foreignObject>
        </g>
      </svg>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-md print:grid-cols-5 print:text-[9px]">
  <div className='font-medium flex items-center space-x-1'>
    <span>PT/INR</span>
    <input
      type="text"
      value={formData.labs?.ptInr || ''}
      onChange={handleInputChange('labs', 'ptInr')}
      className="w-12 border-none focus:ring-1 focus:ring-blue-500 bg-transparent print:text-[12px]"
      placeholder="___"
    />
    </div>
    <div className='font-medium flex items-center space-x-1'>
    <span>PTT</span>
    <input
      type="text"
      value={formData.labs?.ptt || ''}
      onChange={handleInputChange('labs', 'ptt')}
      className="w-12 border-none focus:ring-1 focus:ring-blue-500 bg-transparent print:text-[12px]"
      placeholder="___"
    />
  </div>
  <div className='font-medium flex items-center space-x-1'>
    <span>Ca+</span>
    <input
      type="text"
      value={formData.labs?.ca || ''}
      onChange={handleInputChange('labs', 'ca')}
      className="w-12 border-none focus:ring-1 focus:ring-blue-500 bg-transparent print:text-[12px]"
      placeholder="___"
    />
  </div>
  <div className='font-medium flex items-center space-x-1'>
    <span>Mg+</span>
    <input
      type="text"
      value={formData.labs?.mg || ''}
      onChange={handleInputChange('labs', 'mg')}
      className="w-12 border-none focus:ring-1 focus:ring-blue-500 bg-transparent print:text-[12px]"
      placeholder="___"
    />
  </div>
  <div className='font-medium flex items-center space-x-1'>
    <span>Phos</span>
    <input
      type="text"
      value={formData.labs?.phos || ''}
      onChange={handleInputChange('labs', 'phos')}
      className="w-12 border-none focus:ring-1 focus:ring-blue-500 bg-transparent print:text-[12px]"
      placeholder="___"
    />
  </div>
</div>
  </div>
</div>
</div>



        {/* History and Blood Sugar Section */}
<div className="grid grid-cols-4 gap-6 mb-6 print:gap-1 print:mt-0 print:mb-1 print:text-[9px] print:h-[0.66in]">
  <div className="col-span-3 border rounded pt-2 pb-2 pl-2 print:pt-0.5 print:pb-0.5 print:pl-0.5 print:h-[0.66in] print:overflow-hidden">
    <label className="block text-gray-700 text-base font-bold mb-1 print:text-[9px] print:-mb-1">
      History
    </label>
    <textarea
      value={formData.history || ''}
      onChange={handleInputChange('history')}
      className="w-full h-14 text-gray-700 text-base print:text-[10px] border-none focus:ring-1 focus:ring-blue-500 resize-none bg-transparent print:leading-tight print:h-[0.6in]"
      placeholder="Enter patient history"
    />
  </div>
  <div className="border rounded p-2 print:p-0.5 print:h-[0.66in] print:overflow-hidden">
    <label className="block text-gray-700 text-base font-bold mb-1 print:text-[9px] print:mb-0.5">
      Blood Sugar
    </label>
    <div className="grid grid-cols-2 gap-1 print:gap-0.5 h-14 overflow-auto print:-mt-2 print:h-[0.6in]">
      {(formData.bloodSugar || ['']).map((value, index) => (
       <input
  key={index}
  type="text"
  value={value}
  onChange={(e) => {
    const newValues = [...(formData.bloodSugar || [])];
    newValues[index] = e.target.value;
    setFormData(prev => ({
      ...prev,
      bloodSugar: newValues
    }));
  }}
  className="border rounded py-0.5 px-1 text-gray-700 text-sm 
    print:text-[9px] 
    print:placeholder:text-[8px] 
    print:p-0 
    print:h-4 
    print:min-h-0 
    focus:ring-1 focus:ring-blue-500"
  placeholder="Enter value"
/>
      ))}
      {/* Add button for new blood sugar entry */}
      <button
        onClick={() => {
          setFormData(prev => ({
            ...prev,
            bloodSugar: [...(prev.bloodSugar || []), '']
          }));
        }}
        className="col-span-2 text-blue-500 hover:text-blue-700 text-sm mt-1 print:hidden"
      >
        + Add Reading
      </button>
    </div>
  </div>
</div>


        {/* System Status Section */}
        <div className="grid grid-cols-2 gap-6 mb-6 print:gap-1 print:mb-1 print:text-[9px] print:h-[3in]">
        <div className="border border-grey-300 rounded print:overflow-hidden">
  {[
    { key: 'neurological', label: 'Neuro', fields: ['mentalStatus', 'cranialNerves', 'motorFunction', 'sensoryFunction', 'reflexes'] },
    { key: 'cardiovascular', label: 'Cardiovascular', fields: ['heartSounds', 'pulses', 'neckExam', 'edema'] },
    { key: 'respiratory', label: 'Respiratory', fields: ['breathSounds', 'respiratoryEffort', 'chestMovement'] },
    { key: 'gastrointestinalGenitourinary', label: 'GI/GU', fields: ['abdominalExam', 'bowelSounds', 'urinaryOutput'] },
    { key: 'skin', label: 'Skin', fields: ['color', 'turgor', 'lesions', 'wounds'] }
  ].map(({ key, label, fields }) => {
    // Format physical exam data into text only if there's actual data
    const physicalExamData = data?.systemStatus?.[key as keyof typeof data.systemStatus]?.physicalExam;
    const hasPhysicalExamData = Object.values(physicalExamData || {}).some(value => value !== undefined && value !== '');
    
    // Format the text for display
    const formattedText = hasPhysicalExamData ? fields
      .map(field => {
        const value = physicalExamData?.[field as keyof typeof physicalExamData];
        return value ? `${field}: ${value}` : null;
      })
      .filter(Boolean)
      .join('\n') : '';

    // Update both the details and the physical exam data
    const systemStatus = formData.systemStatus?.[key as keyof typeof formData.systemStatus];
    const hasBeenEdited = systemStatus?.physicalExam !== undefined;
    const textareaValue = hasBeenEdited
      ? Object.entries(systemStatus.physicalExam || {})
          .map(([field, value]) => value ? `${field}: ${value}` : null)
          .filter(Boolean)
          .join('\n')
      : formattedText;

    return (
      <div key={key} className="border border-grey-300 pl-3 pb-3 h-28 flex flex-col print:mb-0.5 print:pt-0.5 print:pl-0.5 print:pb-0.5 print:h-[0.6in] print:overflow-hidden print:flex print:flex-col">
        <label className="block text-gray-700 text-base font-bold print:text-[9px] print:mb-0 print:pb-0 print:leading-tight">
          {label}
        </label>
        <div className="text-gray-700 text-xs overflow-y-auto flex-grow print:text-[7px] print:mt-0 print:pt-0 print:flex-grow print:overflow-hidden">
          <textarea
            value={textareaValue || ''}
            onClick={() => {
              if (!hasBeenEdited && hasPhysicalExamData) {
                if (!formData.systemStatus) {
                  setFormData(prev => ({
                    ...prev,
                    systemStatus: {
                      [key]: { details: formattedText }
                    }
                  }));
                } else if (!formData.systemStatus[key as keyof typeof formData.systemStatus]) {
                  setFormData(prev => ({
                    ...prev,
                    systemStatus: {
                      ...prev.systemStatus,
                      [key]: { details: formattedText }
                    }
                  }));
                }
              }
            }}
            onChange={handleInputChange('systemStatus', key, 'details')}
            className="w-full h-full resize-none text-xs p-1 border-none focus:ring-1 focus:ring-blue-500 print:text-[7px] print:leading-tight"
            placeholder={`Enter ${label.toLowerCase()} notes here...`}
          />
        </div>
      </div>
    );
  })}
</div>
{/* Care Info Section */}
<div className="border rounded print:overflow-hidden">
  {[
    { key: 'ivFluids', label: 'IV/Fluids', field: 'status', fields: ['status', 'details', 'access'] },
    { key: 'dietFeeding', label: 'Diet/Feeding', field: 'type', fields: ['type', 'restrictions', 'assistanceNeeded'] },
    { key: 'activity', label: 'Activity/Vitals', field: 'level', fields: ['level', 'restrictions', 'assistiveDevices'] },
    { key: 'vte', label: 'VTE', field: 'notes', fields: ['prophylaxis', 'contraindications', 'notes'] },
    { key: 'medications', label: 'Meds/PRN', field: 'current', fields: ['current', 'prn', 'recentChanges', 'administrationNotes'] }
  ].map(({ key, label, field, fields }) => {
    // Format care info data into text only if there's actual data
    const careInfoData = data?.careInfo?.[key as keyof typeof data.careInfo];
    const hasCareInfoData = Object.values(careInfoData || {}).some(value => value !== undefined && value !== '');
    
    const formattedText = hasCareInfoData ? fields
      .map(field => {
        const value = careInfoData?.[field as keyof typeof careInfoData];
        return value ? `${field}: ${value}` : null;
      })
      .filter(Boolean)
      .join('\n') : '';

    // Check if the textarea has been interacted with
    // @ts-expect-error - Accessing dynamic property
    const hasBeenEdited = formData.careInfo?.[key as keyof typeof formData.careInfo]?.[field] !== undefined;
    const textareaValue = hasBeenEdited
      // @ts-expect-error - Accessing dynamic property
      ? formData.careInfo?.[key as keyof typeof formData.careInfo]?.[field]
      : formattedText;

    return (
      <div
        key={key}
        className="border border-gray-300 pl-3 pb-3 h-28 flex flex-col print:mb-0.5 print:pt-0.5 print:pl-0.5 print:pb-0.5 print:h-[0.6in] print:overflow-hidden print:flex print:flex-col"
      >
        <label className="block text-gray-700 text-base font-bold print:text-[9px] print:mb-0 print:pb-0 print:leading-tight">
          {label}
        </label>
        <div className="text-gray-700 text-xs overflow-y-auto flex-grow print:text-[7px] print:mt-0 print:pt-0 print:flex-grow print:overflow-hidden">
          <textarea
            value={textareaValue || ''}
            onClick={() => {
              if (!hasBeenEdited && hasCareInfoData) {
                if (!formData.careInfo) {
                  setFormData(prev => ({
                    ...prev,
                    careInfo: {
                      [key]: { [field]: formattedText }
                    }
                  }));
                } else if (!formData.careInfo[key as keyof typeof formData.careInfo]) {
                  setFormData(prev => ({
                    ...prev,
                    careInfo: {
                      ...prev.careInfo,
                      [key]: { [field]: formattedText }
                    }
                  }));
                }
              }
            }}
            onChange={handleInputChange('careInfo', key, field)}
            className="w-full h-full resize-none text-xs p-1 border-none focus:ring-1 focus:ring-blue-500 print:text-[7px] print:leading-tight"
            placeholder={`Enter ${label.toLowerCase()} notes here...`}
          />
        </div>
      </div>
    );
  })}
</div>

        </div>

{/* Notes and Imaging Section */}
<div className="grid grid-cols-4 gap-6 mb-6 print:gap-1 print:mb-1 print:text-[9px] print:h-[1.5in]">
<div className="border rounded p-3 print:p-0.5 print:overflow-hidden print:col-span-1 print:h-full">
  <label className="block text-gray-700 text-base font-bold mb-3 print:text-[9px] print:mb-0.5">
    NOTES:
  </label>
  {(() => {
    // Check if there's existing notes data
    const hasNotesData = data?.notes !== undefined && data.notes !== '';
    
    // Check if the textarea has been edited
    const hasBeenEdited = formData.notes !== undefined;
    const textareaValue = hasBeenEdited ? formData.notes : (hasNotesData ? data.notes : '');

    return (
      <textarea
        value={textareaValue || ''}
        onClick={() => {
          if (!hasBeenEdited && hasNotesData) {
            setFormData(prev => ({
              ...prev,
              notes: data.notes
            }));
          }
        }}
        onChange={handleInputChange('notes')}
        className="w-full h-24 text-gray-700 border-none focus:ring-1 focus:ring-blue-500 resize-none bg-transparent text-sm print:h-[1.2in] print:leading-tight print:text-[9px]"
        placeholder="Enter notes"
      />
    );
  })()}
</div>
{[
    { 
      key: 'xrayUltrasound', 
      label: 'XRAY/US:', 
      fields: ['findings', 'notes']
    },
    { 
      key: 'ctScan', 
      label: 'CT SCAN:', 
      fields: ['findings', 'notes']
    },
    { 
      key: 'mri', 
      label: 'MRI:', 
      fields: ['findings', 'notes']
    }
  ].map(({ key, label, fields }) => {
    // Get imaging data and format it
    const imagingData = data?.imaging?.[key as keyof typeof data.imaging];
    const hasImagingData = Object.values(imagingData || {}).some(value => 
      value !== undefined && value !== '');
    
    const formattedText = hasImagingData ? fields
      .map(field => {
        const value = imagingData?.[field as keyof typeof imagingData];
        return value ? `${field}: ${value}` : null;
      })
      .filter(Boolean)
      .join('\n') : '';

    // Check if either findings or notes have been edited
    const hasBeenEdited = formData.imaging?.[key as keyof typeof formData.imaging]?.findings !== undefined || 
                         formData.imaging?.[key as keyof typeof formData.imaging]?.notes !== undefined;
    
    // Get the value from either findings or notes, prioritizing findings
    const textareaValue = hasBeenEdited
      ? formData.imaging?.[key as keyof typeof formData.imaging]?.findings || 
        formData.imaging?.[key as keyof typeof formData.imaging]?.notes
      : formattedText;

    return (
      <div key={key} className="border rounded p-3 print:p-0.5 print:overflow-hidden print:h-full">
        <label className="block text-gray-700 text-base font-bold mb-3 print:text-[9px] print:mb-0.5">
          {label}
        </label>
        <div className="text-gray-700 text-sm overflow-auto print:text-[9px] print:leading-tight">
          <textarea
            value={textareaValue || ''}
            onClick={() => {
              if (!hasBeenEdited && hasImagingData) {
                if (!formData.imaging) {
                  setFormData(prev => ({
                    ...prev,
                    imaging: {
                      [key]: { 
                        findings: imagingData?.findings || '',
                        notes: imagingData?.notes || ''
                      }
                    }
                  }));
                } else if (!formData.imaging[key as keyof typeof formData.imaging]) {
                  setFormData(prev => ({
                    ...prev,
                    imaging: {
                      ...prev.imaging,
                      [key]: {
                        findings: imagingData?.findings || '',
                        notes: imagingData?.notes || ''
                      }
                    }
                  }));
                }
              }
            }}
            
            onChange={handleInputChange('imaging', key, 'findings')}
            className="w-full h-24 resize-none text-xs p-1 border-none focus:ring-1 focus:ring-blue-500 print:leading-tight print:text-[11px]"
            placeholder={`Enter ${label.toLowerCase()} notes here...`}
          />
        </div>
      </div>
    );
  })}
</div>

     {/* Plan and To Do List Section */}
<div className="grid grid-cols-2 gap-6 mb-6 print:gap-1 print:mb-1 print:text-[9px] print:h-[2.0in]">
  {/* PLAN Section */}
  <div className="border rounded p-3 print:p-0.5 print:overflow-hidden print:pt-0">
    <label className="block text-gray-700 text-base font-bold mb-3 print:text-[9px] print:mb-0 print:mt-0 print:leading-none">
      PLAN:
    </label>
    <div className="flex flex-col space-y-1 h-28 text-gray-700 overflow-auto print:h-auto print:-space-y-1 text-sm print:text-[9px] print:mt-0.5">
      
      {/* Immediate Actions */}
      <div className="print:mb-0 print:break-inside-avoid">
        <strong>Immediate Actions:</strong>
        <ul className="print:mt-0">
          {((data?.plan?.immediateActions?.length ? data.plan.immediateActions : ['']) || ['']).map((action, index) => (
            <li key={index} className="flex items-center print:mb-0 print:leading-tight">
              <input
                type="text"
                value={formData?.plan?.immediateActions?.[index] ?? action}
                onChange={(e) => {
                  const newActions = [...(formData?.plan?.immediateActions || data?.plan?.immediateActions || [''])];
                  newActions[index] = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    plan: {
                      ...prev.plan,
                      immediateActions: newActions.filter(item => item !== '')
                    }
                  }));
                }}
                className="flex-1 border-none focus:ring-1 focus:ring-blue-500 bg-transparent leading-tight"
                placeholder="Enter action"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Pending Tests */}
      <div className="print:mb-0.5 print:break-inside-avoid">
        <strong>Pending Tests:</strong>
        <ul className="print:mt-0">
          {((data?.plan?.pendingTests?.length ? data.plan.pendingTests : ['']) || ['']).map((test, index) => (
            <li key={index} className="flex items-center print:leading-tight">
              <input
                type="text"
                value={formData?.plan?.pendingTests?.[index] ?? test}
                onChange={(e) => {
                  const newTests = [...(formData?.plan?.pendingTests || data?.plan?.pendingTests || [''])];
                  newTests[index] = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    plan: {
                      ...prev.plan,
                      pendingTests: newTests.filter(item => item !== '')
                    }
                  }));
                }}
                className="flex-1 border-none focus:ring-1 focus:ring-blue-500 bg-transparent leading-tight"
                placeholder="Enter test"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Medication Changes */}
<div className="print:mb-0.5 print:break-inside-avoid">
  <strong>Medication Changes:</strong>
  <textarea
    value={formData?.plan?.medicationChanges ?? data?.plan?.medicationChanges ?? ''}
    onChange={(e) => {
      setFormData(prev => ({
        ...prev,
        plan: {
          ...prev.plan,
          medicationChanges: e.target.value
        }
      }));
    }}
    className="w-full border-none focus:ring-1 focus:ring-blue-500 resize-none bg-transparent print:mt-0 print:leading-tight print:h-auto print:min-h-0"
    placeholder="Enter medication changes"
  />
</div>

      {/* Consultations */}
      <div className="print:mb-0.5 print:break-inside-avoid">
        <strong>Consultations:</strong>
        <ul className="print:mt-0">
          {((data?.plan?.consultations?.length ? data.plan.consultations : ['']) || ['']).map((consultation, index) => (
            <li key={index} className="flex items-center print:leading-tight print:mb-0">
              <input
                type="text"
                value={formData?.plan?.consultations?.[index] ?? consultation}
                onChange={(e) => {
                  const newConsultations = [...(formData?.plan?.consultations || data?.plan?.consultations || [''])];
                  newConsultations[index] = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    plan: {
                      ...prev.plan,
                      consultations: newConsultations.filter(item => item !== '')
                    }
                  }));
                }}
                className="flex-1 border-none focus:ring-1 focus:ring-blue-500 bg-transparent leading-tight"
                placeholder="Enter consultation"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Monitoring Instructions */}
      <div className="print:mb-0 print:break-inside-avoid">
        <strong>Monitoring Instructions:</strong>
        <textarea
          value={formData?.plan?.monitoringInstructions ?? data?.plan?.monitoringInstructions ?? ''}
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              plan: {
                ...prev.plan,
                monitoringInstructions: e.target.value
              }
            }));
          }}
          className="w-full border-none focus:ring-1 focus:ring-blue-500 resize-none bg-transparent print:mt-0 print:leading-tight"
          placeholder="Enter monitoring instructions"
        />
      </div>
    </div>
  </div>

  <div className="border rounded p-3 print:p-0.5 print:overflow-hidden print:pt-0">
  <label className="block text-gray-700 text-base font-bold mb-3 print:text-[9px] print:mb-0 print:mt-0 print:leading-none">
    TO DO LIST:
  </label>
  <div className="flex flex-col space-y-1 h-28 text-gray-700 overflow-auto print:h-auto print:-space-y-1 text-sm print:text-[9px] print:mt-0.5">
    {/* High Priority Tasks */}
    <div className="print:mb-0 print:break-inside-avoid">
      <strong>High Priority:</strong>
      <ul className="print:mt-0">
        {((data?.toDoList?.highPriority?.length ? data.toDoList.highPriority : [{ task: '', dueTime: '' }]) || [{ task: '', dueTime: '' }]).map((item, index) => (
          <li key={index} className="flex items-center print:leading-tight print:mb-0">
            <input
              type="text"
              value={formData?.toDoList?.highPriority?.[index]?.task ?? item.task}
              onChange={(e) => {
                const newHighPriority = [...(formData?.toDoList?.highPriority || data?.toDoList?.highPriority || [])];
                newHighPriority[index] = { ...newHighPriority[index], task: e.target.value };
                setFormData(prev => ({
                  ...prev,
                  toDoList: {
                    ...prev.toDoList,
                    highPriority: newHighPriority.filter(item => item.task !== '' || item.dueTime !== '')
                  }
                }));
              }}
              className="flex-1 border-none focus:ring-1 focus:ring-blue-500 bg-transparent leading-tight"
              placeholder="Enter task"
            />
            <input
              type="text"
              value={formData?.toDoList?.highPriority?.[index]?.dueTime ?? item.dueTime ?? ''}
              onChange={(e) => {
                const newHighPriority = [...(formData?.toDoList?.highPriority || data?.toDoList?.highPriority || [])];
                newHighPriority[index] = { ...newHighPriority[index], dueTime: e.target.value };
                setFormData(prev => ({
                  ...prev,
                  toDoList: {
                    ...prev.toDoList,
                    highPriority: newHighPriority.filter(item => item.task !== '' || item.dueTime !== '')
                  }
                }));
              }}
              className="w-24 ml-2 border-none focus:ring-1 focus:ring-blue-500 bg-transparent"
              placeholder="Due time"
            />
          </li>
        ))}
      </ul>
    </div>

    {/* Routine Tasks */}
    <div className="print:mb-0 print:break-inside-avoid">
      <strong>Routine:</strong>
      <ul className="print:mt-0">
        {((data?.toDoList?.routine?.length ? data.toDoList.routine : ['']) || ['']).map((task, index) => (
          <li key={index} className="flex items-center print:leading-tight print:mb-0">
            <input
              type="text"
              value={formData?.toDoList?.routine?.[index] ?? task}
              onChange={(e) => {
                const newRoutine = [...(formData?.toDoList?.routine || data?.toDoList?.routine || [''])];
                newRoutine[index] = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  toDoList: {
                    ...prev.toDoList,
                    routine: newRoutine.filter(item => item !== '')
                  }
                }));
              }}
              className="flex-1 border-none focus:ring-1 focus:ring-blue-500 bg-transparent leading-tight"
              placeholder="Enter routine task"
            />
          </li>
        ))}
      </ul>
    </div>

    {/* Before End of Shift Tasks */}
    <div className="print:mb-0 print:break-inside-avoid">
      <strong>Before End of Shift:</strong>
      <ul className="print:mt-0">
        {((data?.toDoList?.beforeEndOfShift?.length ? data.toDoList.beforeEndOfShift : ['']) || ['']).map((task, index) => (
          <li key={index} className="flex items-center print:leading-tight print:mb-0">
            <input
              type="text"
              value={formData?.toDoList?.beforeEndOfShift?.[index] ?? task}
              onChange={(e) => {
                const newBeforeEndOfShift = [...(formData?.toDoList?.beforeEndOfShift || data?.toDoList?.beforeEndOfShift || [''])];
                newBeforeEndOfShift[index] = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  toDoList: {
                    ...prev.toDoList,
                    beforeEndOfShift: newBeforeEndOfShift.filter(item => item !== '')
                  }
                }));
              }}
              className="flex-1 border-none focus:ring-1 focus:ring-blue-500 bg-transparent leading-tight"
              placeholder="Enter end of shift task"
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
  </div>


        {/* Commented out TELE DOWNGRADE CRITERIA section */}
        {/* <div className="border rounded p-3 mb-4 print:p-0.5 print:mb-1 print:text-[9px]">
          <label className="block text-gray-700 text-base font-bold mb-3 print:text-[9px] print:mb-0.5">TELE DOWNGRADE CRITERIA:</label>
          <div className="grid grid-cols-2 gap-3 print:gap-0.5">
            {[
              "Stable resp./Off BiPAP/CPAP",
              "Stable cardiac monitor rhythm w/ normalizing HR",
              "Improving lactate",
              "Fever trending down",
              "K>3 or <6; Mg >1.5; Na>120",
              "Hgb >7 & no evidence of ongoing GI Bleed",
              "Cr at baseline or trending down",
              "Down trending troponin"
            ].map((criterion) => (
              <div key={criterion} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={data?.teleDowngradeCriteria?.[criterion as keyof typeof data.teleDowngradeCriteria] ?? false} 
                  readOnly 
                  className="mr-3 print:mr-0.5" 
                />
                <label className="text-base print:text-[9px]">{criterion}</label>
              </div>
            ))}
          </div>
        </div> */}
        
      </div>
    </div>
  );
};

export default NurseForm1;