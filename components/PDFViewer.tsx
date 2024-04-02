import React from 'react';

type Props = {
  pdf_url: string;
};

const PDFViewer = ({ pdf_url }: Props) => {
  return (
    <div className="w-full h-full">
      <embed src={pdf_url} type="application/pdf" className="w-full h-full" />
    </div>
  );
};

export default PDFViewer;
