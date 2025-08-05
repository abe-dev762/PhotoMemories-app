import React from 'react'
import { useEffect, useRef } from 'react';
import { FileUploaderRegular, UploadCtxProvider } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import type { OutputFileEntry } from '@uploadcare/react-uploader';
import type { FileEntry } from '@/types';



interface IFileUploader {
    fileEntry: FileEntry;
    onChange: (fileEntry: FileEntry) => void;
}

const FileUploader: React.FunctionComponent<IFileUploader> = ({ fileEntry, onChange }) => {
    const [uploadedFile, setUploadedFile] = React.useState<OutputFileEntry[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handleUploadEvent = (e: Event) => {
      const customEvent = e as CustomEvent<OutputFileEntry[]>;
        if (customEvent.detail) {
          console.log("The upload file event is: ", e);
          setUploadedFile([...customEvent.detail]);
        }
      };
       const el = inputRef.current;
       if (el) {
       el.addEventListener("data-output", handleUploadEvent);
       return () => el.removeEventListener("data-output", handleUploadEvent);
        }
      }, [setUploadedFile]);

      useEffect(() => {
        const resetUploaderState = () => {
          const customInput = inputRef.current as HTMLInputElement & {
            uploadCollection?: {
              clearAll: () => void;
            }
          };
          customInput.uploadCollection?.clearAll();
        };

        const handleDoneFlow = () => {
          resetUploaderState();
            
          onChange({ files: [...uploadedFile]});
          setUploadedFile([]);
        }

        
        const el = inputRef.current;
        if (el) {
          el.addEventListener("done-flow", handleDoneFlow);
          return () => el.removeEventListener("done-flow", handleDoneFlow);
        }
      }, [fileEntry, onChange, uploadedFile]);


    return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-white'>
        <FileUploaderRegular
         sourceList="local, camera, facebook, gdrive"
         classNameUploader="uc-dark"
         pubkey="dab42af79c63891d51e5"
         multiple
         confirmUpload={false}
         removeCopyright={true}
         />
         <input 
         ref={inputRef}
         type='hidden'
         role='uploadcare-uploader'
         data-multiple/>
    </div>
  );
};

export default FileUploader;