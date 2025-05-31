import { ToastData } from "components/ToastLayer";
import { create } from "zustand";

interface CommonState {
  isLoading: boolean;
  toastList: ToastData[];
  setLoading: (payload: boolean) => void;
  addToast: (payload: ToastData) => void;
  closeToast: (payload: number) => void;
}

export const useCommon = create<CommonState>((set, get) => ({
  isLoading: false,
  toastList: [],
  setLoading: payload =>
    set(() => ({
      isLoading: payload
    })),
  addToast: (payload: ToastData) => {
    set(() => ({
      toastList: [...get().toastList, payload]
    }));
  },
  closeToast: (payload: number) => {
    set(() => ({
      toastList: get().toastList.map((toast, i) =>
        i === payload ? { ...toast, show: false } : toast
      )
    }));
  }
}));
