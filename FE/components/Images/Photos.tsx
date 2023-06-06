import React, { useEffect } from "react";
// import { baseApiUrl } from '../../constants';
import { useDropzone } from "react-dropzone";
import {
  addUploadedFile,
  removeUploadedFile,
  uploadDoneAction,
} from "../../redux/images";
// import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from "react-redux";
import { uploadPhotosAction } from "../../redux/images/actions";
import { uploadFinish } from "../../redux/images/selectors";
import { setActivePageAction } from "../../redux/layouts";

const Photos: React.FC<any> = ({ uploadedFiles, photos }) => {
  const dispatch = useDispatch();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const uploadFinishStatus = useSelector(uploadFinish);
  const removeFile = (file: File) => {
    dispatch(removeUploadedFile(file));
  };

  useEffect(() => {
    acceptedFiles.forEach((file: File) => {
      dispatch(addUploadedFile(file));
    });
  }, [uploadedFiles]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      if (acceptedFiles.length) {
        acceptedFiles.forEach((file: any) => {
          formData.append("photos[]", file);
        });
        dispatch(uploadPhotosAction(formData));
      }
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (uploadFinishStatus) {
      dispatch(
        setActivePageAction({
          type: "images",
          modifier: "list",
        })
      );
      dispatch(uploadDoneAction(null));
    }
  }, [uploadFinishStatus]);

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Files Upload</h2>
      <section className="drop-zone-container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag and drop image file(s), or browse your computer.</p>
        </div>
        {(uploadedFiles.length > 0 || photos.length > 0) && (
          <aside>
            <h4>Uploaded Files</h4>
            <ul>
              {uploadedFiles.map((_file: File) => (
                <li key={_file.lastModified}>
                  <img
                    src={URL.createObjectURL(_file)}
                    alt=""
                    className="object-cover h-[85px]"
                  />
                  <span>{_file.name}</span> <em>{_file.size} bytes</em>{" "}
                  <i
                    className="close"
                    role="presentation"
                    onClick={() => {
                      removeFile(_file);
                    }}
                  />
                </li>
              ))}
            </ul>
          </aside>
        )}
      </section>
    </>
  );
};

export default Photos;
