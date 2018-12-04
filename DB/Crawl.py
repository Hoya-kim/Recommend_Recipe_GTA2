import requests
from bs4 import BeautifulSoup as bs
import json

lt = []

def get_recipe():
	for i in range(100):
		r = requests.get('http://www.10000recipe.com/recipe/'+str(6900000+i))
		html = r.text
		soup = bs(html, 'html.parser')

		title = str(soup.find('div',{'class':'view2_summary'}))
		ingre = soup.find('div', {'class':'cont_ingre2'}).text
		reci = soup.find_all('div',{'class':'media-body'})


		# parse title
		title = title[title.find('<h3>')+4:title.find('</h3>')]

		# parse ingredient
		ingre = ingre.strip().replace(' ','').split('\n')
		while '' in ingre: ingre.remove('')
		del ingre[0:2]
		ingredient = []

		chk = 1
		for i in range(len(ingre)):
			if('양념' in ingre[i]):
				if(chk == 1):
					chk = 0
				elif(chk == 0):
					chk = 1
				continue
			if(i % 2 == chk):
				ingredient.append(ingre[i])

		#parse recipe
		recipe = []
		for r in reci:
			data = str(r.text)
			data = data.replace('\n',' ')
			recipe.append(data)

		lt.append([{"title":title},{"ingredient":ingre},{"recipe":recipe}])
	print(lt)


if __name__=='__main__':
	get_recipe()
