import re
import requests
from bs4 import BeautifulSoup as bs
import json
import pickle

def get_recipe():
	recipeFile = open("./recipeFile.txt", 'a')
	descriptionFile = open("./descriptionFile.txt", 'a')
	ingredientFile = open("./ingredientFile.txt", 'a')
	imageFile = open("./imageFile.txt", 'a')

	ID = 0;
	ingredientType = []
	for page_index in range(100):
		rq_page = requests.get('http://www.10000recipe.com/recipe/list.html?q=%EB%B0%B1%EC%A2%85%EC%9B%90&order=accuracy&page='+str(page_index+1))
		if rq_page.status_code != 200:
			continue
		html_page = rq_page.text
		soup_page = bs(html_page, 'html.parser')

		#link = soup_page.find_all('div',{'class':'col-xs-4'})['href']

		LINKS = []
		LINK_PATTERN = re.compile('')
		for a in soup_page.find_all('a', href=True):
			link = str(a['href'])
			if('/recipe/' not in link):
				continue
			if('/recipe/l' in link):
				continue
			LINKS.append(link)

		for link in LINKS:
			r = requests.get('http://www.10000recipe.com'+link)
			html = r.text
			soup = bs(html, 'html.parser')

			title = str(soup.find('div',{'class':'view2_summary'}))
			ingredient = soup.find('div', {'class':'cont_ingre2'})
			description = soup.find_all('div',{'class':'media-body'})
			imageUrl = soup.find('img',{'id':'main_thumbs'})

			# if there is no ingredient
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
			hangul = re.compile('[^ \u3131-\u3163\uac00-\ud7a30-9]+')
			title = hangul.sub('',title)

			# parse ingredient
			ingredient = ingredient.strip().replace(' ','').split('\n')
			while '' in ingredient:
				ingredient.remove('')
			del ingredient[0:3]

			ingredientList = []
			for j in range(len(ingredient)):
				if(any(char.isdigit() for char in ingredient[j])):
					continue
				if(ingredient[j] not in ingredientType):
					ingredientType.append(ingredient[j])
				ingredientList.append(ingredient[j])

			#parse description
			descriptionList = []
			for recipe in description:
				data = str(recipe.text)
				data = data.replace('\n',' ')
				descriptionList.append(data)

			# write data to file
			recipeFile.write("ID: "+str(ID+1)+"\n")
			recipeFile.write("Title: "+title+'\n')
			print(title)
			recipeFile.write("Ingredient : ")
			for item in ingredientList:
				recipeFile.write(item+' ')
			recipeFile.write('\n')

			# write description of food
			descriptionFile.write("ID: "+str(ID+1)+"\n")
			descriptionFile.write("description:\n")
			for item in descriptionList:
				descriptionFile.write(item+'\n')
			descriptionFile.write("END\n")

			# link to picture
			imageFile.write("ID: "+str(ID+1)+"\n")
			imageFile.write("ImageUrl : "+str(imageUrl)+'\n')

			ID+=1

	for item in ingredientType:
		ingredientFile.write(item+'\n')
	recipeFile.close()
	descriptionFile.close()
	ingredientFile.close()
	imageFile.close()

if __name__=='__main__':
	get_recipe()
