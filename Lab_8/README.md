CS-546 Lab 8
Template Time
For this lab, you will create a Ticketmaster API application that will be using HTML, CSS, and Handlebars to make your first simple templated web application!

You will not need to use a database for this lab. 

You must use the async/await keywords. You will also be using axios (Links to an external site.), which is a HTTP client for Node.js; you can install it with npm i axios. 

Your application will be making Axios calls to the Ticketmaster API for data.

You will be utilizing the Ticket Master Discovery APILinks to an external site. for data. 

The base URL is https://app.ticketmaster.com/discovery/v2/

You will have to register a free account and get your own individual API key. After receiving the api key, you would insert the key into the url that you requested with axios. 

In addition, when querying venues for any of your routes, you should filter the data to only be results found in the US. You can do this with the ‘countryCode’ url param. 

 So for example, if you were querying all venues, the url should be 

https://app.ticketmaster.com/discovery/v2/venues?apikey=${API_KEY}&countryCode=US

The full authorization documentation can be found hereLinks to an external site. 

You can play with the API and different parameters hereLinks to an external site.

You will be using the following endpoints from the API:

The endpoint to search venues:

https://app.ticketmaster.com/discovery/v2/venues?keyword=${searchVenueTerm}&apikey=${API_KEY_HERE}&countryCode=US

The endpoint for a single venue by id:

https://app.ticketmaster.com/discovery/v2/venues/VENUE_ID_HERE?&apikey=${API_KEY_HERE}&countryCode=US

YOU MUST use the directory and file structure in the code stub or points will be deducted. You can download the starter template here: Lab8_Stub.zipDownload Lab8_Stub.zip

PLEASE NOTE: THE STUB DOES NOT INCLUDE THE PACKAGE.JSON FILE. YOU WILL NEED TO CREATE IT! DO NOT ADD ANY OTHER FILE OR FOLDER APART FROM PACKAGE.JSON FILE. DO NOT FORGET THE START COMMAND OR THE "type": "module" property

You will be making three pages/routes in your application:

http://localhost:3000/ the main page/route of this application will provide a search form to start a search of the API.
http://localhost:3000/searchvenues this page/route will search through the API  using a keyword search (see the API documentation) and return up to 10 matching results, the keyword comes from the provided request form param, searchVenueTerm
http://localhost:3000/venuedetails/:id this page/route will show all the details of the venue with the id matching the provided URL param, id
All other URLS should return a 404

GET http://localhost:3000/
This page will respond with a valid HTML document. The title of the document should be "Venue Finder". You should have the title set as the <title> element of the HTML document and as an h1 in your document.

Your page should reference a CSS file, /public/css/main-styles.css; this file should have at least 5 rulesets that apply to this page; these 5 rules can also apply to elements across all of your pages, or be unique to this page.

You should have a main element, and inside of the main element have a p element with a brief (2-3 sentence description) of what your website does.

Also inside the main element, you will have a form; this form will POST to the /searchvenues route. This form will have an input and a label; the label should properly reference the same id as the input using the for attribute. You should also have an input with a type of submit that submits the form. The input in your form should have a name of searchVenueTerm.

POST http://localhost:3000/searchvenues
This page will respond with a valid HTML document. The title of the document should be "Venues Found". You should have the title set as the <title> element of the HTML document and as an h1 in your document. In an h2 element, you will print the supplied searchVenueTerm.

Your page should reference a CSS file, /public/css/main-styles.css; this file should have at least 5 rulesets that apply to this page; these 5 rules can also apply to elements on /, or be unique to this page.

You should have a main element, and inside of the main element have a ol tag that has a list of up to 10 venues (the first 10 that appear in the search result array) matching the searchVenueTerm found in the request body in the following format (after searching Madison).

