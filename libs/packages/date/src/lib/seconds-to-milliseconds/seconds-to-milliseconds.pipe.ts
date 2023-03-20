import { Pipe, PipeTransform } from '@angular/core';
import { secToMs } from '../milliseconds';

@Pipe({
  name: 'ngPatSecondsToMilliseconds',
  standalone: true
})
export class SecondsToMillisecondsPipe implements PipeTransform {
  transform(value: number | null | undefined): number {
    return value !== null && value !== undefined ? secToMs(value) : 0;
  }
}
