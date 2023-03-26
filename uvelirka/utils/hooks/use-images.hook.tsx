import { IImage } from '../../models/image.model';
import { useRequestedState } from './use-requested-state.hook';

export const useImages = () => {
  const {
    state, setState
  } = useRequestedState<IImage[]>({
    initialState: [],
    requestPath: 'image'
  });

  return { images: state, setImages: setState };
};