<ol>
   <li>
      <a href="/venuedetails/KovZpZA7AAEA">Madison Square Garden</a> </li> 
 <li> 
 <a href="/venuedetails/KovZpZAa1anA">Madison Theatre</a> 
 </li> 
 <li> 
 <a href="/venuedetails/KovZpZAE7EAA">Madison Live!</a> 
 </li> 
 <li> 
 <a href="/venuedetails/KovZ917APhp">Madison Center for the Arts</a> 
 </li> 
 <li> 
 <a href="/venuedetails/KovZpZA7kvlA">The Theatre at MSG</a> 
 </li> 
 <li> 
 <a href="/venuedetails/KovZpabkQe">Madison Theatre</a> 
 </li> 
 <li> 
 <a href="/venuedetails/KovZ917AtKH">Madison County Fairgrounds</a> 
 </li>
<li> 
<a href="/venuedetails/KovZpZAE6lvA">Madison Street Theatre</a> 
</li>
<li> 
<a href="/venuedetails/KovZpZAIIIkA">Madison Square Park</a> 
</li>
<li> 
<a href="/venuedetails/Z1lMVSyiJynZad9jvPa7vo">madison square garden</a> 
</li>
</ol>
You must also provide an a tag that links back to your / route with the text Make another search.

If no matches are found, you will print the following HTML paragraph:

<p class="not-found">We're sorry, but no results were found for {{searchVenueTerm}}.</p>
If the user does not input text into their form, make sure to give a response status code of 400 on the page, and render an HTML page with a paragraph class called error; this paragraph should describe the error.

GET http://localhost:3000/venuedetails/:id
This page will respond with a valid HTML document. The title of the document should be "Venue Details". You should have the title set as the <title> element of the HTML document and as an h1 in your document inside a header element . 

Your page should reference a CSS file, /public/css/main-styles.css; this file should have at least 5 rulesets that apply to this page; these 5 rules can also apply to elements on /, or be unique to this page.

You should have a main element, and inside of the main element have a div tag, inside the div tag you have the following children elements:  In an h2 element, you will display the name of the venue, an img element that contains the image of the venue, you will set the source of the img to be the url for the venue image contained in the data(shown below in the images array) and set the alt attribute to the venue name (as shown below in sample HTML), an a element that will link to the venue's website in a new tab with the text "Venue Information on Ticketmaster", an address element that contains the text "Address:" and then display the address, the city, state, and postal code for that venue (in the data, these are the address.line1, city.name, state.stateCode and postalCode fields), and finally another address element  that contains the text "Phone:" and then display the venue's phone number field (boxOfficeInfo.phoneNumberDetail field in the data).  IF ANY OF THIS DATA IS MISSING FROM THE API, YOU WILL DISPLAY "N/A" FOR THE FIELDS THAT DO NOT HAVE DATA, IF THERE IS NO IMAGE FOR A VENUE, USE A "NO PHOTO" DEFAULT IMAGE (I have supplied one in the /public/images directory in the code stub)

Matching Venue Data:

