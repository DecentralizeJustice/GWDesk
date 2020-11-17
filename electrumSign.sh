#!/bin/sh

arr=( $(find public/binaries/macElectrumGW -type f -name "*.so") )
for ELEMENT in ${arr[@]}
do
codesign --force --options runtime --verbose=4 --entitlements ./buildInfo/pyentitlements.mac.inherit.plist --sign "Developer ID Application: Decentralize Justice LLC" --timestamp ./$ELEMENT
done
codesign --force --options runtime --verbose=4 --entitlements ./buildInfo/pyentitlements.mac.inherit.plist --sign "Developer ID Application: Decentralize Justice LLC" --timestamp ./public/binaries/macElectrumGW/Python
codesign --force --options runtime --verbose=4 --entitlements ./buildInfo/pyentitlements.mac.inherit.plist --sign "Developer ID Application: Decentralize Justice LLC" --timestamp ./public/binaries/macElectrumGW/macElectrumGW
