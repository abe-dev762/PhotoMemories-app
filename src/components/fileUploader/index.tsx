import React, { useEffect, useState } from "react";
import type { FileEntry } from "@/types";
import {
  FileUploaderRegular,
  type OutputFileEntry,
  type OutputCollectionState,
  type OutputCollectionStatus,
} from "@uploadcare/react-uploader";
import '@uploadcare/react-uploader/core.css'

interface FileUploaderProps {
  fileEntry: FileEntry;
  onChange: (entry: FileEntry) => void;
  preview: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ fileEntry, onChange, preview }) => {
  const [previews, setPreviews] = useState<string[]>([]);

  function isSuccessEntry(file: OutputFileEntry): file is Extract<OutputFileEntry, { status: "success" }> {
  return file.status === "success";
};


  useEffect(() => {
    const urls = fileEntry.files
      .map((f) => f.cdnUrl || f.externalUrl || "")
      .filter(Boolean);
    setPreviews(urls);
  }, [fileEntry.files]);

  const handleFileChange = (
  state: OutputCollectionState<OutputCollectionStatus, "maybe-has-group">) => {
  const uploadedFiles = state.successEntries.filter(isSuccessEntry);

    onChange({
    files: uploadedFiles.map((file) => ({
      ...file,
      cdnUrl: file.cdnUrl || file.externalUrl || "",
      uuid: file.uuid || crypto.randomUUID(),
      })),
    });
  };


  return (
    <div className="flex flex-col items-center gap-4">
      <FileUploaderRegular
        sourceList="local, camera, facebook, gdrive"
        classNameUploader="uc-dark"
        pubkey="dab42af79c63891d51e5"
        multiple={preview}
        confirmUpload={false}
        removeCopyright
        onChange={handleFileChange}
      />

      
      {preview ? <div className="flex flex-wrap gap-2 mt-4">
          {previews.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`preview-${idx}`}
              className="w-30 h-30 object-cover rounded-md border"
            />
          ))}
        </div> : <></>}
    </div>
  );
};

export default FileUploader;
