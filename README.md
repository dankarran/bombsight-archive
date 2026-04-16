# Bomb Sight - Mapping the World War 2 London Blitz Bomb Census

Static archive of the Bomb Sight project.

## About the project

The Bomb Sight project is mapping the London WW2 bomb census between 7/10/1940 and 06/06/1941. Previously available only by viewing in the Reading Room at The National Archives, Bomb Sight is making the maps available to citizen researchers, academics and students. They will be able to explore where the bombs fell and to discover memories and photographs from the period.

## Website access

| Label       | URL                                                       |
|-------------|-----------------------------------------------------------|
| Original    | https://bombsight.org                                     |
| Temporary   | http://bombsight-web.s3-website-eu-west-1.amazonaws.com   |

### Remaining issues

* AddThis needs removing/updating
* Google Ads needs updating
* Mapping
  * Nominatim geocoder needs to be replaced
  * Geoserver needs restarting/replacing
  * Error from `http://dev.virtualearth.net/REST/v1/Imagery/Metadata/AerialWithLabels?include=ImageryProviders&jsonp=_bing_metadata_1&key=[...]`
    `Got metadataThe request was forbidden.  Your credentials may be denied or suspended.`
  * CartoDB to be replaced

## Terms of use

All material on this website and the mobile App is made available free of charge for non-commercial individual, academic and research use only.

All material on this website and the mobile App is not  intended for any commercial or legal activities.

Commercial exploitation of the maps, datasets, and background material provided on this website, whether in their original form or in maps of data created on this site, is prohibited.

* For the original Bomb Census Maps both weekly and aggregate, permission is required from The National Archives, London, England.
* For the 24 hours of the 7th September permission is required from the Guardian
* For the Imperial War Museum images – permission is required from the Imperial War Museum
* For the BBC history WW2 memories, permission is required as appropriate from the original contributor of the story.
* For the bomb site locations dataset permission is required from the project via the University of Portsmouth
* For the Defence of Britain dataset, permission is required from the Council of British Archaeology.

## Disclaimer

The Bomb Sight Project gives no warranty to the accuracy, completeness or fitness for purpose of the information provided. Commercial exploitation of the images, maps, datasets, and background material provided on this website is prohibited. Material should be used only for purposes of non-commercial research, private study or education.
The Bomb Sight project was funded as part of JISC's Content Programme 2011-13


## Dev notes

### Archival using wget

`wget` can be used to retrieve all the pages from the original site and rewrite the URLs for local use, though it will still require a little manual fixing.

```
wget -rH -Dbombsight.org,static.prod.bombsight.org,static.prod.bombsight.org -l 5 -p --convert-links -i seed-urls.txt
```
