The motivation 
================
To monitor real estate market in specific areas.
With this script you can see which properties are selling fast, and which properties stay on the market longer than others.
You can get insight into keywords. 



how to use this script:
=======================

* browse realtor.ca, run search for properties, using map mode.
* zoom in to specific area, make sure that you have less than 50 pages.
* open chrome developers tools
* switch to network tab
* select api call to api2.realtor.ca/Listing.svc/PropertySearch_Post
* right-click on it and choose "copy as curl"
* open terminal (or command prompt)
* type node main.js <paste your curl string from previous step> 1 50 <output dir of your choice> 

The end result should look something like this:

<pre><code>
    node main.js curl 'https://api2.realtor.ca/Listing.svc/PropertySearch_Post' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://www.realtor.ca/map' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'Origin: https://www.realtor.ca' -H 'DNT: 1' -H 'Connection: keep-alive' --data 'ZoomLevel=11&LatitudeMax=43.6579334&LongitudeMax=-79.4340402&LatitudeMin=43.4588965&LongitudeMin=-80.1433450&CurrentPage=1&RecordsPerPage=12&PropertyTypeGroupID=1&PropertySearchTypeId=1&TransactionTypeId=2&PriceMin=200000&PriceMax=550000&BedRange=1-0&BathRange=1-0&ApplicationId=1&CultureId=1&Version=7.0' 1 50 .
</pre></code>

***

After you run the above script, you should see the new file in the output directory. You may want to save the above command as shell script and run it, say, once in 3 days.
 
This script can download up to 50 pages of MLS listings. This is because of realtor.ca API limit, they don't allow more than 50 calls.
This works fine though if you want to monitor specific area. 
Remember, you have to use map mode, it allows to zoom in to specific area.


 
 
 