{
  "name": "Madison Square Garden",
  "type": "venue",
  "id": "KovZpZA7AAEA",
  "test": false,
  "url": "https://www.ticketmaster.com/madison-square-garden-tickets-new-york/venue/483329
Links to an external site.",
  "locale": "en-us",
  "aliases": [
    "msg",
    "madison square garden"
  ],
  "images": [
    {
      "ratio": "16_9",
      "url": "https://s1.ticketm.net/dbimages/15646v.jpg
Links to an external site.",
      "width": 205,
      "height": 115,
      "fallback": false
    }
  ],
  "postalCode": "10001",
  "timezone": "America/New_York",
  "city": {
    "name": "New York"
  },
  "state": {
    "name": "New York",
    "stateCode": "NY"
  },
  "country": {
    "name": "United States Of America",
    "countryCode": "US"
  },
  "address": {
    "line1": "7th Ave & 32nd Street"
  },
  "location": {
    "longitude": "-73.9916006",
    "latitude": "40.7497062"
  },
  "markets": [
    {
      "name": "New York/Tri-State Area",
      "id": "35"
    },
    {
      "name": "All of US",
      "id": "51"
    },
    {
      "name": "Northern New Jersey",
      "id": "55"
    },
    {
      "name": "Connecticut",
      "id": "124"
    }
  ],
  "dmas": [
    {
      "id": 200
    },
    {
      "id": 296
    },
    {
      "id": 345
    },
    {
      "id": 422
    }
  ],
  "social": {
    "twitter": {
      "handle": "@TheGarden"
    }
  },
  "boxOfficeInfo": {
    "phoneNumberDetail": "General Info: (212) 465-MSG1 (6741) or (212) 247-4777 Knicks Information: 1(877) NYK-DUNK. Rangers Fan Line: (212) 465-4459. Liberty Hotline: (212) 564-WNBA (9622). Season Subscriptions: (212) 465-6073. Disabled Services: (212) 465-6034 Guest Relations: (212) 465 - 6225 Group Sales: (212) 465-6100 Lost and Found: (212) 465-6299",
    "openHoursDetail": "Monday - Saturday: 10:00am to 6:00pm **Tickets are not on-sale at the Box Office on the first day an event goes on-sale** The Box Office will be open at 10:00am daily or 90 minutes before the 1st performance of the day, whichever is earlier and will stay open until 8:00pm or 30 minutes after the last performance of the day begins, whichever is later. Sunday – Closed If an event takes place on Sunday, Box Office will open 90 minutes before the event start time and remain open 1 hour after event start time for Will Call and tickets sales for the evening's event only.",
    "acceptedPaymentDetail": "Cash, American Express, Visa, MasterCard, Discover. ATM machines are located in Chase Square.",
    "willCallDetail": "Pick-up tickets anytime the day of the show during box office hours (see above). Customers must present the actual credit card used to place the order and a picture ID. MSG cannot accept third party or “drop offs” from individual patrons."
  },
  "parkingDetail": "Prepaid advance parking is available for select events through Ticketmaster or via a link on www.thegarden.com. Madison Square Garden does not own or operate any parking facility.",
  "accessibleSeatingDetail": "MSG WHEELCHAIR AND TRANSFER SEATING POLICY: Wheelchair and Transfer seating is reserved exclusively for patrons with accessible needs and their companions. Accessible seating is intended for use by an individual with a mobility disability or other disability who requires the accessible features of accessible seating due to a disability, and that individual's companions. Madison Square Garden (MSG) reserves the right to investigate potential misuse of accessible seating and to take all appropriate action against individuals who fraudulently obtain tickets for accessible seating. While tickets for accessible seating legitimately purchased for the use of an individual with disability may be transferred to another individual under the same terms and conditions applicable to other tickets, in the event such ticket is transferred to a non-disabled individual, MSG reserves the right to transfer that individual to other available seating TO ORDER WHEELCHAIR AND TRANSFER SEATING: Tickets for people with accessible needs, subject to availability, may be purchased in several ways: 1) Call Ticketmaster at 866-858-0008 2) Call MSG's Disabled Services Department at (212)465-6115. 3) Visit Madison Square Garden's Box Office (see box office hours above) 4) Order Online with Ticketmaster (select your event from the list to the left) For additional information regarding accessibility at Madison Square Garden or to request any other accommodations, please call MSG's Disabled Services Department at (212) 465-6115 any weekday between 9:30am-4:30pm ET. Service Animals Pets are not permitted at Madison Square Garden. MSG has very specific policies related to service and emotional support animals. Please visit www.thegarden.com to obtain more information for admitting your animal. Assistive listening devices (ALDAs) are available upon request. Please visit the Guest Experience Office across from section 117 for assistance. There is no charge for this service, however some form of identification will be requested and returned to you, once the device is checked back in. Wheelchair Storage: For patrons who wish to transfer to a seat from their wheelchair, we will store your mobility device at the Guest Experience Office. You will receive a claim check for your device. Wheelchair Escorts to Seats: Patrons with mobility impairments who do not have access to a wheelchair may request a wheelchair to transport the individual to/from their seat, free of charge. Please be aware that our personnel cannot remain with you during the event, nor will they allow you to remain in or keep the wheelchair for the duration of the event. In the event a patron requires the use of a wheelchair for the duration of the event, we recommend bringing your own wheelchair or other mobility device. The escort pick-up area is located on the South (toward 31st) side of Chase Square at elevator alcove. Please allow for extra so that you may be accommodated prior to the event start. Simply ask a Guest Experience Representative or a MSG Security Guard for assistance. Elevators: Public elevators are available for use by guests with disabilities and service every seating level",
  "generalInfo": {
    "generalRule": "ARRIVE EARLY: Please arrive at least one-hour prior to event time. All patrons will go through a screening process upon entry with all packages, including briefcases and pocketbooks, being inspected prior to entry. Additionally, metal detectors may be utilized for some events. Bags that have passed inspection must fit comfortably under your seat.Please be mindful of traffic conditions, as Midtown Manhattan can be quite congested, especially during the holidays, parades, or special events. No smoking or electronic cigarettes permitted anywhere in the building No reentry. No recording devices No outside food or drink There are no bag or coat check facilities Alcohol Management: For most events at MSG, alcoholic beverages are available for purchase. MSG staff is trained in the nationally recognized T.E.A.M. (Techniques for Effective Alcohol Management) training program for responsible alcohol management. All guests will be required to show ID to purchase alcohol. Guests are not permitted to bring in alcoholic beverages from outside and may not leave with alcohol purchased inside the venue. Management reserves the right to refuse the sale of alcohol to any guest. Please be aware that it is the policy of The Madison Square Garden Company to require all guests who appear to be forty (40) years of age or younger to present a valid form of ID with proof of age in order to purchase alcoholic beverages at Madison Square Garden, Radio City Music Hall, The Beacon Theatre or The Chicago Theatre. Pursuant to applicable State law, MSG accepts only the following forms of identification: • A valid driver’s license or non-driver identification card issued by the United States Government, a State Government, Commonwealth, Possession or Territory of the United States or a Provincial Government of Canada. • A valid passport • A valid U.S. military ID International guests wishing to consume alcohol inside the building must bring a valid passport as the only form of acceptable ID.",
    "childRule": "For most events, all children who have reached their second birthday require a ticket to gain admittance to Madison Square Garden. Any child who has yet to reach their second birthday does not require a ticket, however, they may not occupy their own seat. Please note, that for certain children's events (such as the Wiggles and Sesame Street Live!), all children who have reached their first birthday require a ticket. Please check the event profile for your specific event for more information prior to your purchase of tickets."
  },
  "upcomingEvents": {
    "_total": 169,
    "ticketmaster": 169,
    "_filtered": 0
  },
  "ada": {
    "adaPhones": "Inquiries or requests concerning accessibility should be directed to the Accessible Services Department for Madison Square Garden at 888-609-7599.",
    "adaCustomCopy": "Individuals with disabilities may purchase up to three seats for companions in the wheelchair or other accessible seating areas, provided such seats are available.  Additional tickets, if available, may be purchased as close to the accessible seating areas, as long as it does not exceed the ticket limit for the event.  Please note, for events or specific seating sections where ticket sales are limited to fewer than four tickets per patron, the same ticket restrictions will apply to the purchase of accessible seating.\n\nAccessible seating is intended for use by an individual with a mobility disability or other disability who requires the accessible features of accessible seating due to a disability, and that individual's companions.  Madison Square Garden reserves the right to investigate potential misuse of accessible seating and to take all appropriate action against individuals who fraudulently obtain tickets for accessible seating.  While tickets for accessible seating legitimately purchased for the use of an individual with disability may be transferred to another individual under the same terms and conditions applicable to other tickets, in the event such ticket is transferred to a nondisabled individual, Madison Square Garden reserves the right to transfer that individual to other available seating.\n\nIf the disabled individual cannot attend an event for which he/she has purchased tickets, please contact the Madison Square Garden Disabled Services Department at 212-465-6034 prior to the event taking place for further information. \n\nTickets for individuals with accessible needs, subject to availability, may be purchased in several ways:\n\n1) Online through Ticketmaster.com\n2) By phone to the Disabled Services Department at 888-609-7599\n3) By phone to Ticketmaster at 800-745-3000\n4) In-person by visiting the Madison Square Garden Box Office\n\nAssistive Listening Devices (ALD) are available at Guest Experience locations in the Arena. \n",
    "adaHours": "For additional information regarding Access at Madison Square Garden or to discuss any other accommodations, please contact the Disabled Services Department at 888-609-7599 between the hours of 9:30am and 4:30pm, Monday - Friday. "
  },
  "_links": {
    "self": {
      "href": "/discovery/v2/venues/KovZpZA7AAEA?locale=en-us"
    }
  }
}
HTML Printed (YOU MUST MATCH THIS EXACTLY!!!!):

