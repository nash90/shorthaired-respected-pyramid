'use client';

import SantaLetterForm from "./SantaLetterForm";

interface PageProps {
  title?: string
}

const LetterToSantaPage: React.FC<PageProps> = (props) => {
  return (
    <div className="container mt-4"> {/* Use the Bootstrap container class */}
      <div className="row justify-content-center"> {/* Center content */}
        <div className="col-md-8"> {/* Define column width for medium-sized screens */}
          <div className="p-3"> {/* Apply padding */}
            <h3 className="mb-4">A Letter to Santa</h3> {/* Apply margin-bottom */}
            <SantaLetterForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterToSantaPage;
