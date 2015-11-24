# Hire Space @ Hack Kings
 * [Working at HS](#working-at-hs-culture-values-how-we-work)
 * [Placement](#placement)
 * [Prizes](#prizes)
 * [API](#api)
   * [Authentication](#authentication)
   * [Endpoints](#endpoints)
     * [Venues](#venues)
     * [Spaces](#spaces)
     * [Usages](#usages)
     * [Search](#search)
 * [OData](#odata)
 * [Data Structures](#data-structures)
   * [Venues](#venues-1)
   * [Spaces](#spaces-1)
   * [Usages](#usages-1)
   * [Search](#search-1)
 * [Classes](#classes)
   * [Cities](#cities)
   * [Publish Status](#publish-status)
   * [Promotional Status](#promotional-status)
   * [Search Terms](#search-terms)
   * [Price Strictness](#price-strictness)
   * [Image Ratios](#image-ratios)
   * [Image Sizes](#image-sizes)
   * [Days of Week](#days-of-week)
   * [Price Classification](#price-classification)
   * [Pricing By Delegate Type](#pricingbydelegatetype)
   * [Pricing Structure Type](#pricingstructuretype)
   * [Pricing By Time Type](#pricingbytimetype)
 * [Images](#images)
 * [Support/Contact](#supportcontact)

# Working at HS

Hire Space is the UK’s leading venue marketplace, revolutionising the way people find and book venues. We help people create memorable events by putting the perfect venues at their fingertips.

We're a growing team of ambitious,talented and passionate individuals who enjoy working in an exciting and collaborative environment that encourages innovation and contribution from everyone.

# Placement
We take on a single placement student every year and are currently looking for one to start in June 2016. We are looking for someone with experience in some of these areas:
 * .Net / ASP.Net / C#
 * Meteor JS
 * Full Stack Development
 * Angular JS

If you think you've got what it takes to work at one of London's top start-ups then send your CV to will@hirespace.com.

# Prizes
We are presenting a prize to a team for the best use of our API

* Console Log Recognition: Have all your names printed on 100,000 consoles.
* Amazon Giftcards: £50 per team member
* Invite to a free event: Tickets for you and a friend to attend one of our legendary venue showcases. Champagne at Tower of London? Cocktails at Shoreditches latest most trendy venue?
* Swag
  * Stickers
  * TShirts
  * Notepads
  * Pens

# API
## Authentication
We want you to create awesome stuff with our data as fast as possible, so we've made it super easy for you to access our API.
All it requires is a Basic Authentication header with each request:
```
Authorization: Basic aGFja2tpbmdzOlRuMllXaWRTejNLTWlTTjJN
```

## Endpoints
We have several possible end points for you all to use. 
All of the endpoints except for Search have a GetAll endpoint and a singular endpoint which all take an id. We have a lot of data and so querying all usages for example isn't recommended, but we use a special query filtering tool called OData which you can read more about down below. Also remember to add the above authentication header in with each request, otherwise you'll get back a 401 Unauthorised status code.

#### Venues
You can query all our 4000+ venues or query just one by using the venue id which you may possibly get from search, spaces or usages. 
```
HTTP GET
https://api.hirespace.com/Api/Venues/
https://api.hirespace.com/Api/Venues/{id}
```

#### Spaces
We have over 8000 spaces, all have a parent venue and most have children usages.
```
HTTP GET
https://api.hirespace.com/Api/Spaces/
https://api.hirespace.com/Api/Spaces/{id}
```

#### Usages
Lastly we have just a little over 17,000 usages, so I'd recommend not getting all the usages and parsing every single one individually. You can get a set of usages from a space.
```
HTTP GET
https://api.hirespace.com/Api/Usages/
https://api.hirespace.com/Api/Usages/{id}
```

#### Search
Search is a very special endpoint. We use a form of elastic search on the server called Lucene.Net which is the .Net port of the Java version and we index all our venues on a daily basis to get the most up-to-date searches. 

```
HTTP POST
Content-Type: application/json
https://api.hirespace.com/Api/Search/
```

This endpoint takes a JSON body like so:
```
{
    "city": "1",
    "maxPrice": 2000
}
```
Search has a LOT of available filters with none required. All can be used like the example above, just a JSON object with a key and value. The key being the filter from the table below. 

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

## OData
On the `Api/Venues`, `Api/Spaces` and `Api/Usages` endpoints, you can add OData queries to further filter the infomation by any field, sort the data, skip, top and do much more. You can view a detailed document of how to do this here: https://msdn.microsoft.com/en-gb/library/gg309461.aspx

But here are a couple examples to get you started:
```json
This will skip the first 10 venues and get the next 10 venues:
HTTP GET
https://api.hirespace.com/Api/Venues?$skip=10&$top=10
```
```json
This request would get all the venues that are located in Soho
HTTP GET
https://api.hirespace.com/Api/Venues?$filter=Locality eq 'Soho'
```

You can `$filter` by any field you see in the data structures below, as well as `$orderby` and `$select` them. These OData queries will not work on the endpoints that have an id attached to the end of them. You can see how this too becomes a powerful search tool, but it can also be quite costly in terms of time depending on the endpoint. 

# Data Structures
Here is a list of the data structures that will be returned from each endpoint. Each property will have the data type, a short description of the property and whether or not it may be null. Properties that are also objects will also have an extra `properties` field which contains the child properties along with their type and whatnot.

#### Venues
This is the schema of the `Venues` data structure. This is what the single venues endpoint will return. The multiple venues endpoint will return an array of this object.

[Venues Data Structure](/venues.txt)

#### Spaces
This is the schema of the `Spaces` data structure. This is what the single spaces endpoint will return. The multiple spaces endpoint will return an array of this object.

[Spaces Data Structure](/spaces.txt)

#### Usages
This is the schema of the `Usages` data structure. This is what the single usages endpoint will return. The multiple usages endpoint will return an array of this object.

[Usages Data Structure](/usages.txt)

#### Search
This is the schema of `Search` data structure. This is what the seatch endpoint will return. It has a maximum of 300 search results along with the initial query and any search assumptions. 

[Search Data Structure](/search.txt)

# Classes

#### Cities
This is a list of the current live cities which contain venues. You would most likely be using the `City Id` to referrence a city in queries. 

City Name | City ID | Latitude | Longitude
--- | --- | --- | ---
London | 1 | -0.1015987 | 51.5286416
Manchester | 2 | -2.241561 | 53.483527
Liverpool | 3 | -2.9705843 | 53.4066048
Birmingham | 4 | -1.8636315 | 52.4774376
All UK | 14 | -0.9281521 | 52.7439863

#### Publish Status
A `Venue`, `Space` and `Usage` all have a Status property which refers to one of these values.

Publish Status | Name | Description
:---: | --- | :---
1 | Unpublished | This is a new profile which hasn't been submitted for approval yet
2 | Unapproved | This is a profile that is waiting for approval by a member of the Hire Space team
3 | Published | This is a live profile on the website
4 | Dormant | This profile is a profile from a venue that we are no longer working with and won't be any time soon
5 | Deleted | This profile will never be seen again

#### Promotional Status
A venue can buy either of our promotional packages, Prime or Partner. This is how we store whether they have them.

Promo Status | Name | Description
--- | --- | ---
0 | None | No active promotion
1 | Applied | There is a scheduled promotion
2 | Active | There is currently an active promotion

#### Search Terms
When using the search end point, we have a pre-defined list of search terms that get applied to venues for easier search. The list below is the current search term list, you can use them in the `searchTerm` field when calling the search endpoint to get more accurate results back.

[Search Term List](/search_terms.txt)

#### Price Strictness
A venue can state how flexible their pricing is using the values below.

Price Strictness | Name
--- | ---
1 | Rough Guide
2 | Negotiatiable
3 | Fixed Price

#### Image Ratios
Each image is resized multiple times using these ratios. Not all images have every ratio available and so you should check the `SuitabilityForSizes` property in the [Usages](/usages.txt) data struture.

Name | Label | Minimum Ratio Width to Height | Maximum Ratio Width to Height
--- | --- | --- | ---
Square | sq | 1 | 1
Landscape | ls | 1.5 | 1.5
Portrait | pt | 0.66 | 0.66
Original Constrained | oc | 0.5 | 2
Banner | ba | 2.4 | 2.4

#### Image Sizes
Each image is also resized multiple times using these different sizes. Again, not all images have every size available and so you should check the `SuitabilityForSizes` property in the [Usages](/usages.txt) data struture.

Name | Label | Destination Width (in px)
--- | --- | ---
Extra Small | xs | 75
Small Medium | sm | 150
Large | l | 320
Extra Large | xl | 400
Extra Extra Extra Large | xxxl | 900
Retina Extra Large | rxl | 1200
Retina Extra Extra Large | rxxl | 1600

#### Days of Week
A price will apply to certain recurrence days. We store these as flags and they can be combined by adding the flags together as you can see in the table below. These are the pre-defiend ones which we allow the user to select.

Days | Name
--- | ---
0 | None
1 | Monday
2 | Tuesday
4 | Wednesday
8 | Thursday
16 | Friday
32 | Saturday
64 | Sunday
31 | Weekdays
96 | Weekends
79 | Sunday - Thursday
48 | Friday & Saturday
127 | Everyday

#### Price classification
This is how flexible a single price is, comapred to the `PriceStrictness` which defines the strictness for the whole venue.

Price Classification | Name
--- | ---
0 | Fixed Price
1 | Price is From
2 | Price Range

#### PricingByDelegateType
This defines whether a price is for a time period or per delegate. This is usually almost always `Time` except for when the `PricingStructure` is a delegate package or a party package,

Delegate Type | Name
--- | ---
1 | Time
2 | Delegate

#### PricingStructureType
A price can be for purely just the venue hire, a minimum spend or maybe a combination. 

Structure Type | Name
--- | ---
1 | Venue Fee
2 | Minimum Spend
3 | Venue Fee & Minimum Spend
4 | Delegate Package
5 | Party Package

#### PricingByTimeType
This defines what general period a price applies too.

Time Type | Name
--- | ---
2 | Hour
3 | Day
4 | Week
5 | Month
6 | Morning
7 | Afternoon
8 | Evening

# Images
All of our images from our CDN are all available to use, an image is linked to a Usage as shown in the Usages data structure above. All you need to get an image is the `UsageId`, `FileName`, `ImageSize` and the `ImageRatio`, all of which can be found above. In the usages data structure, there is a list of the suitable image ratio and size combinations, this states whether a certain combination is available to use.

Our image CDN url is: `https://az413805.vo.msecnd.net/spaces`

The actual image url is in this format: 
`<CDN Url>/<ImageRatio>-<ImageSize>/<UsageId>/<FileName>`

For example:

`https://az413805.vo.msecnd.net/spaces/oc-rxl/11271/ih34ukdsn42.jpg`

`https://az413805.vo.msecnd.net/spaces` - This is the CDN Url

`oc-rxl` - This is the Image Ratio and the Image Size

`11271` - This is the Usage Id

`ih34ukdsn42.jpg` - This is the File Name (This can be found in the Usages data structure `UsageImages > Name`)

# Support/Contact

Will and Tom will be walking around Hack Kings in Hire Space t-shirts, come find us anytime, we'll always be availble for technical support, working at Hire Space and general chit chat. 

Or you can find us in our public tlk.io channel: https://tlk.io/hirespace

Or by email at:

thomas@hirespace.com

will@hirespace.com
