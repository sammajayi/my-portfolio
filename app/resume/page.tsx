import { Download01Icon, FileAttachmentIcon } from "hugeicons-react";

export const metadata = {
  title: "Resume",
  description: "Samuel Ajayi's Professional Resume / CV.",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl mb-4">
          Resume
        </h1>
        <p className="text-base text-muted mb-8 leading-7">
          View or download my professional resume detailing my engineering experience, product leadership, and technical accomplishments.
        </p>

        <div className="rounded-lg border border-alabaster-grey bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-ghost-white rounded-lg text-bright-marine">
              <FileAttachmentIcon size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Samuel_Ajayi_CV.pdf</h2>
              <p className="text-xs text-muted mt-1">
                Blockchain Developer & Product Manager Resume
              </p>
            </div>
          </div>
          <a
            href="/Samuel_Ajayi_CV.pdf"
            download
            className="inline-flex items-center gap-2 rounded bg-bright-marine px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black w-full sm:w-auto justify-center"
          >
            <Download01Icon size={16} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
}