<div>
  <h2>Madison Square Garden</h2>
  <img alt="Madison Square Garden" src="https://s1.ticketm.net/dbimages/15646v.jpg">
  <br>
  <a target="_blank" href="https://www.ticketmaster.com/madison-square-garden-tickets-new-york/venue/483329">Venue Information on Ticketmaster</a>
  <address>Address: 7th Ave & 32nd Street, New York, NY 1001 </address>
  <address>Phone: General Info: (212) 465-MSG1 (6741) or (212) 247-4777 Knicks Information: 1(877) NYK-DUNK. Rangers Fan Line: (212) 465-4459. Liberty Hotline: (212) 564-WNBA (9622). Season Subscriptions: (212) 465-6073. Disabled Services: (212) 465-6034Guest Relations: (212) 465 - 6225 Group Sales: (212) 465-6100 Lost and Found: (212) 465-6299</address>
</div>
If the request to the Ticketmaster API using :id responds with an error, make sure to give a response status code of 404 on the page, and render an HTML page with a paragraph class called error; this paragraph should describe the error (a venue with that id does not exist). For example: https://app.ticketmaster.com/discovery/v2/venues/101?&apikey=${API_KEY}&countryCode=USLinks to an external site.  responds with an error because it does not exist, so you would respond with a 404 and a message stating that.

