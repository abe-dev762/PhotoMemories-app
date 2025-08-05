import React from 'react'
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import type { OutputFileEntry } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import type { FileEntry } from '@/types';



interface IFileUploader {
    fileEntry: FileEntry;
    onChange: (fileEntry: FileEntry) => void;
}

const FileUploader: React.FunctionComponent<IFileUploader> = ({ fileEntry, onChange }) => {
    const [uploadedFile, setUploadedFile] = React.useState<OutputFileEntry[]>([]);

    return (
    <div>
        <FileUploaderRegular
         sourceList="local, camera, facebook, gdrive"
         classNameUploader="uc-dark"
         pubkey="dab42af79c63891d51e5"
         />
    </div>
  );
};

export default FileUploader;