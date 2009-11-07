#!/usr/bin/env python

import os, re, base64

image_dir='../../Source/images'
dst='../../Source/images/MifImage.js'
dst_ie='../../Source/images/MifImage.mht'

data={}

for filename in os.listdir(image_dir):
	if not re.search('\.(gif|png|jpg)$', filename):
		continue
	else:
		file=os.path.join(image_dir, filename)
		data[filename]=base64.b64encode(open(file).read())

result="var MifImage={\n"
for filename in data:
	result+="\n\t'"+filename+"': '"+data[filename]+"',\n"
result=result[0:-2]+"\n"
result+="\n}\n"
	
open(dst, 'w').write(result)

#ie

result='Content-Type: multipart/related; boundary="SEPARATOR"\n\n'

for filename in data:
	result+="""
--SEPARATOR
Content-Type:image/%s
Content-Location:%s
Content-Transfer-Encoding:base64

""" % (filename[-3:], filename)
	result+=data[filename]+"\n"

result+="\n--SEPARATOR--\n"

open(dst_ie, 'w').write(result)