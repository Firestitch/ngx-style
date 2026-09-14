import { DOCUMENT } from '@angular/common';
import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';


export type FsColorSchemeType = 'light' | 'dark' | 'system';
export type FsResolvedColorScheme = 'light' | 'dark';

/**
 * The `color-scheme` value written for each setting. "system" is `light dark`:
 * NOT a third appearance, but both offered to the browser so it resolves the one
 * the operating system asks for.
 */
const COLOR_SCHEME_VALUES: Record<FsColorSchemeType, string> = {
  light: 'light',
  dark: 'dark',
  system: 'light dark',
};

const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * The one switch behind every light/dark decision in every @firestitch package.
 *
 * WHY THIS IS ONE PROPERTY AND NOT A THEME CLASS. Packages express their two
 * appearances with `light-dark()` in CSS, which picks off the `color-scheme`
 * property. Setting it once on <html> re-paints every package at once -- chips,
 * fields, dividers, menus -- with no class to agree on, no component to notify
 * and no stylesheet to reload. Anything that reads the --fs-* tokens follows
 * automatically, including components compiled into other packages.
 *
 * DECLARED, NOT DETECTED. `prefers-color-scheme` reports the DEVICE, and an app
 * whose user chose Light on a dark phone would otherwise fight its own setting.
 * So the media query is read for exactly one purpose -- reporting what "system"
 * currently resolves to, via `resolvedColorScheme` -- and never to decide the
 * setting itself. Choosing is the caller's job; this only applies the choice.
 *
 * NOTHING IS PERSISTED. The setting lives for the lifetime of the service, so a
 * reload starts from the default. An app that wants the choice remembered stores
 * it wherever it keeps its other preferences and calls `set()` on startup --
 * which keeps this free of any opinion about storage, and keeps a package from
 * writing to a key the application did not choose.
 */
@Injectable({ providedIn: 'root' })
export class FsColorScheme implements OnDestroy {

  private _document = inject(DOCUMENT);

  private _colorScheme = signal<FsColorSchemeType>('system');
  private _systemDark = signal<boolean>(false);

  private _mediaQuery: MediaQueryList;
  private _mediaQueryListener: (event: MediaQueryListEvent) => void;

  constructor() {
    this._watchSystem();
  }

  /**
   * What was asked for -- 'light', 'dark' or 'system'. For what "system" is
   * currently showing, read `resolved()`.
   */
  public get colorScheme() {
    return this._colorScheme.asReadonly();
  }

  /**
   * The appearance actually on screen, with 'system' resolved to what the
   * operating system asks for. Tracks the OS live while set to 'system', so a
   * caller rendering an icon or a label for the current appearance stays right
   * without polling.
   *
   * A computed rather than a method so it can be handed to a template or an
   * effect on its own -- `resolved` passed as a bare reference keeps working,
   * where an unbound method would lose `this`.
   */
  public resolved = computed<FsResolvedColorScheme>(() => {
    const colorScheme = this._colorScheme();

    if (colorScheme === 'system') {
      return this._systemDark() ? 'dark' : 'light';
    }

    return colorScheme;
  });

  public set(colorScheme: FsColorSchemeType): void {
    this._colorScheme.set(colorScheme);
    this._apply();
  }

  public light(): void {
    this.set('light');
  }

  public dark(): void {
    this.set('dark');
  }

  public system(): void {
    this.set('system');
  }

  /**
   * Flips between light and dark. From 'system' it moves to whichever appearance
   * is NOT showing, so the control always does what it says rather than landing
   * on the appearance already on screen.
   */
  public toggle(): void {
    this.set(this.resolved() === 'dark' ? 'light' : 'dark');
  }

  public ngOnDestroy(): void {
    this._unwatchSystem();
  }

  /**
   * Writes the property <html> rather than <body>: `color-scheme` also tells the
   * browser what to paint the canvas, the scrollbars and the form controls it
   * renders itself, and those follow the root element.
   */
  private _apply(): void {
    const element = this._document?.documentElement;

    if (!element) {
      return;
    }

    element.style.setProperty('color-scheme', COLOR_SCHEME_VALUES[this._colorScheme()]);
  }

  /**
   * Kept current at all times, not only while set to 'system', so that switching
   * to 'system' reports the right appearance immediately instead of waiting for
   * the OS to next change.
   *
   * Guarded because matchMedia is absent when rendering on the server, where
   * there is no device to ask.
   */
  private _watchSystem(): void {
    const view = this._document?.defaultView;

    if (!view?.matchMedia) {
      return;
    }

    this._mediaQuery = view.matchMedia(DARK_QUERY);
    this._systemDark.set(this._mediaQuery.matches);

    this._mediaQueryListener = (event: MediaQueryListEvent) => {
      this._systemDark.set(event.matches);
    };

    this._mediaQuery.addEventListener('change', this._mediaQueryListener);
  }

  private _unwatchSystem(): void {
    if (this._mediaQuery && this._mediaQueryListener) {
      this._mediaQuery.removeEventListener('change', this._mediaQueryListener);
      this._mediaQuery = null;
      this._mediaQueryListener = null;
    }
  }

}
