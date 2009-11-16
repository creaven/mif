#!/opt/local/bin/python2.5
 
f=open('result-css.js', 'w')
 
selector='window bg'
ie6='.ie6'
 
 
coords=(8, 124, 3, 2)
 
left, top, right, bottom = map(str, coords)
 
padding_left='10'
padding_top='10'
l='-5'
t='-5'

dir='../../Source/images/'
img='window-'
ext='png'
 
imgs={
	"tl": img+'tl'+'.'+ext,
	"tr": img+'tr'+'.'+ext,
	"bl": img+'bl'+'.'+ext,
	"br": img+'br'+'.'+ext,
	"t": img+'t'+'.'+ext,
	"b": img+'b'+'.'+ext,
	"l": img+'l'+'.'+ext,
	"r": img+'r'+'.'+ext,
	"c": img+'c'+'.'+ext
}
 
css=''
css+='"'+selector+', '+selector+' div": {\n'+'"position": "absolute",\n'+'"overflow": "hidden"\n'+'},\n\n'
css+='"'+selector+' ": {\n'+'"left":"'+l+'px",\n'+'"top": "'+t+'px",\n'+'"padding-left":"'+padding_left+'px",\n'+'"padding-top":  "'+padding_top+'px",\n"width": "100%",\n"height": "100%"\n},\n\n'
#css+='"'+ie6+' '+selector+' ": {\n'+'"overflow-y:hidden"\n'+'},\n\n'
css+='"'+selector+' .top": {\n'+'"height": '+'"'+top+'px",\n'+'"width": "100%",\n'+'"position": "relative",\n'+'"top":"-'+padding_top+'px",\n'+'"padding-left":"'+padding_left+'px",\n'+'"padding-top": "'+padding_top+'px",\n'+'"left":"-'+padding_left+'px"\n'+'},\n\n'
css+='"'+selector+' .center": {\n'+'"height": "100%",\n'+'"width": "100%",\n'+'"position": "relative",\n'+'"top":"-'+str(2*int(bottom)+int(top)+2*int(padding_top))+'px",\n'+'"padding-left":"'+padding_left+'px",\n'+'"padding-top": "'+padding_top+'px",\n'+'"left":"-'+padding_left+'px"\n'+'},\n\n'
css+='"'+selector+' .bottom": {\n'+'"height": '+'"'+bottom+'px",\n'+'"width": "100%",\n'+'"top":"-'+str(2*int(bottom)+int(top)+2*int(padding_top))+'px",\n'+'"position": "relative",\n'+'"padding-left":"'+padding_left+'px",\n'+'"left":"-'+padding_left+'px"'+'\n},\n\n'
css+='"'+selector+' .tl": {\n'+'"width": '+'"'+left+'px",\n'+'"height": '+'"'+top+'px",\n'+'"background": '+'"'+imgs['tl']+'".toMifImg()'+',\n'+'"left":"0px",\n'+'"top": "0px"\n'+'},\n\n'
css+='"'+selector+' .tr": {\n'+'"width": '+'"'+right+'px",\n'+'"height": '+'"'+top+'px",\n'+'"float": "right",\n'+'"position": "relative",\n'+'"background": '+'"'+imgs['tr']+'".toMifImg(),\n'+'"top":"-'+padding_top+'px"\n'+'},\n\n'
css+='"'+selector+' .t": {\n'+'"height": '+'"'+top+'px",\n'+'"width": "100%",\n'+'"left":"-'+str(int(right)+int(padding_left))+'px",\n'+'"top": "0",\n'+'"clip": "rect(auto auto auto '+str(int(left)+int(right)+int(padding_left))+'px)",\n'+'"background": '+'"'+imgs['t']+'".toMifImg()'+',\n'+'"padding-left":"'+padding_left+'px"\n'+'},\n\n'
css+='"'+ie6+' '+selector+' .t": {\n'+'"left":"-'+right+'px",\n'+'"clip": "rect(auto auto auto '+str(int(left)+int(right))+'px)"\n'+'},\n\n'
css+='"'+selector+' .bl": {\n'+'"width": '+'"'+left+'px",\n'+'"height": '+'"'+bottom+'px",\n'+'"background": '+'"'+imgs['bl']+'".toMifImg(),\n'+'"left":"0px"\n'+'},\n\n'
css+='"'+selector+' .br": {\n'+'"width": '+'"'+right+'px",\n'+'"height": '+'"'+bottom+'px",\n'+'"float": "right",\n'+'"position": "relative",\n'+'"background": '+'"'+imgs['br']+'".toMifImg()'+'\n'+'},\n\n'
css+='"'+selector+' .b": {\n'+'"height": '+'"'+bottom+'px",\n'+'"width" : "100%",\n'+'"left":"-'+str(int(right)+int(padding_left))+'px",\n'+'"clip": "rect(auto auto auto '+str(int(left)+int(right)+int(padding_left))+'px)",\n'+	'"background": '+'"'+imgs['b']+'".toMifImg(),\n'+'"padding-left":"'+padding_left+'px"\n'+'},\n\n'
#css+='"'+ie6+' '+selector+' .b": {\n'+'"left":"-'+right+'px",\n'+'"clip": "rect(auto auto auto '+str(int(left)+int(right))+'px)"\n'+'},\n\n'
css+='"'+selector+' .l": {\n'+'"height" : "10000px",\n'+'"width": "'+left+'px",\n'+'"left":"0",\n'+'"top": "'+str(int(top)+2*int(bottom))+'px",\n'+'"background": '+'"'+imgs['l']+'".toMifImg()'+'\n'+'},\n\n'
css+='"'+selector+' .r": {\n'+'"height" : "10000px",\n'+'"width": "'+right+'px",\n'+'"top": "'+str(int(top)+2*int(bottom)-int(padding_top))+'px",\n'+'"float": "right",\n'+'"position": "relative",\n'+'"background": '+'"'+imgs['r']+'".toMifImg()'+'\n'+'},\n\n'
css+='"'+selector+' .c": {\n'+'"height": "10000px",\n'+'"width" : "100%",\n'+'"left":"-'+str(int(right)+int(padding_left))+'px",\n'+'"top": "'+str(int(top)+2*int(bottom))+'px",\n'+'"clip": "rect(auto auto auto '+str(int(left)+int(right)+int(padding_left))+'px)",\n'+'"background": '+'"'+imgs['c']+'".toMifImg(),\n'+'"padding-left":"'+padding_left+'px"\n'+'}\n\n'
#css+='"'+ie6+' '+selector+' .c": {\n'+'"left":"-'+right+'px",\n'+'"clip": "rect(auto auto auto '+str(int(left)+int(right))+'px)"\n'+'}'
 
 
f.write(css)