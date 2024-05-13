import { InjectionToken, FactoryProvider } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('WindowToken');

export function windowFactory(): Window {
  return window;
}

export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
};