http://localhost:3000/public/css/main-styles.css
This file should have 5 rulesets that apply to the / route, and 5 rulesets that apply to all of your pages. Rulesets may be shared across both pages; for example, if you styled a p tag, it would count as 1 of the 5 for both pages.

You may include more than 5 rulesets if you so desire.

References and Packages
Basic CSS info can easily be referenced in the MDN CSS tutorialLinks to an external site..

Hints
You can use variables in your handlebars layout, that you pass to res.render. For example, in your layout you could have:

<meta name="keywords" content="{{keywords}}" />
And in your route:

res.render("someView", {keywords: "dogs coffee keto"});
Which will render as:

<meta name="keywords" content="dogs coffee keto" />
Or, perhaps, the title tag.

Requirements
You must not submit your node_modules folder
You must remember to save your dependencies to your package.json folder
You must do basic error checking in each function
Check for arguments existing and of proper type.
Throw if anything is out of bounds (ie, trying to perform an incalculable math operation or accessing data that does not exist)
If a function should return a promise, instead of throwing you should return a rejected promise.
You must remember to update your package.json file to set app.js as your starting script!
Your HTML must be validLinks to an external site. or you will lose points on the assignment.
Your HTML must make semantical sense; usage of tags for the purpose of simply changing the style of elements (such as i, b, font, center, etc) will result in points being deducted; think in terms of content first, then style with your CSS.
You can be as creative as you'd like to fulfill front-end requirements; if an implementation is not explicitly stated, however you go about it is fine (provided the HTML is valid and semantical). Design is not a factor in this course.
All inputs must be properly labeled!
All previous requirements about the package.json author, start task, dependenices, etc. still apply
