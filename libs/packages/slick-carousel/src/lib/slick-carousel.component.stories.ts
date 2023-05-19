import { Meta } from '@storybook/angular';
import { SlickCarouselComponent } from './slick-carousel.component';

export default {
  title: 'libs/shared/ui-design-library/ngpat-slick-examples-carousel',
  component: SlickCarouselComponent
} as Meta<SlickCarouselComponent>;

export const canvas = {
  render: (args: SlickCarouselComponent) => ({
    props: args
  }),
  args: {
    primary: false,
    backgroundColor: '#ff00ff',
    size: 'medium',
    label: 'Button'
  }
};
