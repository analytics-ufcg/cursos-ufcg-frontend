import urllib
import simplejson
from unidecode import unidecode

key = "AIzaSyAiLT-Z2YJM8WVk-TVsxLwZfg_K3hfA_8U"

googleGeocoderURL = "https://maps.googleapis.com/maps/api/geocode/json?address="

def get_coordinates(query, from_sensor=False):
    query = unidecode(query)
    params = {
        "address" : query
    }
    
    url = googleGeocoderURL + urllib.urlencode(params) + "&components=country:BR,&key=" + key
    json_response = urllib.urlopen(url)
    response = simplejson.loads(json_response.read())
    
    if response['results']:
        location = response['results'][0]['geometry']['location']
        latitute, longitude = location['lat'], location['lng']
        return [latitute, longitude]
    
    return [None, None]
    

cities = open("cidades_mulheresCC.csv", "r")
coordinatesPlusQtd = open("coordenadas_cidades.csv", "w")

for line in cities:
    line.replace(" ", "+")
    line = line.split()
    city_and_state = ""
    for l in line[:len(line) - 1]:
        city_and_state += l + "+"
    
    line = [city_and_state, line[-1]]
        
    coordinate = get_coordinates(line[0])
    
    if coordinate == [None, None]:
        coordinatesPlusQtd.write("toulouse\n")
    else:
        coordinatesPlusQtd.write("%.4f,%.4f,%d\n" %(coordinate[0], coordinate[1], int(line[-1])))

cities.close()
coordinatesPlusQtd.close()
