#!/opt/local/bin/python2.5

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
result='/*\nContent-Type: multipart/related; boundary="SEPARATOR"\n\n*/\n'
result+="var MifImage={\n"
for filename in data:
	header="""
--SEPARATOR
Content-Type:image/%s
Content-Location:%s
Content-Transfer-Encoding:base64
*/
""" % (filename[-3:], filename)
	result+="\n\t'"+filename+"': /*\n"+header+"\n'"+data[filename]+"',\n"
result=result[0:-2]+"\n"
result+="\n}\n"
result+="\n/*\n--SEPARATOR--\n*/\n"
open(dst, 'w').write(result)
