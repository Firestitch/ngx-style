import { NgModule, ModuleWithProviders } from '@angular/core';


@NgModule({

})
export class FsStyleModule {
  static forRoot(): ModuleWithProviders<FsStyleModule> {
    return {
      ngModule: FsStyleModule
    };
  }
}
