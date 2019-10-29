import axios from 'axios';


export default axios.create({
    baseURL: 'https://dev-api.codeforkc.org/'
});

///******Information from first city API */
// added: "2015-08-15 01:47:42.536359"
// address_id: 44110
// census_block_2010_id: "1006"
// census_block_2010_name: "Block 1006"
// census_county_id: "095"
// census_county_state_id: "29"
// census_latitude: "39.062855"
// census_longitude: "-94.578735"
// census_metro_area: "Kansas City, MO-KS"
// census_tiger_line_id: "91447702"
// census_track_id: "017800"
// census_track_name: "Census Tract 178"
// census_zip: "64109"
// changed: "2016-07-08 03:22:07.243492"
// city: "KANSAS CITY"
// city_classification: "R-5"
// city_council_district: "4"
// city_id: 131784
// city_land_bank_property: 0
// city_land_use: "Residential"
// city_land_use_code: "1122 - Duplex"
// city_neighborhood_census: "Central Hyde Park (77)"
// city_nhood: "Central Hyde Park"
// city_nighborhood: "Central Hyde Park"
// city_police_division: null
// city_sub_class: "R2a"
// city_tif: null
// city_vacant_parcel: 0
// county_assessed_improvement: "39620"
// county_assessed_land: "3980"
// county_assessed_value: "43600"
// county_book_number: null
// county_cid: null
// county_common_area: null
// county_complex_name: null
// county_conveyance_area: null
// county_conveyance_designator: null
// county_delinquent_tax_2010: "0.00"
// county_delinquent_tax_2011: "0.00"
// county_delinquent_tax_2012: "0.00"
// county_delinquent_tax_2013: "0.00"
// county_delinquent_tax_2014: "0.00"
// county_delinquent_tax_2015: "0.00"
// county_delinquent_tax_2016: "0.00"
// county_delinquent_tax_2017: "0.00"
// county_delinquent_tax_2018: "0.00"
// county_document_number: null
// county_eff_from_date: "1980-01-01T00:00:00.000Z"
// county_eff_to_date: "1753-01-01T00:00:00.000Z"
// county_exempt: "N"
// county_extract_date: "2015-09-17T13:30:42.000Z"
// county_floor_designator: null
// county_floor_name_designator: null
// county_id: "JA30210071200000000"
// county_land_use_code: "1152"
// county_legal_description: null
// county_market_value: "229472"
// county_mtg_co: null
// county_mtg_co_address: null
// county_mtg_co_city: null
// county_mtg_co_state: null
// county_mtg_co_zip: null
// county_name: "30-210-07-12-00-0-00-000"
// county_neighborhood_code: "1186"
// county_object_id: "122268"
// county_owner: "A & F REAL ESTATE LLC"
// county_owner_address: "7 JANSSEN PL"
// county_owner_city: "KANSAS CITY"
// county_owner_state: "MO"
// county_owner_zip: "64109"
// county_page_number: null
// county_parcel_number: "30-210-07-12-00-0-00-000"
// county_pca_code: "1011"
// county_property_area: "8139.909999999999854"
// county_property_picture: "http://maps.jacksongov.org/AscendPics/AdditionalPics_2013/Tagged/30-210-07-12-00-0-00-000_2013__1.jpg"
// county_property_report: "http://maps.jacksongov.org/PropertyReport/PropertyReport.cfm?pid=30-210-07-12-00-0-00-000"
// county_shape_st_area: "8139.909690999999839"
// county_shape_st_area_1: "8139.909690999999839"
// county_shape_st_area_2: "402.774328000000025"
// county_shape_st_legnth_2: "402.774328000000025"
// county_shape_st_lenght: "402.774328000000025"
// county_shape_st_length_1: "8139.909690999999839"
// county_sim_con_div_type: null
// county_situs_address: "3534 CHERRY ST"
// county_situs_city: "KANSAS CITY"
// county_situs_state: "MO"
// county_situs_zip: "64109"
// county_stated_area: "0.1869 a"
// county_tax_year: "2015"
// county_taxable_value: "43600"
// county_tca_code: "001"
// county_tif_district: "Midtown Redevelopment TIF 09"
// county_tif_project: null
// county_tot_sqf_l_area: "4232"
// county_type: "7"
// county_year_built: "1921"
// county_z_designator: null
// id: 44110
// internal: null
//***********Here is Lat and Long we could use that to find things that the user is close to (?)********** */
// latitude: "39.0620968499"
// longitude: "-94.5790845026"
// post_direction: null
// pre_direction: null
// single_line_address: "3534 CHERRY ST, KANSAS CITY, MO"
// state: "MO"
// street_address: "3534 CHERRY ST"
// street_name: "CHERRY"
// street_number: "3534"
// street_type: "ST"
// zip: "64109"
// zip4: ""


//******Information from the second city API***** */
// AREA_SQ_FT: 8133.72961806
// BULKYDAY: "1st & 4th Monday"
// COUNCILDISTRICT: "4"
// COUNTY: "Jackson"
// DD_X: -94.57909441
// DD_Y: 39.06210433
// EDC: "West"
// IMPACTFEEZONE: "EXEMPT"
// INSPECTIONAREA: "77"
// KIVA_PIN: "131784"
// MAINTENANCE_DIST_PW: "D2"
// NEIGHBORHOODCENSUS: "Central Hyde Park"
// NEIGHBORHOODCENSUS_ID: "77"
// OBJECTID: 131784
// PARKREGION: "Central"
// POLICEDIVISION: "Central"
// RA_TWN_SEC: "s334920"
// RIVER: null
// SCHOOLDISTRICT: "KANSAS CITY MISSOURI 110"
// SOLIDWASTECOLLECTIONZONE: "Central"
// SP_X: 2766250.1496
// SP_Y: 1054284.45
// SUBDIVISION: "KENWOOD"
// TRASHDAY: "Monday"
// TRASHPROVIDER: "City"
// WSINSPECTORROUTE: "4"
// WSMETERREADROUTE: "9"
// ZIP: "64109"
// ZONING: "R-5"
































