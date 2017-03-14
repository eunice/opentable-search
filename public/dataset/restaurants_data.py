import json
from pprint import pprint
import csv

hashmap = {}
result = []

# create hashmap -- mapping of objectID & index of object from restaurants_list.csv
with open('restaurants_list.json') as data_file:
    restaurant_data = json.load(data_file)
    for idx, obj in enumerate(restaurant_data):
        objectID = obj['objectID']
        hashmap[str(objectID)] = obj

# print hashmap
# iterate csv file -- lookup objectId from hashmap, assign attributes to json object
with open('restaurants_info.csv', 'rb') as info_file:
    reader = csv.reader(info_file)
    next(reader, None)  # skip the headers
    for row in reader:
        column = ''.join(row).split(';')
        objectID = str(column[0])
        restaurant = hashmap[objectID]

        #add additional info from csv file
        restaurant['food_type'] = column[1]
        restaurant['stars_count'] = float(column[2])
        restaurant['reviews_count'] = column[3]
        restaurant['neighborhood'] = column[4]
        restaurant['phone_number'] = column[5]
        restaurant['price_range'] = column[6]
        restaurant['dining_style'] = column[7]
        options = restaurant['payment_options']

        #clean up payment options
        if ('Diners Club' in options or 'Carte Blanche' in options or 'JCB' in options) and ('Discover' not in options):
            restaurant['payment_options'].append('Discover')
        restaurant['payment_options'] = [opt for opt in options if opt not in ('Diners Club', 'Carte Blanche', 'JCB', 'Pay with OpenTable')]
        print restaurant
        result.append(restaurant)

# output file
print result
print len(result)
with open('output_restaurants1.json', 'w') as outfile:
    json.dump(result, outfile)
