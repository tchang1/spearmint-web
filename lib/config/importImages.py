import os 
import os.path
import pprint
 
writeString = ""

def put(imagePath, categoryid):
	global writeString
	writeString += "{\n\t \"categoryid\": \""+ str(categoryid) + "\", \"uri\": \""+imagePath+"\" \n},"
	writeString += "\n" 


def visit(arg, dirname, names):
	categoryid = 0
   	if (dirname == '../../app/images/savingImages/travel'):
   		categoryid = 1 


	for name in names:
		subname = os.path.join(dirname, name)
		if ((not os.path.isdir(subname)) and (name != '.DS_Store')):
			subname = subname.replace('../../app/images/', '/')
			put(subname, categoryid)
 


writeString += "{ \n\t \"images\": [ \n"
os.path.walk('../../app/images/savingImages', visit, 'arguments')
writeString = writeString[:-2] #remove the last ',' in the string
writeString += "\n ] }"

fd = open("images.json", 'w')
fd.write(writeString)
fd.close()
