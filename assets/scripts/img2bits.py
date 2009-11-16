#!/opt/local/bin/python2.5
 
import Image, sys, os.path, shutil
 
args=sys.argv
 
src=args[1]
if len(args)==4:
	left=int(args[2])
	right=int(args[3])
if len(args)==6:
	left=int(args[2])
	top=int(args[3])
	right=int(args[4])
	bottom=int(args[5])
 
dirname=os.path.dirname(src)
basename=os.path.basename(src)
img_name, img_type=basename.split('.')
 
if len(args)==6:
	coords=(left, top, right, bottom)
else:
	coords=(left, right)
 
im=Image.open(src)
 
if 'transparency' in im.info:
	transparency=im.info['transparency']
else:
	transparency=0
 
width, height=im.size
 
if len(args)==6:
	boxes={
	  "tl": (0, 0, coords[0], coords[1]),
	  "tr": (width-coords[2], 0, width, coords[1]),
	  "bl": (0, height-coords[3], coords[0], height),
	  "br": (width-coords[2], height-coords[3], width, height),
	  "t": (coords[0], 0, width-coords[2], coords[1]),
	  "b": (coords[0], height-coords[3], width-coords[2], height),
	  "l": (0, coords[1], coords[0], height-coords[3]),
	  "r": (width-coords[2], coords[1], width, height-coords[3]),
	  "c": (coords[0], coords[1], width-coords[2], height-coords[3])
	}
else:
	boxes={
	  "l": (0, 0, coords[0], height),
	  "r": (width-coords[1], 0, width, height),
	  "c": (coords[0], 0, width-coords[1], height)
	}

for box in boxes:
  im.crop(boxes[box]).save(dirname+'/'+img_name+'-'+box+'.'+img_type)
 
