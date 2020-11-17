#!/bin/sh
## declare an array variable
declare -a arr=(
  "_sha1.cpython-37m-darwin.so"
  "_blake2.cpython-37m-darwin.so"
  "_struct.cpython-37m-darwin.so"
  "hid.cpython-37m-darwin.so"
  "_sha3.cpython-37m-darwin.so"
  "_ssl.cpython-37m-darwin.so"
  "_decimal.cpython-37m-darwin.so"
  "_socket.cpython-37m-darwin.so"
  "grp.cpython-37m-darwin.so"
  "_hashlib.cpython-37m-darwin.so"
  "_codecs_cn.cpython-37m-darwin.so"
  "_multibytecodec.cpython-37m-darwin.so"
  "_bisect.cpython-37m-darwin.so"
  "unicodedata.cpython-37m-darwin.so"
  "_sha256.cpython-37m-darwin.so"
  "zlib.cpython-37m-darwin.so"
  "termios.cpython-37m-darwin.so"
  "_pickle.cpython-37m-darwin.so"
  "readline.cpython-37m-darwin.so"
  "pyexpat.cpython-37m-darwin.so"
  "_lzma.cpython-37m-darwin.so"
  "select.cpython-37m-darwin.so"
  "_posixsubprocess.cpython-37m-darwin.so"
  "_sha512.cpython-37m-darwin.so"
  "_datetime.cpython-37m-darwin.so"
  "_ctypes.cpython-37m-darwin.so"
  "_codecs_jp.cpython-37m-darwin.so"
  "_bz2.cpython-37m-darwin.so"
  "_codecs_iso2022.cpython-37m-darwin.so"
  "math.cpython-37m-darwin.so"
  "_md5.cpython-37m-darwin.so"
  "_scproxy.cpython-37m-darwin.so"
  "_cffi_backend.cpython-37m-darwin.so"
  "_heapq.cpython-37m-darwin.so"
  "_codecs_tw.cpython-37m-darwin.so"
  "_codecs_kr.cpython-37m-darwin.so"
  "_opcode.cpython-37m-darwin.so"
  "_json.cpython-37m-darwin.so"
  "binascii.cpython-37m-darwin.so"
  "_contextvars.cpython-37m-darwin.so"
  "_codecs_hk.cpython-37m-darwin.so"
  "resource.cpython-37m-darwin.so"
  "_random.cpython-37m-darwin.so"
  "cryptography/hazmat/bindings/_openssl.abi3.so"
  "google/protobuf/internal/_api_implementation.cpython-37m-darwin.so"
  "google/protobuf/pyext/_message.cpython-37m-darwin.so"

)

## now loop through the above array
for i in "${arr[@]}"
do
   codesign --force --options runtime --verbose=4 --entitlements ./buildInfo/pyentitlements.mac.inherit.plist --sign "Developer ID Application: Decentralize Justice LLC" --timestamp ./public/binaries/macHWI/$i
   # or do whatever with individual element of the array
done
