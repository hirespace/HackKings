# Hire Space @ Hack Kings

### Working at HS (Culture, Values, How We Work)

### Placement

### Prizes
* Console Log Recognition
* Amazon Giftcards
* Invite to a free event
* Swag
  * Stickers
  * TShirts
  * Notepads
  * Pens

# API
### Authentication
We want you to create awesome stuff with our data as fast as possible, so we've made it super easy for you to access our API.
All it requires is a Basic Authentication header with each request:
```
Authorization: Basic aGFja2tpbmdzOlRuMllXaWRTejNLTWlTTjJN
```

# Endpoints
We have several possible end points for you all to use. 
All of the endpoints except for Search have a GetAll endpoint and a singular endpoint which all take an id. We have a lot of data and so querying all usages for example isn't recommended, but we use a special query filtering tool called OData which you can read more about down below. Also remember to add the above authentication header in with each request, otherwise you'll get back a 401 Unauthorised status code.

### Venues
You can query all our 4000+ venues or query just one by using the venue id which you may possibly get from search, spaces or usages. 
```
HTTP GET
https://api.hirespace.com/Api/Venues/
https://api.hirespace.com/Api/Venues/{id}
```

### Spaces
We have over 8000 spaces, all have a parent venue and most have children usages.
```
HTTP GET
https://api.hirespace.com/Api/Spaces/
https://api.hirespace.com/Api/Spaces/{id}
```

### Usages
Lastly we have just a little over 17,000 usages, so I'd recommend not getting all the usages and parsing every single one individually. You can get a set of usages from a space.
```
HTTP GET
https://api.hirespace.com/Api/Usages/
https://api.hirespace.com/Api/Usages/{id}
```

### Search
Search is a very special endpoint. We use a form of elastic search on the server called Lucene.Net which is the .Net port of the Java version and we index all our venues on a daily basis to get the most up-to-date searches. 

```
HTTP POST
https://api.hirespace.com/Api/Search/
```

This endpoint takes a JSON body like so:
```
{
    "city": "1",
    "maxPrice": 2000
}
```
Search has a LOT of available filters with only a couple that are required at the top of the following list.
Filter | Type | Description
:---: | :---: | :---
city | int | The city id to search in (See below for possible values)
searchTerm | string |  Type of venue to search for (See below for possible values)
capacity | int | The maximum amount of people the venue can hold
longitude | decimal | The centre point for the search
latitude | decimal | The centre point for the search
radius | int | The distance around the centre point in miles to search in
minPrice | int | The minimum price that a venue can be hired for
maxPrice | int | The maximum price that a venue can be hired for
ownCatering | bool | Whether you can use your own caterer
ownAlcohol | bool | Whether you can bring your own alcohol
venueCatering | bool | Whether the venue has their own caterers which you can use
kitchenette | bool | Whether there is a small kitchen you can use
kitchen | bool | Whether there is a larger kitchen you can use
cateringEquipment | bool | Whether there is catering equipment you can use
spaceForEquipment | bool | Whether there is space to bring your own equipment
halal | bool | Whether the venue can provide Halal food
kosher | bool | Whether the venue can provide Kosher food
accommodation | bool | Whether the venue can accommodate guests
parking | bool | Whether the venue has parking available
disabledAccess | bool | Whether the venue has disabled access
outsideSpace | bool | Whether the venue has outside space
storageSpace | bool | Whether the venue has storage space
wifi | bool | Whether the venue has WiFi available
weddingLicence | bool | Whether the venue has a wedding licence
alcoholLicence | bool | Whether the venue has an alcohol licence
TENs | bool | Whether the venue has a TENs licence
floorSpace | decimal | The venues floor space in sq feet
height | decimal | The venues height in feet
sqM | decimal | The venues floor space in sq meters
m | decimal | The venues height in meters
prime | bool | Whether the venue is prime
partner | bool | Whether the venue is partner
newFilter | bool | Whether this is a new venue



### OData

### Data Structures

### Classes
E.g. Cities/PublishStatus/SearchTerms

### Example Requests

### Support/Contact
Public Slack
Email