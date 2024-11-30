export default function Terms() {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-teal-700 mb-8">Terms of Use</h1>
        
        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-teal-600">1. Educational Purpose</h2>
            <p>This application is designed exclusively for educational and training purposes. It provides a platform for healthcare professionals to practice SBAR (Situation, Background, Assessment, Recommendation) communication techniques using simulated scenarios.</p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold text-teal-600">2. No Protected Health Information (PHI)</h2>
            <p>By using this application, you agree NOT to input or record any:</p>
            <ul className="list-disc pl-6">
              <li>Patient names, initials, or identifiers</li>
              <li>Dates of birth or ages</li>
              <li>Room numbers or facility locations</li>
              <li>Medical record numbers</li>
              <li>Any other protected health information</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold text-teal-600">3. Training Tool Disclaimer</h2>
            <p>Users acknowledge that this tool:</p>
            <ul className="list-disc pl-6">
              <li>Is not a replacement for official medical documentation systems</li>
              <li>Should not be used for actual patient care documentation</li>
              <li>Is intended for practice and educational purposes only</li>
              <li>Does not store or process protected health information</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold text-teal-600">4. User Responsibilities</h2>
            <p>Users are responsible for:</p>
            <ul className="list-disc pl-6">
              <li>Using only simulated or fictional scenarios</li>
              <li>Maintaining patient privacy and confidentiality</li>
              <li>Complying with their organization&apos;s policies</li>
              <li>Using appropriate professional judgment</li>
            </ul>
          </section>
        </div>
      </div>
    )
  }