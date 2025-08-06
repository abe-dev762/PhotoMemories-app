import React, { useEffect, useState } from "react";
import type { FileEntry } from "@/types";
import {
  FileUploaderRegular,
  type OutputFileEntry,
  type OutputCollectionState,
} from "@uploadcare/react-uploader";

interface FileUploaderProps {
  fileEntry: FileEntry;
  onChange: (entry: FileEntry) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ fileEntry, onChange }) => {
  const [previews, setPreviews] = useState<string[]>([]);

  // Update previews whenever fileEntry changes
  useEffect(() => {
    const urls = fileEntry.files
      .map((f) => f.cdnUrl || f.externalUrl || "")
      .filter(Boolean);
    setPreviews(urls);
  }, [fileEntry.files]);

  // Correct callback signature
  const handleFileChange = (
    state: OutputCollectionState<unknown, unknown>
  ) => {
    const uploadedFiles: OutputFileEntry[] = state.successEntries || [];

    const mappedFiles = uploadedFiles.map((file) => ({
      ...file,
      cdnUrl: file.cdnUrl || file.externalUrl || "",
      uuid: file.uuid || crypto.randomUUID(),
    }));

    onChange({ files: mappedFiles });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <FileUploaderRegular
        sourceList="local, camera, facebook, gdrive"
        classNameUploader="uc-dark"
        pubkey="dab42af79c63891d51e5"
        multiple
        confirmUpload={false}
        removeCopyright
        onChange={handleFileChange} // ✅ Fixed type
      />

      {/* Preview thumbnails */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {previews.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`preview-${idx}`}
              className="w-20 h-20 object-cover rounded-md border"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
