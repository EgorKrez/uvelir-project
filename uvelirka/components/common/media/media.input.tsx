import { useMemo, useRef } from 'react';
import { IPropsWithClassname } from '../../../models/common.model';
import image from '../../../public/image.webp';
import { isFileImage, isFileVideo } from '../../../utils/media.utils';
import styles from './media.module.scss';

interface IMediaInputProps extends IPropsWithClassname {
  file?: File;
  setFile: (file: File) => void;
  placeholderUrl?: string;
}

export const MediaInput = ({ file, setFile, placeholderUrl, className }: IMediaInputProps) => {
  const placeholder = placeholderUrl || image.src;

  const url = useMemo(
    () => file ? URL.createObjectURL(file) : placeholder,
    [file, placeholder],
  );

  const input = useRef<HTMLInputElement>({} as HTMLInputElement);

  const onFileSelect = () => {
    const newFile = input.current.files?.[0];

    if (newFile) {
      setFile(newFile);
    }
  };

  const openDialogSelect = () => {
    input.current.click();
  };

  return <div className={className}>
    <input ref={input}
           className={styles.media__input}
           onChange={onFileSelect}
           type="file"/>
    {isFileImage(file) && <img onClick={openDialogSelect}
                               className={styles.media__media}
                               src={url}
                               alt="Image"/>}
    {isFileVideo(file) && <video onClick={openDialogSelect}
                                 className={styles.media__media}
                                 controls={true}>
      <source src={url}/>
    </video>}

    {!file && <img onClick={openDialogSelect}
                   className={styles.media__media}
                   src={url}
                   alt="Image"/>}
  </div>;
};