import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import {
  colorBorder,
  getDefaultPaletteSelector,
  getPaletteByColorConfig,
  paletteRefs
} from './color';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ColorConfig, PaletteRef} from './color-palettes';

@Component({
  selector: 'ng-pat-color-picker',
  templateUrl: './ng-pat-color-picker.component.html',
  styleUrls: ['./ng-pat-color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'ng-pat-color-picker'
  }
})
export class NgPatColorPickerComponent implements OnInit, OnDestroy {
  private _onDestroy$: Subject<boolean> = new Subject();
  private selectedColor$: BehaviorSubject<string>;

  paletteColors: ColorConfig[] = paletteRefs[0].colors;
  selectedPalette: ColorConfig = paletteRefs[0].colors[5];
  paletteBackgrounds: PaletteRef[] = paletteRefs;

  @Input()
  set color(color: ColorConfig | undefined) {
    if (color) {
      this.paletteColors = getPaletteByColorConfig(color).colors;
      this.selectedPalette = color;
      this.selectedColor$.next(colorBorder(color));
    }
  }

  @Input() hideCloseBtn = false;

  /**
   * Emit close event upon color selection.
   */
  @Input() closeOnSelection = false;

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  change: EventEmitter<ColorConfig> = new EventEmitter<ColorConfig>();

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.selectedColor$ = new BehaviorSubject('');
  }

  ngOnInit() {
    this.selectedColor$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((panelBorderClass: string) => {
        // if (this.overlayRef) {
        //   this.overlayRef.removePanelClass(this._previousBorderColor);
        //   this.overlayRef.addPanelClass(panelBorderClass);
        //   this._previousBorderColor = panelBorderClass;
        // }
      });
  }

  selectColor(event: MouseEvent, color: ColorConfig) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedPalette = color;
    this.change.emit(color);

    if (this.closeOnSelection) {
      this.close.emit(true);
    }
  }

  selectPalette(event: MouseEvent, palette: PaletteRef) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.paletteColors = palette.colors;
    this.selectedPalette = getDefaultPaletteSelector(palette);
    this.change.emit(getDefaultPaletteSelector(palette));
  }

  onClose(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.close.emit(true);
    this._onDestroy$.next(true);
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(true);
  }
}
