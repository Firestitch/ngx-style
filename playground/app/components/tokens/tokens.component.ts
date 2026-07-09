import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { readTokens } from '../../demo';


interface TokenRow {
  name: string;
  value: string;
  unused: boolean;
}

/**
 * Variables the library publishes but never uses itself. They exist so a consuming app can build
 * on the palette; adding one of these to your Sass will not make anything change on its own.
 */
const PALETTE_ONLY = new Set([
  '$grey-dark-color',
  '$grey-light-color',
  '$warn-color',
  '$success-color',
  '$info-color',
  '$disabled-color',
  '$dark-danger-color',
  '$dark-warn-color',
  '$dark-success-color',
  '$dark-info-color',
  '$h1-color',
  '$h2-color',
  '$h3-color',
  '$large-font-size',
  '$xlarge-font-size',
  '$xxlarge-font-size',
]);

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TokensComponent implements OnInit {

  public colors: TokenRow[] = [];
  public sizes: TokenRow[] = [];
  public breakpoints: TokenRow[] = [];

  public ngOnInit(): void {
    const rows = readTokens(document, '--fs-token-').map(({ name, value }) => {
      const variable = `$${name.replace('--fs-token-', '')}`;

      return { name: variable, value, unused: PALETTE_ONLY.has(variable) };
    });

    this.colors = rows.filter((row) => row.name.endsWith('-color'));
    this.breakpoints = rows.filter((row) => row.name.startsWith('$break-'));
    this.sizes = rows.filter((row) => !this.colors.includes(row) && !this.breakpoints.includes(row));
  }
}
