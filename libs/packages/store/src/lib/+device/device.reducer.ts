import {Action, createReducer, on} from '@ngrx/store';
import * as DeviceActions from './device.actions';
import {NgPatDeviceState} from './device.model';
import {ICPU, IDevice, IEngine, IOS, IResult} from 'ua-parser-js';

export const ngPatDeviceFeatureKey = 'ngPatDeviceFeatureKey';

export const ngPatInitialDeviceState: NgPatDeviceState = {
  isLoaded: false,
  device: <IResult>{
    ua: '',
    browser: {
      name: undefined,
      version: undefined,
      major: undefined
    },
    device: <IDevice>{
      model: undefined,

      /*  console, mobile, tablet, smarttv, wearable, embedded */
      type: undefined,

      /* Acer, Alcatel, Amazon, Apple, Archos, Asus, BenQ, BlackBerry, Dell, GeeksPhone, Google, HP, HTC, Huawei, Jolla, Lenovo, LG, Meizu, Microsoft, Motorola, Nexian, Nintendo, Nokia, Nvidia, Ouya, Palm, Panasonic, Polytron, RIM, Samsung, Sharp, Siemens, Sony-Ericsson, Sprint, Xbox, ZTE*/
      vendor: undefined
    },

    engine: <IEngine>{
      /* Amaya, EdgeHTML, Gecko, iCab, KHTML, Links, Lynx, NetFront, NetSurf, Presto, Tasman, Trident, w3m, WebKit */
      name: undefined,

      version: undefined
    },

    os: <IOS>{
      /* AIX, Amiga OS, Android, Arch, Bada, BeOS, BlackBerry, CentOS, Chromium OS, Contiki, Fedora, Firefox OS, FreeBSD, Debian, DragonFly, Gentoo, GNU, Haiku, Hurd, iOS, Joli, Linpus, Linux, Mac OS, Mageia, Mandriva, MeeGo, Minix, Mint, Morph OS, NetBSD, Nintendo, OpenBSD, OpenVMS, OS/2, Palm, PCLinuxOS, Plan9, Playstation, QNX, RedHat, RIM Tablet OS, RISC OS, Sailfish, Series40, Slackware, Solaris, SUSE, Symbian, Tizen, Ubuntu, UNIX, VectorLinux, WebOS, Windows [Phone/Mobile], Zenwalk*/
      name: undefined,

      version: undefined
    },

    cpu: <ICPU>{
      /* 68k, amd64, arm, arm64, avr, ia32, ia64, irix, irix64, mips, mips64, pa-risc, ppc, sparc, sparc64 */
      architecture: undefined
    }
  }
};

export const ngPatDeviceReducer = createReducer(
  ngPatInitialDeviceState,

  on(DeviceActions.ngPatLoadDevices, (state, action) => {
    return {
      ...state,
      device: {
        ...action.device
      },
      isLoaded: true
    };
  })
);
