import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { FsInspectDirective } from './inspect.directive';


/**
 * Provided by `<fs-demo>`, injected by every `[fsInspect]` beneath it. Going through DI rather
 * than `@ContentChildren` lets an inspected element live inside another component's view
 * (`<fs-variant>`) and still be picked up by the demo that contains it.
 */
@Injectable()
export class DemoRegistryService {

  public readonly changes$ = new Subject<void>();
  public readonly items: FsInspectDirective[] = [];

  public register(directive: FsInspectDirective): void {
    this.items.push(directive);
    this.changes$.next();
  }

  public unregister(directive: FsInspectDirective): void {
    const index = this.items.indexOf(directive);

    if (index !== -1) {
      this.items.splice(index, 1);
      this.changes$.next();
    }
  }

  /** An inspected element changed its attributes; whatever we rendered about it is now stale. */
  public touch(): void {
    this.changes$.next();
  }
}
