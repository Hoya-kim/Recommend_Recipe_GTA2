import re
import requests
from bs4 import BeautifulSoup as bs
import json
import pickle

def get_recipe():
	recipeFile = open("./recipeFile.txt", 'w')
	for i in range(20000):
		r = requests.get('http://www.10000recipe.com/recipe/'+str(6900000+i))
		if r.status_code != 200:
			continue
		html = r.text
		soup = bs(html, 'html.parser')

		title = str(soup.find('div',{'class':'view2_summary'}))
		ingredient = soup.find('div', {'class':'cont_ingre2'})
		description = soup.find_all('div',{'class':'media-body'})
		imageUrl = soup.find('img',{'id':'main_thumbs'})

		if ingredient is None:
			continue
		else:
			ingredient = ingredient.text

		if imageUrl is None:
			continue
		else:
			imageUrl = imageUrl['src']


		# parse title
		title = title[title.find('<h3>')+4:title.find('</h3>')]
		hangul = re.compile('[^ \u3131-\u3163\uac00-\ud7a3]+')
		title = hangul.sub('',title)

		# parse ingredient
		ingredient = ingredient.strip().replace(' ','').split('\n')
		while '' in ingredient:
			ingredient.remove('')
		del ingredient[0:3]
		ingredientList = []

		chk = 1
		for j in range(len(ingredient)):
			ingredientList.append(ingredient[j])

		#parse recipe
		recipeList = []
		for recipe in description:
			data = str(recipe.text)
			data = data.replace('\n',' ')
			recipeList.append(data)


		# write data to file
		recipeFile.write("ID: "+str(i+1)+"\n")
		recipeFile.write("ImageUrl : "+str(imageUrl)+'\n')
		recipeFile.write("Name: "+title+"\n")
		recipeFile.write("ingredient: ")
		for item in ingredientList:
			recipeFile.write(item+' ')
		recipeFile.write(" END\n")
		recipeFile.write("Recipe:\n")
		for item in recipeList:
			recipeFile.write(item+'\n')
		recipeFile.write("END\n")
	recipeFile.close()


if __name__=='__main__':
	get_recipe()
