import React from 'react';

interface NurseFormProps4 {
    dx?: string;
    pmh?: string;
    neuro?: string;
    cardio?: string;
    respiratory?: string;
    giGu?: string;
    skinWound?: string;
    vitals?: {
      temperature?: string;
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
  }

const NurseForm4: React.FC<{data?: NurseFormProps4}> = ({ data }) => {
  return (
    <div className="w-full max-w-[8.5in] mx-auto p-3 text-xs sm:text-sm border-2 border-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Top row */}
        <div className="border border-black p-1.5">
          <div className="font-bold">Dx</div>
          <div>{data?.dx || ''}</div>
        </div>
        <div className="border border-black p-1.5">
          <div className="font-bold">PMH</div>
          <div>{data?.pmh || ''}</div>
        </div>

        {/* Neuro and Cards row */}
        <div className="border border-black p-1.5">
          <div className="font-bold">Neuro AOX 3 2 1 Confused Forgetful</div>
          <div>{data?.neuro || ''}</div>
        </div>
        <div className="border border-black p-1.5">
          <div className="font-bold">Cards SR ST SB AF FL EF____ Venodynes</div>
          <div>{data?.cardio || ''}</div>
        </div>

        {/* Resp and GI row */}
        <div className="border border-black p-1.5">
          <div className="font-bold">Resp ____LPM NC RA</div>
          <div>{data?.respiratory || ''}</div>
        </div>
        <div className="border border-black p-1.5">
          <div className="font-bold">GI Incont Guiac</div>
          <div>{data?.giGu || ''}</div>
        </div>

        {/* GU and Skin/Wound row */}
        <div className="border border-black p-1.5">
          <div className="font-bold">GU Foley Voiding Incont</div>
          <div>{data?.giGu || ''}</div>
        </div>
        <div className="border border-black p-1.5">
          <div className="font-bold">Skin/Wound</div>
          <div>{data?.skinWound || ''}</div>
        </div>

        {/* Routine and Labs row */}
        <div className="border border-black p-1.5">
          <div className="font-bold">Routine VS q4° Daily Wgt Strict I/O</div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div>T {data?.vitals?.temperature || ''}</div>
            <div>BP {data?.vitals?.bp || ''}</div>
            <div>HR {data?.vitals?.hr || ''}</div>
            <div>O₂ {data?.vitals?.o2 || ''}</div>
            <div>R {data?.vitals?.respiratoryRate || ''}</div>
            <div>LS {data?.vitals?.ls || ''}</div>
          </div>
        </div>
        <div className="border border-black p-1.5 relative">
          <div className="font-bold">Labs</div>
          <div className="absolute bottom-1 right-1 text-xs">
            <div>BNP {data?.labs?.bnp || '___  '}</div>
            <div>CK {data?.labs?.ck || '___'}</div>
            <div>Trop {data?.labs?.trop || '___'}</div>
          </div>
          
          <div className='flex flex-row'>
            <div className="lab-diagram w-8/12 h-24">
              <svg viewBox="0 0 200 100" width="100%" height="100%">
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
            <div className='pt-6'>
              <svg viewBox="0 0 100 100" width="50" height="50">
                <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="2" />
                <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="2" />
                <text className='' x="40" y="15" textAnchor="start"> {data?.labs?.tbil ?? ''}</text>
                <text className='' x="40" y="90" textAnchor="start"> {data?.labs?.alkP ?? ''}</text>
                <text className='' x="10" y="50" textAnchor="start"> {data?.labs?.ast ?? ''}</text>
                <text className='' x="70" y="50" textAnchor="start"> {data?.labs?.alt ?? ''}</text>
              </svg>
            </div>
          </div>

          <div className='mb-2'>
            <svg viewBox="0 0 500 100" className="w-3/4 ml-6 mt-2">
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
          <div className="text-xs">
            PT/INR {data?.labs?.ptInr || '___'} PTT {data?.labs?.ptt || '___'}
          </div>
        </div>

        {/* Meds and Cath/EP Lab row */}
        <div className="border border-black p-1.5">
          <div className="font-bold">Meds</div>
          <div className="text-xs mt-1">{data?.meds || ''}</div>
          <div className="font-bold mt-2">FS</div>
          <div className="text-xs">{data?.fs || ''}</div>
        </div>
        <div className="border border-black p-1.5 relative">
          <div className="font-bold">Cath/EP Lab</div>
          <div className="mt-1">
            <div>Fent {data?.cathEpLab?.fent || ''}</div>
            <div>Versed {data?.cathEpLab?.versed || ''}</div>
            <div>Cont {data?.cathEpLab?.cont || ''}</div>
            <div>IVF {data?.cathEpLab?.ivf || ''}</div>
          </div>
          <div className="absolute bottom-1 right-1">
            <div className="font-bold">IV</div>
            <div>SL gtts</div>
          </div>
        </div>

        {/* Plans row */}
        <div className="border border-black p-1.5 sm:col-span-2 relative">
          <div className="font-bold mb-1">Plans</div>
          <div className="flex justify-between">
            <div className="w-1/2">
              {data?.plans || ''}
            </div>
            <div className="w-1/2">
              <div className="font-bold">Call MD</div>
              <div className="grid grid-cols-2 gap-x-2 text-xs">
                <div>HR &lt;{data?.callMD?.hrLow || ''}</div>
                <div>&gt;{data?.callMD?.hrHigh || ''}</div>
                <div>SBP&lt;{data?.callMD?.sbpLow || ''}</div>
                <div>&gt;{data?.callMD?.sbpHigh || ''}</div>
                <div>DBP&gt;{data?.callMD?.dbpHigh || ''}</div>
                <div>T&gt;{data?.callMD?.tHigh || ''}</div>
                <div>RR &lt;{data?.callMD?.rrLow || ''}</div>
                <div>&gt;{data?.callMD?.rrHigh || ''}</div>
                <div>O₂ &lt;{data?.callMD?.o2Low || ''}</div>
                <div>PTT&gt;{data?.callMD?.pttHigh || ''}</div>
                <div className="col-span-2">RA Fall</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity, Precaution, Diet row */}
        <div className="border border-black p-1.5">
          <div className="font-bold">Activity</div>
          <div className="text-xs">{data?.activity || ''}</div>
        </div>
        <div className="border border-black p-1.5">
          <div className="font-bold">Precaution</div>
          <div className="text-xs">{data?.precaution || ''}</div>
        </div>
        <div className="border border-black p-1.5 sm:col-span-2">
          <div className="font-bold">Diet</div>
          <div className="text-xs">{data?.diet || ''}</div>
        </div>

        {/* Name & Age, Code, Allergy, MD row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="border border-black p-1.5">
            <div className="font-bold">Name & Age</div>
            <div>{data?.nameAge || ''}</div>
          </div>
          <div className="border border-black p-1.5">
            <div className="font-bold">Code</div>
            <div className="text-xs">{data?.code || ''}</div>
          </div>
          <div className="border border-black p-1.5">
            <div className="font-bold">Allergy NKDA</div>
            <div>{data?.allergy || ''}</div>
          </div>
          <div className="border border-black p-1.5">
            <div className="font-bold">MD</div>
            <div>{data?.md || ''}</div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="sm:col-span-2 border-t border-black pt-1.5">
          <div className="flex justify-between text-xs">
            <div>LC# {data?.lc || ''}</div>
            <div>DX {data?.dx || ''}</div>
            <div>Rm {data?.rm || ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseForm4;