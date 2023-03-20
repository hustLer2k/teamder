import { useRef, useState } from "react";
import { AiOutlineCloudUpload, AiOutlineFilePdf } from "react-icons/ai";
import "./DropInput.css";

const DropFile = ({ onFileChange }: { onFileChange: (file: File) => void }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [file, setFile] = useState<null | File>(null);

    const onDragEnter = () => wrapperRef.current?.classList.add("dragover");
    const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");
    const onDrop = () => wrapperRef.current?.classList.remove("dragover");

    const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (newFile && newFile.type === "application/pdf") {
            setFile(newFile);
            onFileChange(newFile);
        }
    };

    const fileRemove = () => setFile(null);

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <AiOutlineCloudUpload size={128} />
                    <p>Drop your pdf file here</p>
                </div>
                <input
                    type="file"
                    value=""
                    onChange={onFileDrop}
                    accept="application/pdf"
                />
            </div>
            {file && (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">Ready to upload</p>
                    <div className="drop-file-preview__item">
                        <AiOutlineFilePdf size={48} />
                        <div className="drop-file-preview__item__info">
                            <p>{file.name}</p>
                            <p>{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <span
                            className="drop-file-preview__item__del"
                            onClick={fileRemove}
                        >
                            x
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default DropFile;
