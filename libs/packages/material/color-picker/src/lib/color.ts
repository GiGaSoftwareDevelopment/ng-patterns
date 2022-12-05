import {
  ColorConfig,
  defaultPaletteRef,
  PALETTE,
  paletteKeys,
  paletteNameClasses,
  PaletteRef
} from './color-palettes';
import {titleCase} from '@uiux/fn';

function setDefaultColor(entity: {color: ColorConfig}): {color: ColorConfig} {
  if (!entity.color) {
    entity.color = getGlobalDefaultPaletteSelector();
  }
  return entity;
}

function setDefaultColorMany(
  entities: {color: ColorConfig}[]
): {color: ColorConfig}[] {
  return entities.map((entitiy: {color: ColorConfig}) =>
    setDefaultColor(entitiy)
  );
}

export const paletteRefs: PaletteRef[] = paletteNameClasses.reduce(
  (acc: PaletteRef[], paletteClass: PALETTE) => {
    const palette: PaletteRef = {
      paletteClass: `${paletteClass}-background-500`,
      paletteRef: paletteClass,
      colors: paletteKeys.reduce((colors: ColorConfig[], color: string) => {
        colors.push(createPaletteSelector(paletteClass, color));
        return colors;
      }, [])
    };

    acc.push(palette);

    return acc;
  },
  []
);

export function createPaletteSelector(
  paletteClass: PALETTE,
  color: string
): ColorConfig {
  return <ColorConfig>{
    paletteName: titleCase(paletteClass.replace('mat-', '').replace('-', ' ')),
    paletteRef: paletteClass,
    paletteColor: color
  };
}

function createColorSelector(
  color: ColorConfig | undefined,
  name: string
): string {
  if (color && name) {
    return `${color.paletteRef}-${name}-${color.paletteColor}`;
  } else {
    return '';
  }
}

export function colorBackground(color: ColorConfig | undefined): string {
  return createColorSelector(color, 'background');
}

export function colorIconText(color: ColorConfig | undefined): string {
  return createColorSelector(color, 'icon-text');
}

export function colorD3Path(color: ColorConfig | undefined): string {
  return createColorSelector(color, 'd3-path');
}

export function colorConversation(color: ColorConfig | undefined): string {
  return createColorSelector(color, 'conversation');
}

export function colorFormFieldInput(color: ColorConfig | undefined): string {
  return createColorSelector(color, 'form-field-input');
}

export function colorBorder(color: ColorConfig | undefined): string {
  return createColorSelector(color, 'border');
}

export function colorRaisedButtonPrimary(
  color: ColorConfig | undefined
): string {
  return createColorSelector(color, 'raised-button-primary');
}

export function colorStrokedButtonPrimary(
  color: ColorConfig | undefined
): string {
  return createColorSelector(color, 'stroked-button-primary');
}

export function getPaletteByColorConfig(
  color: ColorConfig | undefined
): PaletteRef {
  if (color) {
    return paletteRefs.reduce((acc: PaletteRef, palette: PaletteRef) => {
      if (
        acc.paletteRef.length === 0 &&
        palette.paletteRef === color.paletteRef
      ) {
        return palette;
      }
      return acc;
    }, defaultPaletteRef);
  }

  return defaultPaletteRef;
}

export function getDefaultPaletteSelector(paletteRef: PaletteRef): ColorConfig {
  return paletteRef.colors[5]; // 500
}

export function createDefaultPaletteSelector(paletteKey: PALETTE): ColorConfig {
  return createPaletteSelector(paletteKey, '500');
}

export function getGlobalDefaultPaletteSelector(): ColorConfig {
  return createDefaultPaletteSelector(PALETTE.MAT_LIGHT_BLUE);
}

export function getColorIcon(color: ColorConfig): string {
  if (color) {
    return colorIconText(color);
  } else {
    return colorIconText(getGlobalDefaultPaletteSelector());
  }
}
