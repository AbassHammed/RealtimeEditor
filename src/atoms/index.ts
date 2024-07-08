import { atom } from 'recoil';

type AuthModalState = {
  isOpen: boolean;
  type: 'create';
};

const initialAuthModalState: AuthModalState = {
  isOpen: false,
  type: 'create',
};

export const authModalState = atom<AuthModalState>({
  key: 'authModalState',
  default: initialAuthModalState,
});
