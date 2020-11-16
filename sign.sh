#!/bin/sh
## declare an array variable
declare -a arr=("_sha1.cpython-37m-darwin.so")

## now loop through the above array
for i in "${arr[@]}"
do
   codesign --deep --force --options runtime --verbose=4 --entitlements \"./buildInfo/pyentitlements.mac.inherit.plist\" --sign \"Developer ID Application: Decentralize Justice LLC\" --timestamp ./public/binaries/macHWI/$i
   # or do whatever with individual element of the array
done
