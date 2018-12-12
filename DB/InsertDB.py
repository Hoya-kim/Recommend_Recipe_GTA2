import mysql.connector

MAX_FOOD = 95

mydb = mysql.connector.connect (
	host = "13.125.196.191",
	user ="root",
	passwd="gta2!3541",
	database="GTA2")

mycursor = mydb.cursor(buffered=True)

ing_sql = "INSERT INTO INGREDIENT(NAME, CATEGORY) VALUES (%s, %s)"
food_sql = "INSERT INTO FOOD(NAME, CATEGORY, USERID, IMAGE, DESCRIPTION) VALUES (%s,%s,%s,%s,%s)"
recipe_sql = "INSERT INTO RECIPE(IC, FOOD) VALUES (%s, %s)"

# fetch admin userid
"""userid__sql = "SELECT USERID FROM USER WHERE NAME='admin'"
mycursor.execute(userid__sql)
userid = mycursor.fetchall()[0][0] # userid = admin
print("userid")"""


descriptionFile = open("./descriptionFile.txt",'r')
imageFile = open("./imageFile.txt",'r')
ingredientFile = open("./ingredientFile.txt",'r')
recipeFile = open("./recipeFile.txt",'r')


Food_var = []

description = descriptionFile.read()
description = description.split('END')
for i in range(len(description)):
	tmp = description[i].split('\n')
	tmp = tmp[3:-1]
	description[i] = ""
	count = 0
	for item in tmp:
		description[i] += 'Step '+str(count+1)+': '+item+'<br>';
		count += 1
	print("Getting description")
print("Getting description Success")

numFood = 0
count1 = 0 # for ingredient & title
recipes = []
recipeData = recipeFile.readlines()
it = iter(recipeData)
for data in it:
	if(numFood > MAX_FOOD):
		break
	title = next(it).split('Title: ')[1][:-1]
	ingredient = next(it).split('Ingredient : ')[1][:-1]
	category = next(it)[:-1]
	recipes.append([title, ingredient, category])
	#print([title, ingredient, category])
	numFood+=1
	print("Getting Recipes : ",[title, ingredient, category])
print("Getting Recipes Success")


numFood = 0
count2 = 0 # for image
images = []
imageData = imageFile.readlines()
it = iter(imageData)
for URL in it:
	if(numFood >MAX_FOOD):
		break
	images.append(next(it).split('ImageUrl : ')[1][:-1])
	numFood+=1
	print("Getting images")
print("Getting images Success")


# fetch ingredient code
ingid__sql = "SELECT ID FROM INGREDIENT WHERE NAME=%s"
for recipe in recipes:
	ing = set(recipe[1].split())
	ing = list(ing)
	tmp = []
	for i in ing:
		print("Find Ingredient_Id of ", i)
		mycursor.execute("SELECT ID FROM INGREDIENT WHERE NAME='"+i+"'")
		ing_id = mycursor.fetchall()
		if(ing_id == []):
			print("ingredient : ", i)
			name, category = input().split(',')
			mycursor.execute(ing_sql,(name, category))
			mydb.commit()
			tmp.append(name)
		else:
			tmp.append(ing_id[0][0])
	recipe[1] = tmp


for i in range(MAX_FOOD):
	print("Make Food_var list")
	if(recipes[i][0] == '콩나물불고기'):
		continue
	Food_var.append((recipes[i][0], recipes[i][2], 1, images[i], description[i]))
print("Make Food_var list Success")


mycursor.executemany(food_sql, Food_var);
mydb.commit()
print("Add Food_var list finish")

foodid__sql = "SELECT ID FROM FOOD WHERE NAME=%s"
for recipe in recipes:
	print(recipe)
	mycursor.execute("SELECT ID FROM FOOD WHERE NAME='"+recipe[0]+"'")
	result = mycursor.fetchone()
	if(result is None): continue
	print("result(Food_ID) : ",result)
	result = result[0]
	for ing in recipe[1]:
		print(ing, result)
		tmp = (ing,result)
		try:
			mycursor.execute(recipe_sql, tmp)
		except mysql.connector.Error as err:
			continue
mydb.commit()
