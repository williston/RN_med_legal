import React from 'react';
import '../app/styles/nurseForm3.css';

interface NurseFormProps3 {
  room?: string;
  name?: string;
  age?: string;
  gender?: 'M' | 'F';
  diagnosis?: string;
  history?: string;
  code?: string;
  allergies?: string;
  iso?: string;
  mdConsult?: string;
  neuro?: {
    status?: string;
    details?: string;
    physicalExam?: string;
  };
  cardio?: {
    status?: string;
    details?: string;
    physicalExam?: string;
  };
  respiratory?: {
    status?: string;
    details?: string;
    physicalExam?: string;
  };
  giGu?: {
    status?: string;
    details?: string;
    physicalExam?: string;
  };
  endocrine?: string;
  skinMobility?: string;
  labs?: {
    bnp?: string;
    ck?: string;
    trop?: string;
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
  };
  imagingRadiology?: string;
  linesTubes?: string[];
  notesPlan?: string;
}

const NurseForm3: React.FC<{data?: NurseFormProps3}> = ({ data = {} }) => {
  return (
    <div className='bg-gray-100 min-h-screen py-4 sm:py-8 print:bg-white print:py-0'>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg print:shadow-none print:max-w-none print:w-full print:p-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 print:grid-cols-3 print:gap-3 print:mb-3">
          <div className="border p-4 rounded col-span-1 print:p-3 print:text-base">
            <div className="space-y-2 print:space-y-2">
              <div>ROOM: {data.room || ' '}</div>
              <div>NAME: {data.name || ' '}</div>
              <div>AGE: {data.age || ' '}</div>
              <div>M/F: {data.gender || ' '}</div>
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 space-y-2 print:space-y-2 print:text-base">
            <div>DIAGNOSIS: {data.diagnosis || ' '}</div>
            <div className="mt-4 print:mt-2">HISTORY: {data.history || ' '}</div>
            <div className="mt-auto">
              <div>CODE: {data.code || ' '}</div>
              <div>ALLERGIES: {data.allergies || ' '}</div>
              <div>ISO: {data.iso || ' '}</div>
              <div>MD/CONSULT: {data.mdConsult || ' '}</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3 print:text-sm">
        {[
  { name: 'NEURO', icon: '🧠', value: data.neuro },
  { name: 'CARDIO', icon: '❤️', value: data.cardio },
  { name: 'RESPIRATORY', icon: '🫁', value: data.respiratory },
  { name: 'GI/GU', icon: '胃', value: data.giGu },
  { name: 'ENDOCRINE', icon: '', value: data.endocrine },
  { name: 'SKIN/MOBILITY', icon: '', value: data.skinMobility },
].map(({ name, icon, value }) => (
  <div key={name} className="border p-4 rounded h-32 print:h-auto print:p-3 flex flex-col">
    <h2 className="font-bold mb-2 bg-gray-200 px-2 print:text-base">{name}</h2>
    <div className="flex justify-center items-center h-16 text-4xl print:h-12 print:text-3xl">{icon}</div>
    {typeof value === 'object' ? (
      <div className="flex-grow overflow-auto text-xs">
        <div className="truncate"><strong>Status:</strong> {value.status || ''}</div>
        <div className="truncate"><strong>Details:</strong> {value.details || ''}</div>
        <div className="truncate"><strong>Physical Exam:</strong> {value.physicalExam || ''}</div>
      </div>
    ) : (
      <div className="flex-grow overflow-auto text-sm">{value || ' '}</div>
    )}
  </div>
))}
          
          <div className="border p-4 rounded print:p-3">
            <h2 className="font-bold mb-2 bg-gray-200 px-2 print:text-base">LABS</h2>
            <div className="flex flex-col space-y-2 print:space-y-2">
              <div className='flex flex-row justify-between'>
                <div className="lab-diagram w-7/12">
                  <svg viewBox="0 0 200 100" className="w-full h-auto mr-0">
                    <g className="text-xs">
                      <path d="M80 50 L140 50" stroke="currentColor" strokeWidth="1" fill="none" />
                      <path d="M50 30 L80 50 L50 70" stroke="currentColor" strokeWidth="1" fill="none" />
                      <path d="M170 30 L140 50 L170 70" stroke="currentColor" strokeWidth="1" fill="none" />
                      <text x="10" y="55" textAnchor="start"> {data?.labs?.wbc ?? ''}</text>
                      <text x="110" y="40" textAnchor="middle"> {data?.labs?.hgb ?? ''}</text>
                      <text x="110" y="70" textAnchor="middle"> {data?.labs?.hct ?? ''}</text>
                      <text x="160" y="55" textAnchor="start"> {data?.labs?.plt ?? ''}</text>
                    </g>
                  </svg>
                </div>
                <div className='w-5/12 flex items-center justify-center'>
                  <svg viewBox="0 0 100 100" className="w-full h-auto max-w-[80px]">
                    <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="2" />
                    <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="2" />
                    <text className='' x="40" y="15" textAnchor="start"> {data?.labs?.tbil ?? ''}</text>
                    <text className='' x="40" y="90" textAnchor="start"> {data?.labs?.alkP ?? ''}</text>
                    <text className='' x="10" y="50" textAnchor="start"> {data?.labs?.ast ?? ''}</text>
                    <text className='' x="70" y="50" textAnchor="start"> {data?.labs?.alt ?? ''}</text>
                  </svg>
                </div>
              </div>
              <div className='w-full'>
                <svg viewBox="0 0 500 100" className="w-full h-auto">
                  <g className="text-xs">
                    <path d="M20 50 L300 50" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M100 20 L100 80" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M200 20 L200 80" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M300 50 L350 20 M300 50 L350 80" stroke="currentColor" strokeWidth="2" fill="none" />
                    <text x="50" y="45" textAnchor="middle"> {data?.labs?.na ?? ''}</text>
                    <text x="50" y="70" textAnchor="middle"> {data?.labs?.k ?? ''}</text>
                    <text x="150" y="45" textAnchor="middle"> {data?.labs?.cl ?? ''}</text>
                    <text x="150" y="70" textAnchor="middle"> {data?.labs?.co2 ?? ''}</text>
                    <text x="250" y="45" textAnchor="middle">{data?.labs?.bun ?? ''}</text>
                    <text x="325" y="55" textAnchor="start">{data?.labs?.gluc ?? ''}</text>
                    <text x="230" y="75" textAnchor="start"> {data?.labs?.creat ?? ''}</text>
                  </g>
                </svg>
              </div>
              <div>
                <text x="10" y="120" fontSize="14">
                  PT/INR {data?.labs?.ptInr || '___'} PTT {data?.labs?.ptt || '___'}
                </text>
              </div>
            </div>
          </div>
          <div>
          <div className="border p-4 rounded h-32 print:h-auto print:p-3">
            <h2 className="font-bold mb-2 bg-gray-200 px-2 print:text-base">Imaging/Radiology</h2>
            <div className="h-32 print:h-16 print:text-sm">{data.imagingRadiology || ' '}</div>
          </div>
          <div className="border p-4 rounded h-32 print:h-auto print:p-3">
            <h2 className="font-bold mb-2 bg-gray-200 px-2 print:text-base">LINES/TUBES</h2>
            <ul className="list-disc list-inside pl-4 print:pl-3">
              {(data.linesTubes && data.linesTubes.length > 0) ? 
                data.linesTubes.map((item, index) => (
                  <li key={index} className="print:text-sm">{item}</li>
                ))
                : <li className="print:text-sm"></li>
              }
            </ul>
          </div>


          </div>
          
        </div>
        
        <div className="mt-6 border p-4 rounded print:mt-3 print:p-3">
          <h2 className="font-bold mb-2 bg-gray-200 px-2 print:text-base">NOTES/PLAN</h2>
          <div className="h-24 print:h-16 print:text-sm">{data.notesPlan || ' '}</div>
        </div>
      </div>
    </div>
  );
};

export default NurseForm3;