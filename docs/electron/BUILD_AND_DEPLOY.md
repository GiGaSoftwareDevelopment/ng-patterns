# Deploying electron builds

Start with the pc build as that will require the most dependencies and adjustments if any. Once the pc
build is finished and uploaded, proceed to the mac builds. The mac builds can run at the same time
on both macs.

# Update Build

1. Open `spout-studio-version.json`
2. Update the electron params -- Year, Month, Electron Version, Electron Major Version, Build Number

#PC

1. `yarn ci`
2. `bash scripts/package.electron.prod.pc.sh`
3. Open Advanced Installer
4. Open spout-msi.aip
5. Open `spout-studio-version.json`
6. In the Product Details section, based on the electon node of `spout-studio-version.json`, update Version to YYYY.MM.[Build Number]
7. In the Package Information section, based on the electon node of `spout-studio-version.json`, update Version to YYYY.MM.[Electron Major Version].[Build Number]
8. Save the Advanced Install Project
9. Build
10. Uninstall Spout from PC
11. Install new msi build
12. Test it runs.
13. Upload to firebase storage

#MAC M1

download and install certificates from [https://developer.apple.com/account/resources/certificates/list](https://developer.apple.com/account/resources/certificates/list)
To find code-sign for mack m1, run `security find-identity`, will return something like

1. `yarn ci`
2. `bash scripts/package.electron.prod.mac.m1.sh` or for dev `bash scripts/package.electron.dev.mac.m1.sh`
3. Install version on mac
4. Test it runs
5. Upload build dmg to firebase storage.

#MAC INTEL

1. `yarn ci`
2. `bash scripts/package.electron.dev.mac.intel.sh` or `bash scripts/package.electron.prod.mac.intel.sh`
3. Install version on mac
4. Test it runs
5. Upload build dmg to firebase storage.
