#!/bin/sh
## declare an array variable
declare -a arr=(
  "_codecs_iso2022.cpython-36m-darwin.so"
  "math.cpython-36m-darwin.so"
  "_datetime.cpython-36m-darwin.so"
  "_ctypes.cpython-36m-darwin.so"
  "_codecs_jp.cpython-36m-darwin.so"
  "_bz2.cpython-36m-darwin.so"
  "_json.cpython-36m-darwin.so"
  "binascii.cpython-36m-darwin.so"
  "_codecs_hk.cpython-36m-darwin.so"
  "resource.cpython-36m-darwin.so"
  "_random.cpython-36m-darwin.so"
  "_md5.cpython-36m-darwin.so"
  "_scproxy.cpython-36m-darwin.so"
  "_cffi_backend.cpython-36m-darwin.so"
  "_heapq.cpython-36m-darwin.so"
  "_codecs_tw.cpython-36m-darwin.so"
  "_opcode.cpython-36m-darwin.so"
  "_codecs_kr.cpython-36m-darwin.so"
  "_ssl.cpython-36m-darwin.so"
  "_sha3.cpython-36m-darwin.so"
  "fcntl.cpython-36m-darwin.so"
  "_decimal.cpython-36m-darwin.so"
  "_socket.cpython-36m-darwin.so"
  "_hashlib.cpython-36m-darwin.so"
  "grp.cpython-36m-darwin.so"
  "_sha1.cpython-36m-darwin.so"

)

for i in "${arr[@]}"
do
   codesign --force --options runtime --verbose=4 --entitlements ./buildInfo/pyentitlements.mac.inherit.plist --sign "Developer ID Application: Decentralize Justice LLC" --timestamp ./public/binaries/macTrezorTool/$i
done
