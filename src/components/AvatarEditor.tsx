import styles from "./AvatarEditor.module.css";
import userPageStyles from "../routes/UserPage.module.css";
import { TbPhotoEdit } from "react-icons/tb";
import defaultAvatar from "../assets/avatar.svg";
import { useRef, useState, forwardRef } from "react";
import getExtension from "../lib/get_extension";

const AvatarEditor = forwardRef(function (
    {
        avatarUrl,
        onAvatarChange,
        onError,
    }: {
        avatarUrl: string | null | undefined;
        onAvatarChange: (avatar: File) => void;
        onError: (error: string) => void;
    },
    imgRef: React.Ref<HTMLImageElement>
) {
    const [avatar, setAvatar] = useState(avatarUrl || defaultAvatar);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const fileChangeHandler = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const extension = getExtension(file.name);
        if (![".png", ".jpg", ".jpeg", ".svg"].includes(extension)) {
            onError(`Filetype not supported: ${extension}`);
            return;
        } else if (file.size > 8 * 1024 * 1024) {
            onError("Filesize must not exceed 8MB");
            return;
        } else {
            onError("");
        }

        let avatarURI = URL.createObjectURL(file);
        setAvatar(avatarURI);
        onAvatarChange(file);
    };

    return (
        <>
            <button
                className={styles.photo_edit}
                onClick={() => fileInputRef.current?.click()}
            >
                <TbPhotoEdit size={24} />
                Edit
            </button>
            <img
                className={userPageStyles["avatar"]}
                src={avatar}
                ref={imgRef}
                alt="User Avatar"
            />

            <input
                type="file"
                hidden
                onChange={fileChangeHandler}
                ref={fileInputRef}
                accept="image/png"
            />
        </>
    );
});

export default AvatarEditor;
