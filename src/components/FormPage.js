import React, { useEffect, useState, useRef } from 'react';
import * as Helper from '../Helper'
import { Routes, Route, useParams, useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

function FormPage() {
    let { token } = useParams();
    const [searchParams] = useSearchParams();
   
    token = searchParams.get('token')
    const TOKEN = token

    const [tabType, setTabType] = useState("property_info")
    const [contactBlockId, setContactBlockId] = useState(0)
    const contactBlockIdRef = useRef(contactBlockId);
    const [propertyIncludesParkingAreas, setPropertyIncludesParkingAreas] = useState(false)
    const [propertyHasAHeatedSwimmingPool, setPropertyHasAHeatedSwimmingPool] = useState(false)
    const [propertyHas1OrMoreRetailStoresGreater5000, setPropertyHas1OrMoreRetailStoresGreater5000] = useState(false)
    const [propertyHasOneOrMoreRestaurantsCafeterias, setPropertyHasOneOrMoreRestaurantsCafeterias] = useState(false)
    const [propertyHasNursingAssistedCareFacilities, setPropertyHasNursingAssistedCareFacilities] = useState(false)
    const [jsonData, setJsonData] = useState([])
    const [useTypes, setUseTypes] = useState([])
    const [useTypesCreated, setUseTypesCreated] = useState([])

    const [propertyNameVal, setPropertyNameVal] = useState("")
    const [streetAddressVal, setStreetAddressVal] = useState("")
    const [cityVal, setCityVal] = useState("")
    const [stateVal, setStateVal] = useState("")
    const [postalCodeVal, setPostalCodeVal] = useState("")
    const [propertyIdentifiersEnergyStarPortfolioManagerIdVal, setPropertyIdentifiersEnergyStarPortfolioManagerIdVal] = useState("")
    const [propertyIdentifiersNycBoroughVal, setPropertyIdentifiersNycBoroughVal] = useState("")
    const [propertyIdentifiersNycBlockVal, setPropertyIdentifiersNycBlockVal] = useState("")
    const [propertyIdentifiersNycLotVal, setPropertyIdentifiersNycLotVal] = useState("")
    const [propertyIdentifiersNycBinsVal, setPropertyIdentifiersNycBinsVal] = useState("")
    const [propertyIdentifiersExternalIdVal, setPropertyIdentifiersExternalIdVal] = useState("")
    const [propertyDetailsGrossFloorAreaVal, setPropertyDetailsGrossFloorAreaVal] = useState("")
    const [propertyDetailsCurrentOccupancyPercentVal, setPropertyDetailsCurrentOccupancyPercentVal] = useState("")
    const [propertyDetailsConstructionStatusVal, setPropertyDetailsConstructionStatusVal] = useState("")
    const [propertyDetailsYearBuiltVal, setPropertyDetailsYearBuiltVal] = useState("")
    const [propertyDetailsPropertyIncludesParkingAreasVal, setPropertyDetailsPropertyIncludesParkingAreasVal] = useState("")
    const [propertyDetailsPropertyHasAHeatedSwimmingPoolVal, setPropertyDetailsPropertyHasAHeatedSwimmingPoolVal] = useState("")
    const [propertyDetailsPropertyDetailsPropertyHas1OrMoreRetailStoresVal, setPropertyDetailsPropertyDetailsPropertyHas1OrMoreRetailStoresVal] = useState("")
    const [propertyDetailsNumberOfIndividualStoresVal, setPropertyDetailsNumberOfIndividualStoresVal] = useState("")
    const [propertyHasOneOrMoreRestaurantsVal, setPropertyHasOneOrMoreRestaurantsVal] = useState("")
    const [propertyDetailsPropertyHasNursingVal, setPropertyDetailsPropertyHasNursingVal] = useState("")
    const [propertyDetailsPercentageOfUnitsVal, setPropertyDetailsPercentageOfUnitsVal] = useState("")
    const [availableEnergySourcesElectricityVal, setAvailableEnergySourcesElectricityVal] = useState("")
    const [availableEnergySourcesNaturalGasVal, setAvailableEnergySourcesNaturalGasVal] = useState("")
    const [availableEnergySourcesNaturalGasProviderVal, setAvailableEnergySourcesNaturalGasProviderVal] = useState("")
    const [availableEnergySourcesFuelOilVal, setAvailableEnergySourcesFuelOilVal] = useState("")
    const [utilityAccountInformationElectricAccountNumberVal, setUtilityAccountInformationElectricAccountNumberVal] = useState("")
    const [utilityAccountInformationNaturalGasAccountNumberVal, setUtilityAccountInformationNaturalGasAccountNumberVal] = useState("")
    const [usetypeCreatedHtml, setUsetypeCreatedHtml] = useState([])

    const [contactHtml, setContactHtml] = useState("")
    const [prefillData, setPrefillData] = useState({})
    const prefillDataRef = useRef(prefillData);

    const jsonDataRef = useRef(jsonData);
    const useTypesRef = useRef(useTypes);
    const WEBHOOK_URL = 'https://webhook.site/351e7131-966f-4a13-b7e8-0dd6f7dfc6f3'
    const JSON_FILE = './json/data.json'
    const JSON_PRE_FILL_FILE = './json/pre-fill-data.json'
    const MAPPING_JSON_FILE = [
        './json/mapping_1.json',
        './json/mapping_2.json',
        './json/mapping_3.json',
        './json/mapping_4.json',
    ]
    const DEV_MODE = false

    const usState = Helper.getUsStates()

    useEffect(() => {
        contactBlockIdRef.current = contactBlockId;
        jsonDataRef.current = jsonData;
        useTypesRef.current = useTypes;
        prefillDataRef.current = prefillData;

    }, [contactBlockId, jsonData, useTypes, prefillData]);

    useEffect( async() => {
        // TODO: For DEV
        let result = {}
        
        if (DEV_MODE == true){
            result = await loadJsonData(JSON_PRE_FILL_FILE)
        }else{
            result = await getPrefillData(TOKEN)
            if (result?.success === false){
                result = {}
            }
        }

        if (result){
            setPrefillData(result)
            prefillDataRef.current = result
        }

        document.addEventListener('click', function (event) {
            let el = event.target;
            let is_el = el.classList.contains('snap-next') || el.classList.contains('snap-prev');

            if (!is_el) {
                el = event.target.closest('.snap-next') || event.target.closest('.snap-prev');
                if (el) {
                    is_el = true;
                }
            }

            if (is_el) {
                const snapp_slide = el.closest('.snap-slide')
                const snap_scroller = snapp_slide.querySelector('.snap-scroller');
                const snap_item_size = snap_scroller.querySelector('div').clientWidth;

                if (el.classList.contains('snap-next')) {
                    scrollToNextPage();
                }

                if (el.classList.contains('snap-prev')) {
                    scrollToPrevPage();
                }

                function scrollToNextPage() {
                    snap_scroller.scrollBy(snap_item_size, 0);
                    snapp_slide.querySelector('.snap-prev').classList.remove("hidden")
                    snapp_slide.querySelector('.snap-prev').classList.add("active")
                }
                function scrollToPrevPage() {
                    snap_scroller.scrollBy(-snap_item_size, 0);
                    snapp_slide.querySelector('.snap-next').classList.remove("hidden")
                    snapp_slide.querySelector('.snap-next').classList.add("active")
                }
            }
        })

        const snap_scrollers = document.querySelectorAll('.snap-scroller')
        for (const key in snap_scrollers) {
            if (!snap_scrollers[key] || typeof snap_scrollers[key] !== 'object') {
                continue;
            }

            snap_scrollers[key].addEventListener('scroll', function (e) {
                const snapp_slide = e.target.closest('.snap-slide')
                if (e.target.scrollLeft % e.target.offsetWidth === 0) {
                    snapp_slide.querySelector('.snap-prev').classList.add("hidden")
                    snapp_slide.querySelector('.snap-prev').classList.remove("active")
                } else {
                    snapp_slide.querySelector('.snap-prev').classList.remove("hidden")
                    snapp_slide.querySelector('.snap-prev').classList.add("active")
                }

                let scrollWidth = document.querySelector('.snap-scroller').scrollWidth
                if (scrollWidth === (e.target.scrollLeft + e.target.offsetWidth)) {
                    snapp_slide.querySelector('.snap-next').classList.add("hidden")
                    snapp_slide.querySelector('.snap-next').classList.remove("active")
                } else {
                    snapp_slide.querySelector('.snap-next').classList.remove("hidden")
                    snapp_slide.querySelector('.snap-next').classList.add("active")
                }
            });
        }

        //Collapse block
        document.addEventListener('click', function (event) {
            let el = event.target
            let is_el = el.classList.contains('.collapse-title');

            if (!is_el) {
                el = event.target.closest('.collapse-title');
                if (el) {
                    is_el = true;
                }
            }

            if (is_el) {
                const parent = el.closest('.block-collapse-wrap')
                el.querySelector('img').classList.toggle('rotate-180')

                parent.querySelectorAll('.block-collapsed').forEach(element => {
                    element.classList.toggle('hidden')
                });
            }
        })

        document.addEventListener('click', function (event) {
            let el = event.target
            let is_el = el.classList.contains('.header-collapse');

            if (!is_el) {
                el = event.target.closest('.header-collapse');
                if (el) {
                    is_el = true;
                }
            }

            if (is_el) {
                const parent = el.parentElement
                el.querySelector('svg').classList.toggle('rotate-180')

                parent.querySelectorAll('.body-collapse').forEach(element => {
                    element.classList.toggle('hidden')
                });
            }
        })

        // Table toggle child
        document.addEventListener('click', function (event) {

            let el = event.target
            let is_el = el.classList.contains('.toggle-child');

            if (!is_el) {
                el = event.target.closest('.toggle-child');
                if (el) {
                    is_el = true;
                }
            }

            if (is_el) {
                const tr_parent = el.closest('tr.has-child');
                const table_parent = el.closest('table');
                let data_child = tr_parent.getAttribute("data-child");

                const child = table_parent.querySelector('tr.child[data-child="' + data_child + '"]');
                child.classList.toggle('hidden');
            }
        })

        // Func
        function insertAfter(newNode, existingNode) {
            existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
        }

        //Add contact
        document.addEventListener('click', function (event) {

            let el = event.target
            let is_el = el.classList.contains('.btn-add-contact');

            if (!is_el) {
                el = event.target.closest('.btn-add-contact');
                if (el) {
                    is_el = true;
                }
            }

            if (is_el) {
                event.preventDefault();
                const parent = el.closest('.contact-form-wrap')
                let parent_clone = parent.cloneNode(true)
                let parent_id = parent_clone.getAttribute('data-id')

                const contact_form_frap = document.querySelectorAll('.contact-form-wrap');
                contact_form_frap.forEach(function (element) {
                    element.querySelector('.btn-remove-contact').classList.remove('hidden')
                    element.querySelector('.btn-add-contact').classList.add('hidden')
                });

                //Reset all field before
                let incr = contactBlockIdRef.current + 1
                setContactBlockId(incr)
                parent_clone.setAttribute('data-id', incr)
                parent_clone.querySelectorAll('input, select, textarea').forEach(function (input) {
                    input.value = ''
                    input.name = input.name.replace(`contact[${parent_id}]`, `contact[${incr}]`)
                })

                parent_clone.querySelector('.btn-remove-contact').classList.remove('hidden')
                parent_clone.querySelector('.btn-add-contact').classList.remove('hidden')

                insertAfter(parent_clone, parent)
            }
        })

        //Delete contact
        document.addEventListener('click', function (event) {

            let el = event.target
            let is_remove_contact_btn = el.classList.contains('.btn-remove-contact');

            if (!is_remove_contact_btn) {
                el = event.target.closest('.btn-remove-contact');
                if (el) {
                    is_remove_contact_btn = true;
                }
            }

            if (is_remove_contact_btn) {
                event.preventDefault();
                const parent = el.closest('.contact-form-wrap')
                const parent_clone = parent.cloneNode(true)

                const contact_form_frap = document.querySelectorAll('.contact-form-wrap');

                //Remove
                if (contact_form_frap.length > 1) {
                    parent.remove()
                }

                if (contact_form_frap.length == 2) {
                    contact_form_frap.forEach(function (element) {
                        element.querySelector('.btn-remove-contact').classList.remove('hidden')
                        element.querySelector('.btn-add-contact').classList.remove('hidden')
                    });
                }
            }
        })
        

        //Delete UseType
        document.addEventListener('click', function (event) {
            let el = event.target
            let is_remove_usetype_btn = el.classList.contains('.btn-remove-usetype');

            if (!is_remove_usetype_btn) {
                el = event.target.closest('.btn-remove-usetype');
                if (el) {
                    is_remove_usetype_btn = true;
                }
            }

            if (is_remove_usetype_btn) {
                event.preventDefault()
                const parent = el.closest('.block-collapse-wrap')

                //Remove
                if (parent) {
                    parent.remove()
                    
                    const selected_usetype = el.getAttribute('data-usetype')
                    let list_relationship_id = el.getAttribute('data-list_relationship_id')
                    console.log(list_relationship_id)
                    if (selected_usetype){
                        
                        const index = useTypesCreated.indexOf(selected_usetype);
                        if (index > -1) {
                            useTypesCreated.splice(index, 1);
                        }

                        if (list_relationship_id && typeof list_relationship_id == 'string'){
                            list_relationship_id = list_relationship_id.split(',')
                            let property_data_items = prefillDataRef?.current?.property_data?.items
                            if (Array.isArray(property_data_items) && property_data_items.length > 0 && list_relationship_id.length > 0){
                                property_data_items = property_data_items.filter(function(item){
                                    let id = item.id
                                    let parent_id = item.parent_id
                                    if (!list_relationship_id.includes(id) && !list_relationship_id.includes(parent_id)){
                                        return true
                                    }
                                })
                            }

                            if (typeof prefillDataRef?.current?.property_data?.items == 'object'){
                                prefillDataRef.current.property_data.items = property_data_items

                                setPrefillData(prefillDataRef.current)
                            }
                        }
                    }

                }

            }
        })

        async function loadPropertyUseTypes(params) {
            let usetypes_cache = localStorage.getItem('usetypes_cache')
            if (usetypes_cache){
                let usetypes = JSON.parse(usetypes_cache)
                setUseTypes(usetypes)
                useTypesRef.current = usetypes
                // prefillUsetypes()
                prefillUsetypesByAPI()

                document.getElementById("usetypes").removeAttribute('disabled')
                let elements = document.getElementsByClassName('spinner');
                while(elements.length > 0) {
                    elements[0].parentNode.removeChild(elements[0]);
                }
                return    
            }

            let list_mapped_use_types = []
            for (const map_item in MAPPING_JSON_FILE){
                if (list_mapped_use_types.length > 0) break
                let result = await loadJsonData(MAPPING_JSON_FILE[map_item])
                let items = result.items
                let list_usetypes = []
                if (Array.isArray(items) && items.length > 0){
                    for (const key in items){
                        const item = items[key]

                        const mapping_id = item['mapping_id']
                        if (mapping_id === 'property_use_type'){
                            list_usetypes = item['options']['response_set']['responses']
                            list_mapped_use_types = list_usetypes
                            break
                        }
                    }
                }
            }
            
            const result = await getDataJson()
            let mel = result?.Body?.payload?.mel
            let mel_merge = []
            let usetypes = {}
            for (const buildingId in mel) {
                if (mel.hasOwnProperty(buildingId) && Array.isArray(mel[buildingId])) {
                    mel_merge = mel_merge.concat(mel[buildingId])
                }
            }

            if (Array.isArray(mel_merge) && mel_merge.length > 0){
                for (const mel_item in mel_merge){
                    let attributes = mel_merge[mel_item]?.attributes
                    let property_use_type = attributes?.property_use_type
                    if (property_use_type && typeof attributes == 'object'){
                        let questions = []
                        let selected_id = false

                        if (Array.isArray(list_mapped_use_types) && list_mapped_use_types.length > 0){
                            for (const mapped_item in list_mapped_use_types){
                                if (selected_id) break

                                const mapped_item_id = list_mapped_use_types[mapped_item]?.id
                                const mapped_item_label = list_mapped_use_types[mapped_item]?.label
                                if (property_use_type === mapped_item_label && mapped_item_id){
                                    for (const map_item in MAPPING_JSON_FILE){
                                        // if (list_mapped_use_types.length > 0) break
                                        let result = await loadJsonData(MAPPING_JSON_FILE[map_item])
                                        let items = result.items
                                        let list_usetypes = []
                                        if (Array.isArray(items) && items.length > 0){
                                            for (const key in items){
                                                const item = items[key]
                                                const options_condition = item?.options?.condition
                                                const options_values = item?.options?.values
                                                
                                                if (options_condition === 'is_selected' && Array.isArray(options_values)){
                                                    if (options_values.includes(mapped_item_id)){
                                                        selected_id = item?.id
                                                        break
                                                    }
                                                }
                                            }
                                        }

                                        if (selected_id) break
                                    }
                                }
                            }
                        }

                        if (selected_id){
                            for (const map_item in MAPPING_JSON_FILE){
                                // if (list_mapped_use_types.length > 0) break
                                let result = await loadJsonData(MAPPING_JSON_FILE[map_item])
                                let items = result.items
                                if (Array.isArray(items) && items.length > 0){
                                    for (const key in items){
                                        const item = items[key]
                                        const parent_id = item?.parent_id
                                        if (parent_id === selected_id){
                                            questions.push(item)
                                        }
                                    }
                                }

                                if (questions) {
                                    break
                                }
                            }
                        }

                        if (questions){
                            usetypes[property_use_type] = questions 
                        }
                    }
                }
            }
            
            if (typeof usetypes == 'object'){
                setUseTypes(usetypes)
                useTypesRef.current = usetypes

                // prefillUsetypes()
                prefillUsetypesByAPI()

                // TODO: Add cache
                let string_parse = ''
                let key = 0
                for (const usetypes_item in usetypes){
                    key += 1
                    let value_str_parse = JSON.stringify(usetypes[usetypes_item])
                    if (key === 1){
                        string_parse = `"${usetypes_item}":${value_str_parse}`
                    }else{
                        string_parse = `${string_parse},"${usetypes_item}":${value_str_parse}`
                    }
                }

                let cache_str = '{'+string_parse+'}'
                localStorage.setItem('usetypes_cache', cache_str)
                document.getElementById("usetypes").removeAttribute('disabled')
                let elements = document.getElementsByClassName('spinner');
                while(elements.length > 0) {
                    elements[0].parentNode.removeChild(elements[0]);
                }
            }
        }

        loadPropertyUseTypes()

        async function prefillFormFromAPI() {
            // const result = await getPrefillData(TOKEN)
            // let status = result?.success
            const result = prefillDataRef.current

            if (Object.keys(result).length !== 0 && result.constructor === Object){
                setPrefillData(result)
                let data_parse = result;
                // const query_string = Helper.objectToQueryString(result);
                // Helper.parseQueryString(query_string, data_parse);
                let property_details_gross_floor_area = ""
                let property_details_current_occupancy_percent = ""
                let property_details_construction_status = ""
                let property_details_year_built = ""
                let property_details_property_includes_parking_areas = ""
                let property_details_property_has_a_heated_swimming_pool = ""
                let property_details_property_details_property_has_1_or_more_retail_stores = ""
                let property_details_number_of_individual_stores = ""
                let property_has_one_or_more_restaurants = ""
                let property_details_property_has_nursing = ""
                let property_details_percentage_of_units = ""
                let data_items = data_parse?.property_data.items

                let list_fields = [
                    "gross_floor_area",
                    "current_occupancy_%",
                    "construction_status",
                    "year_built",
                    "property_includes_parking_areas",
                    "has_heated_swimming_pool",
                    "has_one_or_more_retail_stores",
                    "number_of_individual_stores",
                    "has_one_or_more_restaurants",
                    "has_nursing_assisted_care",
                    "perc_units_nursing_assisted_care"
                ]

                if (data_items && typeof data_items == 'object'){
                    for (const [key, item] of Object.entries(data_items)) {
                        let mapping_id = item?.mapping_id
                        let type = item?.type
                        let value = ""
                        if (type == "select" || type == "list" || type == "toggle"){
                            let responses = item?.responses?.selected
                            if (Array.isArray(responses)){
                                responses = responses[0]
                            }else{
                                responses = {}
                            }
                            value = responses?.label || ""
                        }else{
                            let responses = item?.responses
                            value = responses?.value
                        }
                        
                        if (mapping_id == "gross_floor_area"){
                            property_details_gross_floor_area = value
                            list_fields = list_fields.filter(item => item !== "gross_floor_area")

                        }else if (mapping_id == "current_occupancy_%"){
                            property_details_current_occupancy_percent = value
                            list_fields = list_fields.filter(item => item !== "current_occupancy_%")


                        }else if (mapping_id == "construction_status"){
                            property_details_construction_status = value
                            list_fields = list_fields.filter(item => item !== "construction_status")

                        }else if (mapping_id == "year_built"){
                            property_details_year_built = value
                            list_fields = list_fields.filter(item => item !== "year_built")

                        }else if (mapping_id == "property_includes_parking_areas"){
                            property_details_property_includes_parking_areas = value
                            list_fields = list_fields.filter(item => item !== "property_includes_parking_areas")

                        }else if (mapping_id == "has_heated_swimming_pool"){
                            property_details_property_has_a_heated_swimming_pool = value
                            list_fields = list_fields.filter(item => item !== "has_heated_swimming_pool")

                        }else if (mapping_id == "has_one_or_more_retail_stores"){
                            property_details_property_details_property_has_1_or_more_retail_stores = value
                            list_fields = list_fields.filter(item => item !== "has_one_or_more_retail_stores")

                        }else if (mapping_id == "number_of_individual_stores"){
                            property_details_number_of_individual_stores = value
                            list_fields = list_fields.filter(item => item !== "number_of_individual_stores")

                        }else if (mapping_id == "has_one_or_more_restaurants"){
                            property_has_one_or_more_restaurants = value
                            list_fields = list_fields.filter(item => item !== "has_one_or_more_restaurants")

                        }else if (mapping_id == "has_nursing_assisted_care"){
                            property_details_property_has_nursing = value
                            list_fields = list_fields.filter(item => item !== "has_nursing_assisted_care")

                        }else if (mapping_id == "perc_units_nursing_assisted_care"){
                            property_details_percentage_of_units = value
                            list_fields = list_fields.filter(item => item !== "perc_units_nursing_assisted_care")

                        }
                        
                        if (list_fields.length <= 0){
                            break
                        }
                    }
                }

                const property_name = data_parse?.name || ""
                setPropertyNameVal(property_name)

                const street_address = data_parse?.address?.street || ""
                setStreetAddressVal(street_address)

                const city = data_parse?.address?.city || ""
                setCityVal(city)

                const state = data_parse?.address?.state || ""
                setStateVal(state)

                const postal_code = data_parse?.address?.zip_code || ""
                setPostalCodeVal(postal_code)

                const property_identifiers_energy_star_portfolio_manager_id = data_parse?.espm_id || ""
                setPropertyIdentifiersEnergyStarPortfolioManagerIdVal(property_identifiers_energy_star_portfolio_manager_id)

                const property_identifiers_nyc_borough = data_parse?.borough || ""
                setPropertyIdentifiersNycBoroughVal(property_identifiers_nyc_borough)

                const property_identifiers_nyc_block = data_parse?.block || ""
                setPropertyIdentifiersNycBlockVal(property_identifiers_nyc_block)

                const property_identifiers_nyc_lot = data_parse?.lot || ""
                setPropertyIdentifiersNycLotVal(property_identifiers_nyc_lot)

                const property_identifiers_nyc_bins = data_parse?.bins || ""
                setPropertyIdentifiersNycBinsVal(property_identifiers_nyc_bins)

                const property_identifiers_external_id = data_parse?.external_id || ""
                setPropertyIdentifiersExternalIdVal(property_identifiers_external_id)

                setPropertyDetailsGrossFloorAreaVal(property_details_gross_floor_area)

                setPropertyDetailsCurrentOccupancyPercentVal(property_details_current_occupancy_percent)

                setPropertyDetailsConstructionStatusVal(property_details_construction_status)

                setPropertyDetailsYearBuiltVal(property_details_year_built)

                setPropertyDetailsPropertyIncludesParkingAreasVal(property_details_property_includes_parking_areas)

                setPropertyDetailsPropertyHasAHeatedSwimmingPoolVal(property_details_property_has_a_heated_swimming_pool)

                setPropertyDetailsPropertyDetailsPropertyHas1OrMoreRetailStoresVal(property_details_property_details_property_has_1_or_more_retail_stores)

                setPropertyDetailsNumberOfIndividualStoresVal(property_details_number_of_individual_stores)

                setPropertyHasOneOrMoreRestaurantsVal(property_has_one_or_more_restaurants)

                setPropertyDetailsPropertyHasNursingVal(property_details_property_has_nursing)

                setPropertyDetailsPercentageOfUnitsVal(property_details_percentage_of_units)

                const available_energy_sources_electricity = data_parse?.electric_data_required || ""
                setAvailableEnergySourcesElectricityVal(available_energy_sources_electricity)

                const available_energy_sources_natural_gas = data_parse?.available_energy_sources_natural_gas || ""
                setAvailableEnergySourcesNaturalGasVal(available_energy_sources_natural_gas)

                // const available_energy_sources_natural_gas_provider = data_parse?.gas_data_required || ""
                // setAvailableEnergySourcesNaturalGasProviderVal(available_energy_sources_natural_gas_provider)

                // const available_energy_sources_fuel_oil = data_parse?.oild_data_required || ""
                // setAvailableEnergySourcesFuelOilVal(available_energy_sources_fuel_oil)

                const utility_account_information_electric_account_number = data_parse?.utility_account_information_electric_account_number || ""
                setUtilityAccountInformationElectricAccountNumberVal(utility_account_information_electric_account_number)

                const utility_account_information_natural_gas_account_number = data_parse?.utility_account_information_natural_gas_account_number || ""
                setUtilityAccountInformationNaturalGasAccountNumberVal(utility_account_information_natural_gas_account_number)

                const management = data_parse?.management
                let contacts_data = [
                    {
                        "owner_first_name": management?.contact_first_name || "",
                        "owner_last_name": management?.contact_last_name || "",
                        "owner_email": management?.contact_email || "",
                    }
                ]
                builtContactHtml(contacts_data)
            }
            
        }
        prefillFormFromAPI()

        // async function prefillUsetypes() {
        //     const result = await loadJsonData(JSON_PRE_FILL_FILE)
            
        //     if (result){
        //         let data_parse = {};
        //         const query_string = Helper.objectToQueryString(result);
        //         Helper.parseQueryString(query_string, data_parse);
                
        //         const usetypes_list = data_parse?.usetype
        //         builtUseTypesHtml(usetypes_list)
        //     }
            
        // }

        async function prefillUsetypesByAPI() {
            const result = prefillDataRef.current
            if (result){
                let data_parse = result;
               
                let usetypes_list = {}
                const property_data = data_parse?.property_data?.items
                
                if (Array.isArray(property_data) && property_data.length > 0){
                    for (const [key, item] of Object.entries(property_data)) {
                        const mapping_id = item?.mapping_id
                        
                        if (mapping_id == "property_use_type"){
                            let list_relationship_id = []

                            const property_use_type_id = item?.id
                            if (!property_use_type_id){
                                continue
                            }
                            list_relationship_id.push(property_use_type_id)

                            let responses = item?.responses?.selected
                            if (Array.isArray(responses) && responses.length > 0){
                                responses = responses[0]

                                const res_label = responses?.label
                                const res_id = responses?.id

                                if (!res_label || !res_id){
                                    continue
                                }
                                list_relationship_id.push(res_id)
                                
                                let selected_id = ""
                                for (const [key, item] of Object.entries(property_data)) {
                                    let parent_id = item?.parent_id
                                    if (property_use_type_id == parent_id){
                                        let option_values = item?.options?.values
                                        if (Array.isArray(option_values)){
                                            option_values = option_values[0]

                                            if (option_values == res_id){
                                                selected_id = item?.id
                                                break
                                            }
                                        }
                                    }
                                }
                                
                                if (selected_id){
                                    list_relationship_id.push(selected_id)

                                    let list_question = {}
                                    for (const [key, item] of Object.entries(property_data)) {
                                        let parent_id = item?.parent_id
                                        if (selected_id == parent_id){
                                            let current_id = item?.id
                                            list_relationship_id.push(current_id)
                                            let question_label = item?.label
                                            let question_value = ""
                                            let type = item?.type
                                            if (type == "select" || type == "list" || type == "toggle"){
                                                let responses = item?.responses?.selected
                                                if (Array.isArray(responses)){
                                                    responses = responses[0]
                                                }else{
                                                    responses = {}
                                                }
                                                question_value = responses?.label || ""
                                            }else{
                                                let responses = item?.responses
                                                question_value = responses?.value
                                            }

                                            if (question_label){
                                                list_question[question_label] = question_value
                                            }
                                        }
                                    }
                                    
                                    if (list_question){
                                        list_question['list_relationship_id'] = list_relationship_id
                                        usetypes_list[res_label] = list_question
                                    }
                                    
                                }
                                
                            }
                        }
                    }
                }

                builtUseTypesHtml(usetypes_list)

                // All usetype loaded
                document.body.innerHTML += '<div id="usetype_is_loaded"></div>';
            }
            
        }
    }, [])

    function builtUseTypesHtml(usetypes_list) {
        if (usetypes_list && typeof usetypes_list === 'object'){
            let usetypes_html = ''
            let key_count = 0
            if (useTypesRef && typeof useTypesRef?.current === 'object'){

                for (const [key, value] of Object.entries(usetypes_list)) {
                    let list_relationship_id = value?.list_relationship_id
                    if (!list_relationship_id || !Array.isArray(list_relationship_id)){
                        list_relationship_id = []
                    }

                    const selected_use_type_value = key
                    let selected_usetype_questions = useTypesRef?.current[selected_use_type_value]
                    if (!selected_usetype_questions || typeof selected_usetype_questions != 'object'){
                        continue
                    }
                    
                    let question_html = ``
                    let usetype_html = ``
                    for (const question in selected_usetype_questions){
                        const label = selected_usetype_questions[question]['label']
                        const type = selected_usetype_questions[question]['type']
                        const value_g = value[label] || ""
                        let field_html = ''
                        if (type == 'numeric'){
                            field_html = `<input value='${value_g || ""}' name='usetype[${selected_use_type_value}][${label}]' type="number" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />`
                        }else if (type == 'list'){
                            let options = selected_usetype_questions[question]?.options?.response_set?.responses
                            let option_html = ``
                            if (Array.isArray(options) && options.length > 0){
                                for (const option in options){
                                    let selected = options[option]?.label === value_g ? "selected" : ""
                                    option_html = `
                                        ${option_html}
                                        <option ${selected} value="${options[option]?.label}">${options[option]?.label}</options>
                                    `
                                }
                            }
                            field_html = `
                            <select name='usetype[${selected_use_type_value}][${label}]' class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]">
                                ${option_html}
                            </select>
                            `
                        }else{
                            field_html = `<input value="${value_g || ""}" name='usetype[${selected_use_type_value}][${label}]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />`
                        }
                        question_html = `
                            ${question_html}
                            <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                <label class="text-grey font-semibold" for="">${label}</label>
                                ${field_html}
                            </div>
                        `
                    }

                    if (question_html){
                        usetype_html = `
                        <div class="block-collapse-wrap mb-[20px] md:mb-[40px]">
                            <h3 class="text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-semibold mb-[10px] md:mb-[20px]">
                                <div class="collapse-title inline-flex cursor-pointer w-full">
                                    <span>${selected_use_type_value}</span>
                                    <img class="ml-[10px]" src="./images/common/chevron.down.svg" alt="" />

                                    <a data-usetype="${selected_use_type_value}" data-list_relationship_id="${list_relationship_id.toString()}" class="cursor-pointer ml-auto btn-remove-usetype text-[10px] md:text-[12px] leading-[12px] md:leading-[15px] font-semibold bg-greywhite rounded-[10px] p-[10px] md:py-[10px] md:px-[12px] whitespace-nowrap items-center">
                                        <img src="./images/common/remove-grey.svg" alt="" />
                                    </a>
                                </div>
                            </h3>

                            <div class="block-collapsed flex flex-wrap mx-[-5px]">
                                ${question_html}
                            </div>
                        </div>
                    `
                    }
                    

                    // const usetype_created = document.getElementById('usetype_created')
                    // if (usetype_created && usetype_html){
                    if (usetype_html){
                        // usetype_created.insertAdjacentHTML(
                        //     'beforeend', 
                        //     usetype_html
                        // );
                        
                        if (!usetypeCreatedHtml || !Array.isArray(usetypeCreatedHtml)){
                            usetypeCreatedHtml = []
                        }

                        usetypeCreatedHtml.push(usetype_html)
                        setUsetypeCreatedHtml(usetypeCreatedHtml)

                        useTypesCreated.push(selected_use_type_value)
                        setUseTypesCreated(useTypesCreated)
                    }

                    key_count += 1
                }

            }
            
        }
    
    }

    function builtContactHtml(contacts){
       
        if (contacts && typeof contacts === 'object'){
            let contact_html = ''
            let key_count = 0
            for (const [key, value] of Object.entries(contacts)) {
                contact_html = `${contact_html}
                    <div class="block-collapse-wrap mb-[20px] md:mb-[40px]">

                        <div class="contact-form-wrap" data-id="0">
                            <div class="flex flex-wrap mx-[-5px]">
                                <h4 class="text-[12px] md:text-[16px] leading-[15px] md:leading-[20px] font-semibold mb-[10px] w-full flex-shrink-0 px-[5px]">Owner</h4>
                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">First Name</label>
                                    <input value="${value?.owner_first_name || ""}" name='contact[${key_count}][owner_first_name]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>

                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">Last Name</label>
                                    <input value="${value?.owner_last_name || ""}" name='contact[${key_count}][owner_last_name]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>

                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">Email</label>
                                    <input value="${value?.owner_email || ""}" name='contact[${key_count}][owner_email]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>

                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">Phone Number</label>
                                    <input value="${value?.owner_phone_number || ""}" name='contact[${key_count}][owner_phone_number]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>
                            </div>

                            <div class="flex flex-wrap mx-[-5px]">
                                <h4 class="text-[12px] md:text-[16px] leading-[15px] md:leading-[20px] font-semibold mb-[10px] w-full flex-shrink-0 px-[5px]">Property Manager</h4>
                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">Management Company</label>
                                    <input value="${value?.property_manager_management_company || ""}" name='contact[${key_count}][property_manager_management_company]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>

                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">First Name</label>
                                    <input value="${value?.property_manager_first_name || ""}" name='contact[${key_count}][property_manager_first_name]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>

                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">Last Name</label>
                                    <input value="${value?.property_manager_last_name || ""}" name='contact[${key_count}][property_manager_last_name]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>

                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">Email</label>
                                    <input value="${value?.property_manager_email || ""}" name='contact[${key_count}][property_manager_email]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>

                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">Phone Number</label>
                                    <input value="${value?.property_manager_phone_number || ""}" name='contact[${key_count}][property_manager_phone_number]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>
                            </div>

                            <div class="flex flex-wrap mx-[-5px]">
                                <h4 class="text-[12px] md:text-[16px] leading-[15px] md:leading-[20px] font-semibold mb-[10px] w-full flex-shrink-0 px-[5px]">Operator</h4>
                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">First Name</label>
                                    <input value="${value?.operator_first_name || ""}" name='contact[${key_count}][operator_first_name]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>

                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">Last Name</label>
                                    <input value="${value?.operator_last_name || ""}" name='contact[${key_count}][operator_last_name]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>

                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">Email</label>
                                    <input value="${value?.operator_email || ""}" name='contact[${key_count}][operator_email]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>

                                <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                    <label class="text-grey font-semibold" for="">Phone Number</label>
                                    <input value="${value?.operator_phone_number || ""}" name='contact[${key_count}][operator_phone_number]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                </div>
                            </div>

                            <!-- Button add new -->
                            <div class="flex flex-wrap hidden">
                                <a href="#" class="hidden mr-[10px] btn-remove-contact text-[10px] md:text-[12px] leading-[12px] md:leading-[15px] font-semibold bg-greywhite rounded-[10px] p-[10px] md:py-[10px] md:px-[12px] whitespace-nowrap items-center">
                                    <img src="./images/common/remove-grey.svg" alt="" />
                                </a>
                                <a href="#" class="btn-add-contact text-[10px] md:text-[12px] leading-[12px] md:leading-[15px] font-semibold bg-[#B4B3EF] text-[#4D4BCF] rounded-[10px] p-[10px] md:py-[10px] md:px-[15px] whitespace-nowrap flex items-center">
                                    <span>Add New Contact</span>
                                </a>
                            </div>
                        </div>
                    </div>
                `
                key_count += 1
              }
              
             

            setContactHtml(contact_html)
        }
    }

    async function getDataJson (){
        const response = await fetch(
            JSON_FILE,
            {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        const json = await response.json();

        return json
    }

    async function loadJsonData (file){
        const response = await fetch(
            file,
            {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        const json = await response.json();

        return json
    }


    async function getPrefillData(token) {
        const response = await fetch(
            `https://api-staging-ea.buildaptive.com/api/v1/tokens/${token}`,
            {
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        const json = await response.json();

        return json
    }

    function getPlainObjectFromFormElement(form) {
        const elements = form.elements;
        return Object.keys(elements)
            .reduce((obj, field) => {
                if (isNaN(field)) {
                    obj[field] = elements[field].value;
                }
                return obj;
            }, {});
    }

    function changeTabPropertyInfo(event) {
        event.preventDefault()
        setTabType('property_info')
    }

    function changeTabUtilityData(event) {
        event.preventDefault()

        setTabType('utility_data')
    }

    function selectPropertyDetails(event) {
        const is_checked = event.target.checked === true
        
        switch (event.target.name){
            case "property_details_property_includes_parking_areas":
                setPropertyDetailsPropertyIncludesParkingAreasVal(is_checked)
                // setPropertyIncludesParkingAreas(is_checked)
                break
            case "property_details_property_has_a_heated_swimming_pool":
                setPropertyDetailsPropertyHasAHeatedSwimmingPoolVal(is_checked)
                // setPropertyHasAHeatedSwimmingPool(is_checked)
                break    
            case "property_details_property_details_property_has_1_or_more_retail_stores":
                setPropertyDetailsPropertyDetailsPropertyHas1OrMoreRetailStoresVal(is_checked)
                // setPropertyHas1OrMoreRetailStoresGreater5000(is_checked)
                break       
            case "property_has_one_or_more_restaurants":
                setPropertyHasOneOrMoreRestaurantsVal(is_checked)
                // setPropertyHasOneOrMoreRestaurantsCafeterias(is_checked)
                break       
            case "property_details_property_has_nursing":
                setPropertyDetailsPropertyHasNursingVal(is_checked)
                // setPropertyHasNursingAssistedCareFacilities(is_checked)
                break     
        }
    }

    function inputChange(event) {
        const val = event.target.value
        
        switch (event.target.name){
            case "property_name":
                setPropertyNameVal(val)
                break

            case "street_address":
                setStreetAddressVal(val)
                break
                    
            case "city":
                setCityVal(val)
                break
                    
            case "state":
                debugger
                setStateVal(val)
                break
            
            case "postal_code":
                setPostalCodeVal(val)
                break
                    
            case "property_identifiers_energy_star_portfolio_manager_id":
                setPropertyIdentifiersEnergyStarPortfolioManagerIdVal(val)
                break
                    
            case "property_identifiers_nyc_borough":
                setPropertyIdentifiersNycBoroughVal(val)
                break
                    
            case "property_identifiers_nyc_block":
                setPropertyIdentifiersNycBlockVal(val)
                break
                    
            case "property_identifiers_nyc_lot":
                setPropertyIdentifiersNycLotVal(val)
                break
                    
            case "property_identifiers_nyc_bins":
                setPropertyIdentifiersNycBinsVal(val)
                break
                    
            case "property_identifiers_external_id":
                setPropertyIdentifiersExternalIdVal(val)
                break
                     
            case "property_details_gross_floor_area":
                setPropertyDetailsGrossFloorAreaVal(val)
                break
                        
            case "property_details_current_occupancy_percent":
                setPropertyDetailsCurrentOccupancyPercentVal(val)
                break
                        
            case "property_details_construction_status":
                setPropertyDetailsConstructionStatusVal(val)
                break
                        
            case "property_details_year_built":
                setPropertyDetailsYearBuiltVal(val)
                break
            
            case "available_energy_sources_electricity":
                setAvailableEnergySourcesElectricityVal(val)
                break    
            
            case "available_energy_sources_natural_gas":
                setAvailableEnergySourcesNaturalGasVal(val)
                break    

            case "available_energy_sources_natural_gas_provider":
                setAvailableEnergySourcesNaturalGasProviderVal(val)
                break    

            case "available_energy_sources_fuel_oil":
                setAvailableEnergySourcesFuelOilVal(val)
                break    

            case "utility_account_information_electric_account_number":
                setUtilityAccountInformationElectricAccountNumberVal(val)
                break    
                    
            case "utility_account_information_natural_gas_account_number":
                setUtilityAccountInformationNaturalGasAccountNumberVal(val)
                break    

            case "property_details_number_of_individual_stores":
                setPropertyDetailsNumberOfIndividualStoresVal(val)
                break    
                
            case "property_details_percentage_of_units":
                setPropertyDetailsPercentageOfUnitsVal(val)
                break            
        }
    }
    


    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            resolve(reader.result)
          }
          reader.onerror = reject
        })
    }

    async function onSubmitForm(event){
        event.preventDefault()

        const form_data = Object.fromEntries(new FormData(event.target))
        let file = form_data.months_in_use_image

        try {
            if (file){
                form_data.months_in_use_image = await getBase64(file) 
            }
        } catch (error) {
            console.log()
        }

        // Submit 1
        let form_data_1 = {...form_data}
        form_data_1.property_details_current_occupancy_percent = form_data_1.property_details_current_occupancy_percent.replace("%", "")
        submitForm(form_data_1)
        downloadFile(form_data_1, 'file_1')

        // Submit 2
        if (prefillDataRef.current){
            let form_data_2 = prefillDataRef.current
            if (!form_data_2 && typeof form_data_2 !== 'object'){
                return false
            }
            
            let property_data_items = form_data_2.property_data?.items
            let form_data_nested = Helper.FormDataToObjectNested(form_data)
            let use_type = form_data_nested?.usetype

            if (Array.isArray(property_data_items) && property_data_items.length > 0 && use_type && typeof use_type == 'object'){
                for (let use_type_item in use_type){
                    
                    let usetype_table_id = ""
                    let property_use_type_schema = []
                    let response_set_object = {}
                    let question = use_type[use_type_item]
                    let items_update = []
                    for (let index in property_data_items){
                        const property_data_item = property_data_items[index]
                        let property_use_type_parent_id = property_data_item?.id
                        let mapping_id = property_data_item?.mapping_id
                        let type = property_data_item?.type
                       

                        if (mapping_id == 'property_use_type'){
                            if (type == 'table'){
                                usetype_table_id = property_use_type_parent_id

                                let schemas = property_data_item?.options?.table?.schema
                                if (Array.isArray(schemas) && schemas.length > 0){
                                    for (let index in schemas){
                                        let mapping_id = schemas[index].mapping_id
                                        if (mapping_id == 'property_use_type'){
                                            property_use_type_schema = schemas[index]?.options?.response_set?.responses || []
                                            response_set_object = schemas[index]?.options?.response_set || {}
                                            break
                                        }
                                    }
                                }
                            }

                            let response_selected = property_data_item?.responses?.selected
                            if (Array.isArray(response_selected) && response_selected.length > 0 ){
                                let response_selected_label = response_selected[0]?.label
                                let response_selected_id = response_selected[0]?.id
                                if (response_selected_label == use_type_item){
                                    
                                    // Update
                                    for (let item_a in property_data_items){
                                        let id_a = property_data_items[item_a]?.id
                                        let type_a = property_data_items[item_a]?.type
                                        let options_a = property_data_items[item_a]?.options
                                        let parent_id_a = property_data_items[item_a]?.parent_id

                                        if (property_use_type_parent_id == parent_id_a && type_a == 'smartfield' && typeof options_a == 'object'){
                                            
                                            let option_values = options_a?.values

                                            if (Array.isArray(option_values)){
                                                option_values = option_values[0]
                                                if (option_values == response_selected_id){
                                                    for (let index in property_data_items){
                                                        let item_b = property_data_items[index]
                                                        let id_b = item_b?.id
                                                        let type_b = item_b?.type
                                                        let label_b = item_b?.label
                                                        let parent_id_b = item_b?.parent_id
                                                        
                                                        if (parent_id_b == id_a){
                                                            for (const question_item in question){
                                                                
                                                                if (question_item == label_b){
                                                                    let question_answer = question[question_item] || null
                                                                    
                                                                    if (type_b == "select" || type_b == "list" || type_b == "toggle"){
                                                                        let responses = item_b?.responses?.selected
                                                                        if (Array.isArray(responses)){
                                                                            item_b.responses.selected[0].label = question_answer
                                                                            item_b.responses.selected[0].id = null
                                                                        }
                                                                    }else{
                                                                        if (question_answer == null || typeof question_answer == 'string' && question_answer.length <=0){
                                                                            item_b.responses = null
                                                                        }else{
                                                                            item_b.responses.value = question_answer
                                                                        }
                                                                        
                                                                    }
                                                                    
                                                                    items_update.push(item_b)
                                                                    break
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }


                                }
                            }
                        }
                    }
                    
                    // Do Update
                    if (Array.isArray(items_update) && items_update.length > 0){
                        property_data_items = property_data_items.map(function(property_data_item){
                            for (let index in items_update){
                                let item = items_update[index]
                                let id = item?.id
                                
                                let property_data_item_id = property_data_item?.id
                                
                                if (id == property_data_item_id){
                                    item.updated_at = dayjs().format();
                                    property_data_item = item
                                }
                            }
                        
                            return property_data_item
                        })
                    }else{
                        // Create new
                        if (usetype_table_id.length > 0 && property_use_type_schema.length > 0){
                            let row_data = {}
                            let row_id = uuid()

                            // Create row
                            row_data['id'] = row_id
                            row_data['mapping_id'] = 'property_use_type_row'
                            row_data['label'] = ""
                            row_data['options'] = {}
                            row_data['parent_id'] = usetype_table_id
                            row_data['type'] = 'row'
                            row_data['updated_at'] = dayjs().format();
                            property_data_items.push(row_data)

                            // Create property_use_type item
                            let new_property_use_type_id = uuid()
                            let new_property_use_type_selected_id = ''
                            let new_property_use_type_selected_label = ''
                            let new_property_use_type_item = {}
                            new_property_use_type_item['id'] = new_property_use_type_id
                            new_property_use_type_item['mapping_id'] = 'property_use_type'
                            new_property_use_type_item['label'] = 'Property Use Type'
                            new_property_use_type_item['options'] = {}
                            new_property_use_type_item['options']['is_required'] = true
                            new_property_use_type_item['options']['response_set'] = response_set_object
                            new_property_use_type_item['parent_id'] = row_id
                            new_property_use_type_item['type'] = 'list'
                            new_property_use_type_item['responses'] = {}
                            new_property_use_type_item['responses']['id'] = uuid()
                            new_property_use_type_item['responses']['selected'] = []
                            new_property_use_type_item['updated_at'] = dayjs().format();

                            for (let index in property_use_type_schema){
                                let item = property_use_type_schema[index]
                                let label = item?.label
                                let id = item?.id

                                if (label == use_type_item){
                                    new_property_use_type_item['responses']['selected'].push(item)
                                    new_property_use_type_selected_id = id
                                    new_property_use_type_selected_label = label
                                }
                            }

                            property_data_items.push(new_property_use_type_item)

                            // Create smartfield
                            let new_smartfield_id = uuid()
                            let new_smartfield_item = {}
                            new_smartfield_item['id'] = new_smartfield_id
                            new_smartfield_item['label'] = ""
                            new_smartfield_item['parent_id'] = new_property_use_type_id
                            new_smartfield_item['type'] = 'smartfield'
                            new_smartfield_item['options'] = {}
                            new_smartfield_item['options']['is_required'] = true
                            new_smartfield_item['options']['response_set'] = response_set_object
                            new_smartfield_item['options']['condition'] = "is_selected"
                            // new_smartfield_item['options']['response_set'] = null
                            new_smartfield_item['options']['values'] = [new_property_use_type_selected_id]
                            new_smartfield_item['updated_at'] = dayjs().format();
                            property_data_items.push(new_smartfield_item)
                            
                            // Create answer item 
                            let new_answer_id = uuid()
                            let new_answer_item = {}
                            let usetypes = useTypesRef.current
                            if (typeof usetypes == 'object' && new_property_use_type_selected_label && typeof new_property_use_type_selected_label == 'string' && question && typeof question == 'object'){
                                let usetype_items = usetypes[new_property_use_type_selected_label]
                                for (let question_name in question){
                                    let question_value  = question[question_name]
                                    
                                    for (let index in usetype_items){
                                        let usetype_item = usetype_items[index]
                                        let usetype_item_label = usetype_item?.label
                                        let usetype_item_type = usetype_item?.type

                                        if (question_name == usetype_item_label){
                                            new_answer_item = usetype_item
                                            let selected_val = {}
                                            let response_set = usetype_item?.options?.response_set?.responses
                                            if (Array.isArray(response_set) && response_set.length > 0){
                                                for (let index in response_set){
                                                    let response_set_item = response_set[index]
                                                    let response_set_item_label = response_set_item.label
                                                    
                                                    if (response_set_item_label == question_value){
                                                        selected_val = response_set_item
                                                        break
                                                    }
                                                }
                                            }

                                            new_answer_item.responses = {}
                                            new_answer_item.responses.id = uuid()
                                            if (usetype_item_type == "select" || usetype_item_type == "list" || usetype_item_type == "toggle"){
                                                new_answer_item.responses.selected = []
                                                new_answer_item.responses.selected.push(selected_val)
                                            }else{
                                                
                                                new_answer_item.responses.value = question_value
                                                if (question_value.length <= 0){
                                                    new_answer_item.responses = null
                                                }
                                            }
                                            break
                                        }
                                    }

                                    if (new_answer_item){
                                        new_answer_item['id'] = new_answer_id
                                        new_answer_item['parent_id'] = new_smartfield_id
                                        new_answer_item['updated_at'] = dayjs().format();

                                        property_data_items.push(new_answer_item)
                                    }
                                }
                            }

                            
                        }
                    }
                }
                
            }
            form_data_2.property_data.items = property_data_items
            
            form_data_2.name = propertyNameVal || null
            
            if (typeof form_data_2.address != 'object'){
                form_data_2.address = {}
            }
            form_data_2.address.street = streetAddressVal || null
            form_data_2.address.state = stateVal || null
            form_data_2.address.city = cityVal || null
            form_data_2.address.zip_code = postalCodeVal || null

            if (typeof form_data_2.management != 'object'){
                form_data_2.management = {}
            }

            form_data_2.management.contact_first_name = form_data_nested?.contact[0]?.owner_first_name || null
            form_data_2.management.contact_last_name = form_data_nested?.contact[0]?.owner_last_name || null
            form_data_2.management.contact_email = form_data_nested?.contact[0]?.owner_email || null

            form_data_2.espm_id = parseInt(form_data_nested?.property_identifiers_energy_star_portfolio_manager_id) || null
            form_data_2.borough = form_data_nested?.property_identifiers_nyc_borough || null
            form_data_2.block = form_data_nested?.property_identifiers_nyc_block || null
            form_data_2.lot = form_data_nested?.property_identifiers_nyc_lot || null
            form_data_2.bins = form_data_nested?.property_identifiers_nyc_bins || null
           
            if (Array.isArray(property_data_items) && property_data_items.length > 0){
                const updatedItems = property_data_items.map(function(item){
                    let mapping_id = item?.mapping_id
                    let type = item?.type
                    let value = ''
                    let mapped = false
                    if (mapping_id === "gross_floor_area"){
                        value = form_data_nested?.property_details_gross_floor_area || null
                        mapped = true
                    }else if (mapping_id === "current_occupancy_%"){
                        value = form_data_nested?.property_details_current_occupancy_percent || null
                        mapped = true
                    }else if (mapping_id === "construction_status"){
                        value = form_data_nested?.property_details_construction_status || null
                        mapped = true
                    }else if (mapping_id === "year_built"){
                        value = form_data_nested?.property_details_year_built || null
                        mapped = true
                    }else if (mapping_id === "property_includes_parking_areas"){
                        value = form_data_nested?.property_details_property_includes_parking_areas || null
                        mapped = true
                    }else if (mapping_id === "has_heated_swimming_pool"){
                        value = form_data_nested?.property_details_property_has_a_heated_swimming_pool || null
                        mapped = true
                    }else if (mapping_id === "has_one_or_more_retail_stores"){
                        value = form_data_nested?.property_details_property_details_property_has_1_or_more_retail_stores || null
                        mapped = true
                    }else if (mapping_id === "number_of_individual_stores"){
                        value = form_data_nested?.property_details_number_of_individual_stores || null
                        mapped = true
                    }else if (mapping_id === "has_one_or_more_restaurants"){
                        value = form_data_nested?.property_has_one_or_more_restaurants || null
                        mapped = true
                    }else if (mapping_id === "has_nursing_assisted_care"){
                        value = form_data_nested?.property_details_property_has_nursing || null
                        mapped = true
                    }else if (mapping_id === "perc_units_nursing_assisted_care"){
                        value = form_data_nested?.property_details_percentage_of_units || null
                        mapped = true
                    }

                    if (mapped == true){
                        if (!item.responses || typeof item.responses != 'object'){
                            item.responses = {}
                        }
    
                        if (type == "select" || type == "list" || type == "toggle"){
                            let responses_set = item?.options?.response_set?.responses
                            let has_val = false
                            if (Array.isArray(responses_set) && responses_set.length > 0){
                                for (let index in responses_set){
                                    let responses_set_item = responses_set[index]
                                    let responses_set_item_label  = responses_set_item?.label

                                    if (type == "toggle"){
                                        if (typeof value == 'string' && value.length > 0 && responses_set_item_label == 'On'){
                                            item.responses = {
                                                "id": uuid(),
                                                "selected":
                                                [
                                                    responses_set_item
                                                ]
                                            }

                                            has_val = true

                                            break
                                        }else if (responses_set_item_label == 'Off'){
                                            item.responses = {
                                                "id": uuid(),
                                                "selected":
                                                [
                                                    responses_set_item
                                                ]
                                            }

                                            has_val = true
                                            break
                                        }
                                    }

                                    if (typeof responses_set_item_label == 'string' && responses_set_item_label == value){
                                        item.responses = {
                                            "id": uuid(),
                                            "selected":
                                            [
                                                responses_set_item
                                            ]
                                        }

                                        has_val = true
                                        break
                                    }
                                }
                            }

                            if (!has_val){
                                item.responses = null
                            }
                            
                        }else{
                            if (value == null || (typeof value == 'string' && value.length <= 0)){
                                item.responses = null
                            }else{
                                item.responses.value = value
                            }
                            
                        }

                        item.updated_at = dayjs().format();
                    }
                    
                    return item
                })

                form_data_2.property_data.items = updatedItems
            }

            form_data_2.electric_data_required = availableEnergySourcesElectricityVal || null
            if (['Yes', 'yes'].includes(form_data_2.electric_data_required)){
                form_data_2.electric_data_required = true
            }else{
                form_data_2.electric_data_required = false
            }
            // form_data_2.available_energy_sources_natural_gas = propertyIdentifiersNycBlockVal || null
            // form_data_2.gas_data_required = propertyIdentifiersNycLotVal
            // form_data_2.oild_data_required = propertyIdentifiersNycBinsVal

            submitForm(form_data_2)
            downloadFile(form_data_2, 'file_2')
        }
    }

    async function submitForm(form_data) {
        const url = WEBHOOK_URL;
        try {
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(form_data)
          });

          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const json = await response.json();

          if (json.success == true){
            alert(`Submit successfully! Plesae review in ${WEBHOOK_URL}`)
          }
        } catch (error) {
          console.error(error.message);
        }
        alert(`Submit successfully! Plesae review in ${WEBHOOK_URL}`)
      }

    function createUseType(event) {
        event.preventDefault()
        
        const selected_use_type = document.getElementById('usetypes')
        let selected_use_type_value = selected_use_type?.value

        if (!selected_use_type_value){
            alert("Plase select an Use Type.")
            return false
        }
        let selected_usetype_questions = useTypes[selected_use_type_value]


        if (Array.isArray(selected_usetype_questions) && selected_usetype_questions.length > 0){
            if (useTypesCreated.includes(selected_use_type_value)){
                alert('This Use Type has already been created, please choose another Use Type')
                return false
            }
            
            let question_html = ``
            let usetype_html = ``
            for (const question in selected_usetype_questions){
                const label = selected_usetype_questions[question]['label']
                const type = selected_usetype_questions[question]['type']
                let field_html = ''
                if (type == 'numeric'){
                    field_html = `<input name='usetype[${selected_use_type_value}][${label}]' type="number" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />`
                }else if (type == 'list'){
                    let options = selected_usetype_questions[question]?.options?.response_set?.responses
                    let option_html = ``
                    if (Array.isArray(options) && options.length > 0){
                        for (const option in options){
                            option_html = `
                                ${option_html}
                                <option>${options[option]?.label}</options>
                            `
                        }
                    }
                    field_html = `
                    <select name='usetype[${selected_use_type_value}][${label}]' class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]">
                        ${option_html}
                    </select>
                    `
                }else{
                    field_html = `<input name='usetype[${selected_use_type_value}][${label}]' type="text" placeholder="Enter Value" class="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />`
                }
                question_html = `
                    ${question_html}
                    <div class="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                        <label class="text-grey font-semibold" for="">${label}</label>
                        ${field_html}
                    </div>
                `
            }

            if (question_html){
                usetype_html = `
                <div class="block-collapse-wrap mb-[20px] md:mb-[40px]">
                    <h3 class="text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-semibold mb-[10px] md:mb-[20px]">
                        <div class="collapse-title inline-flex cursor-pointer w-full">
                            <span>${selected_use_type_value}</span>
                            <img class="ml-[10px]" src="./images/common/chevron.down.svg" alt="" />

                            <a data-usetype="${selected_use_type_value}" class="cursor-pointer ml-auto btn-remove-usetype text-[10px] md:text-[12px] leading-[12px] md:leading-[15px] font-semibold bg-greywhite rounded-[10px] p-[10px] md:py-[10px] md:px-[12px] whitespace-nowrap items-center">
                                <img src="./images/common/remove-grey.svg" alt="" />
                            </a>
                        </div>
                    </h3>

                    <div class="block-collapsed flex flex-wrap mx-[-5px]">
                        ${question_html}
                    </div>
                </div>
            `
            }
            

            const usetype_created = document.getElementById('usetype_created')
            if (usetype_created && usetype_html){
                usetype_created.insertAdjacentHTML(
                    'beforeend', 
                    usetype_html
                );

                useTypesCreated.push(selected_use_type_value)
                setUseTypesCreated(useTypesCreated)

                selected_use_type.value = ""
            }
        }
    }

    function selectedVal(val1, val2, remove_perc=false){
        val1 = String(val1).trim()
        val2 = String(val2).trim()

        if (remove_perc == true){
            val1 = val1.replace(/^%+|%+$/g, '');
            val2 = val2.replace(/^%+|%+$/g, '');
        }

        if (val1 === val2){
            return "selected"
        }
        return ""
    }

    function checkedVal(val){
        let is_off = ["Off", 'off'].includes(val) 
        if (val && !is_off){
            return "checked"
        }

        return ""
    }

    const downloadFile = (data, file_name) => {
        // create file in browser
        const fileName = file_name;
        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);
      
        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
      
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      }

    return (
        <div className="containerX content-wrap flex-1 py-[16px] md:py-[32px]">
            <form id='questionaire-form' onSubmit={onSubmitForm} method='POST'>
                <div className="sticky z-[9998] top-[64px] left-0 pt-[15px] pb-[1px] md:pt-0 md:pb-0 bg-white md:bg-none md:static">

                    <div className=''>
                        {/* <!-- Title, Button --> */}
                        <div className="hidden flex items-center justify-between">
                            <div className="flex items-start md:items-center flex-col md:flex-row">
                                <div>
                                    <h2
                                        className="font-semibold text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] mt-[4px]">
                                        Create/Edit Questionnaire</h2>
                                </div>
                            </div>

                            <div className="flex items-start md:items-center">
                                <a href="#"
                                    className="group text-[10px] leading-[12px] md:text-[12px] md:leading-[15px] inline-flex justify-center items-center h-[28px] md:h-[35px] p-[6px] font-semibold bg-[#E8E9EB] text-[#8A8D94] rounded-[10px] py-[10px] px-[15px] whitespace-nowrap ml-[10px]">
                                    <span className="">Save</span>
                                </a>
                            </div>
                        </div>

                        {/* <!-- Top info --> */}
                        <div className="hidden flex flex-col mt-[24px] mb-[30px]">
                            <div className="w-full inline-flex mb-5 flex-col lg:flex-row lg:items-center">
                                <div className="mr-5 w-[180px] font-semibold">Questionnaire Name</div>
                                <input name='questionnaire_name' type="text" placeholder="Enter Value" className="w-full lg:w-[40%] border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                            </div>

                            <div className="w-full inline-flex mb-5 flex-col lg:flex-row lg:items-center">
                                <div className="mr-5 w-[180px] font-semibold">Questionnaire Source</div>
                                <input name='questionnaire_source' type="text" placeholder="Enter Value" className="w-full lg:w-[40%] border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                            </div>
                        </div>

                        {/* <!-- Scroll snap menu --> */}
                        <div className="relative snap-slide px-[18px] md:px-0">
                            <div className="hidden active:block absolute left-[-10px] md:left-[-22px] cursor-pointer snap-prev">
                                <svg className="rotate-180" width="21" height="21" viewBox="0 0 21 21" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.709 20.9102C16.1582 20.9102 20.6699 16.3887 20.6699 10.9492C20.6699 5.5 16.1484 0.988281 10.6992 0.988281C5.25977 0.988281 0.748047 5.5 0.748047 10.9492C0.748047 16.3887 5.26953 20.9102 10.709 20.9102ZM8.39453 15.9395C8.0918 15.627 8.0918 15.1387 8.39453 14.8555L12.5352 10.959L8.39453 7.07227C8.08203 6.7793 8.0918 6.28125 8.4043 5.98828C8.69727 5.70508 9.16602 5.73438 9.47852 6.02734L13.668 9.96289C14.2441 10.5 14.2344 11.4277 13.668 11.9551L9.47852 15.9004C9.19531 16.1738 8.66797 16.1934 8.39453 15.9395Z"
                                        fill="#15151D" />
                                </svg>
                            </div>

                            <div
                                className="active hidden active:block absolute right-[-10px] md:right-[-22px] cursor-pointer snap-next">
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.709 20.9102C16.1582 20.9102 20.6699 16.3887 20.6699 10.9492C20.6699 5.5 16.1484 0.988281 10.6992 0.988281C5.25977 0.988281 0.748047 5.5 0.748047 10.9492C0.748047 16.3887 5.26953 20.9102 10.709 20.9102ZM8.39453 15.9395C8.0918 15.627 8.0918 15.1387 8.39453 14.8555L12.5352 10.959L8.39453 7.07227C8.08203 6.7793 8.0918 6.28125 8.4043 5.98828C8.69727 5.70508 9.16602 5.73438 9.47852 6.02734L13.668 9.96289C14.2441 10.5 14.2344 11.4277 13.668 11.9551L9.47852 15.9004C9.19531 16.1738 8.66797 16.1934 8.39453 15.9395Z"
                                        fill="#15151D" />
                                </svg>
                            </div>

                            <div
                                className="snap-scroller flex flex-nowrap snap-x snap-mandatory overflow-x-scroll no-scrollbar scroll-smooth">
                                <div className="snap-always snap-start">
                                    <a href="#" onClick={changeTabPropertyInfo}
                                        className={(tabType == "property_info" ? "active" : "") + " group flex mr-[10px] pb-[10px] active:border-b-2 active:border-green hover:border-b-2 hover:border-green"}>
                                        <svg className="mr-[4px]" width="20" height="18" viewBox="0 0 20 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path className="active:fill-green group-hover:fill-green"
                                                d="M10 4V0H0V18H20V4H10ZM4 16H2V14H4V16ZM4 12H2V10H4V12ZM4 8H2V6H4V8ZM4 4H2V2H4V4ZM8 16H6V14H8V16ZM8 12H6V10H8V12ZM8 8H6V6H8V8ZM8 4H6V2H8V4ZM18 16H10V14H12V12H10V10H12V8H10V6H18V16ZM16 8H14V10H16V8ZM16 12H14V14H16V12Z"
                                                fill="#8A8D94" />
                                        </svg>
                                        <span
                                            className="active:text-green group-hover:text-green font-semibold text-[#8A8D94] whitespace-nowrap">Property
                                            Info</span>
                                    </a>
                                </div>
                                <div className="snap-always snap-start">
                                    <a href="#" onClick={changeTabUtilityData}
                                        className={(tabType == "utility_data" ? "active" : "") + " group flex mr-[10px] pb-[10px] active:border-b-2 active:border-green hover:border-b-2 hover:border-green"}>
                                        <svg className="mr-[4px]" width="20" height="16" viewBox="0 0 20 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path className="active:fill-green group-hover:fill-green"
                                                d="M18.3779 4.54529L17.1459 6.39831C17.74 7.58332 18.0309 8.89721 17.9924 10.2223C17.954 11.5473 17.5874 12.8421 16.9255 13.9907H3.0429C2.18267 12.4984 1.82622 10.7686 2.02639 9.05771C2.22656 7.34687 2.9727 5.74607 4.15419 4.49263C5.33569 3.23919 6.88964 2.39984 8.58567 2.099C10.2817 1.79817 12.0295 2.05186 13.5701 2.82248L15.4231 1.59048C13.5365 0.380722 11.2987 -0.161373 9.06761 0.0509044C6.83654 0.263182 4.74112 1.21757 3.11652 2.7614C1.49192 4.30523 0.432011 6.3493 0.106336 8.56666C-0.219339 10.784 0.208035 13.0465 1.3201 14.9923C1.49489 15.2951 1.74588 15.5468 2.04811 15.7226C2.35035 15.8983 2.69331 15.9918 3.0429 15.9939H16.9155C17.2685 15.9953 17.6156 15.9034 17.9217 15.7276C18.2277 15.5517 18.4819 15.298 18.6583 14.9923C19.5812 13.3936 20.0444 11.571 19.9967 9.72569C19.9489 7.88036 19.3922 6.08412 18.3879 4.53528L18.3779 4.54529ZM8.57191 11.3965C8.75796 11.5827 8.9789 11.7305 9.22209 11.8313C9.46528 11.9321 9.72596 11.984 9.98922 11.984C10.2525 11.984 10.5132 11.9321 10.7564 11.8313C10.9995 11.7305 11.2205 11.5827 11.4065 11.3965L17.0758 2.8926L8.57191 8.56184C8.38566 8.74788 8.2379 8.96882 8.13709 9.21202C8.03627 9.45521 7.98438 9.71589 7.98438 9.97915C7.98438 10.2424 8.03627 10.5031 8.13709 10.7463C8.2379 10.9895 8.38566 11.2104 8.57191 11.3965Z"
                                                fill="#8A8D94" />
                                        </svg>
                                        <span
                                            className="active:text-green group-hover:text-green font-semibold text-[#8A8D94] whitespace-nowrap">Utility
                                            Data</span>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className={tabType == "property_info" ? "" : "hidden"}>
                        {/* <!-- Property info --> */}
                        <div>
                            <div className="mt-[40px]">
                                <h2 className="text-white text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-medium p-[6px] md:p-[14px] rounded-[10px] bg-[#343538] text-center mb-[16px] md:mb-[20px]">Property Information</h2>

                                {/* <!-- Details --> */}
                                <div className="block-collapsed flex flex-wrap mx-[-5px]">
                                    <div className="w-full inline-flex mb-5 flex-col lg:flex-row lg:items-center">
                                        <div className="mr-5 w-[180px] font-semibold">Property Name</div>
                                        <input value={propertyNameVal} onChange={inputChange} name='property_name' type="text" placeholder="Enter Value" className="w-full lg:w-[40%] border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>

                                    <div className="w-full inline-flex mb-5 flex-col lg:flex-row lg:items-center">
                                        <div className="mr-5 w-[180px] font-semibold">Street Address</div>
                                        <input value={streetAddressVal} onChange={inputChange}  name='street_address' type="text" placeholder="Enter Value" className="w-full lg:w-[40%] border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>

                                    <div className="w-full inline-flex mb-5 flex-col lg:flex-row lg:items-center">
                                        <div className="mr-5 w-[180px] font-semibold">City</div>
                                        <input value={cityVal}  onChange={inputChange} name='city' type="text" placeholder="Enter Value" className="w-full lg:w-[40%] border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>

                                    <div className="w-full inline-flex mb-5 flex-col lg:flex-row lg:items-center">
                                        <div className="mr-5 w-[180px] font-semibold">State</div>
                                        <select name='state' onChange={inputChange}  className='w-full lg:w-[40%] mr-3 border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]'>
                                            <option value={""}>--Select--</option>
                                            {Object.entries(usState).map(([key, value]) => (
                                                <option key={key} value={key} selected={selectedVal(key, stateVal, true)}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                        
                                        {/* <input value={stateVal}  onChange={inputChange} name='state' type="text" placeholder="Enter Value" className="w-full lg:w-[40%] border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" /> */}
                                    </div>

                                    <div className="w-full inline-flex mb-5 flex-col lg:flex-row lg:items-center">
                                        <div className="mr-5 w-[180px] font-semibold">Postal Code</div>
                                        <input value={postalCodeVal}  onChange={inputChange} name='postal_code' type="text" placeholder="Enter Value" className="w-full lg:w-[40%] border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Contact --> */}
                        <div>
                            <div className="mt-[40px]">
                                <h2 className="text-white text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-medium p-[6px] md:p-[14px] rounded-[10px] bg-[#343538] text-center mb-[16px] md:mb-[20px]">Contact Information</h2>

                                <div dangerouslySetInnerHTML={{ __html: contactHtml }} />
                            </div>
                        </div>

                        {/* <!-- Property Identifiers --> */}
                        <div>
                            <div className="mt-[40px]">
                                <h2 className="text-white text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-medium p-[6px] md:p-[14px] rounded-[10px] bg-[#343538] text-center mb-[16px] md:mb-[20px]">Property Identifiers</h2>

                                <div className="block-collapsed flex flex-wrap mx-[-5px]">
                                    <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                        <label className="text-grey font-semibold" for="">Energy Star Portfolio Manager ID</label>
                                        <input onChange={inputChange} value={propertyIdentifiersEnergyStarPortfolioManagerIdVal}  name='property_identifiers_energy_star_portfolio_manager_id' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>

                                    <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                        <label className="text-grey font-semibold" for="">NYC Borough</label>
                                        <input onChange={inputChange} value={propertyIdentifiersNycBoroughVal}  name='property_identifiers_nyc_borough' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>

                                    <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                        <label className="text-grey font-semibold" for="">NYC Block</label>
                                        <input onChange={inputChange} value={propertyIdentifiersNycBlockVal}  name='property_identifiers_nyc_block' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>

                                    <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                        <label className="text-grey font-semibold" for="">NYC Lot</label>
                                        <input onChange={inputChange} value={propertyIdentifiersNycLotVal}  name='property_identifiers_nyc_lot' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>

                                    <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                        <label className="text-grey font-semibold" for="">NYC BIN(s)</label>
                                        <input onChange={inputChange} value={propertyIdentifiersNycBinsVal}  name='property_identifiers_nyc_bins' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>

                                    <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                        <label className="text-grey font-semibold" for="">External ID</label>
                                        <input onChange={inputChange} value={propertyIdentifiersExternalIdVal}  name='property_identifiers_external_id' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Property  Details --> */}
                        <div>
                            <div className="mt-[40px]">
                                <h2 className="text-white text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-medium p-[6px] md:p-[14px] rounded-[10px] bg-[#343538] text-center mb-[16px] md:mb-[20px]">Property  Details</h2>

                                <div className="block-collapsed flex flex-wrap mx-[-5px]">
                                    <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                        <label className="text-grey font-semibold" for="">Gross Floor Area</label>
                                        <input onChange={inputChange} value={propertyDetailsGrossFloorAreaVal}  name='property_details_gross_floor_area' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                        
                                    </div>

                                    <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                        <label className="text-grey font-semibold" for="">Current Occupancy %</label>
                                        {/* <input name='property_details_current_occupancy_percent' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" /> */}
                                        <select name='property_details_current_occupancy_percent' placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]">
                                            <option value="0%" selected={selectedVal('0%', propertyDetailsCurrentOccupancyPercentVal, true)}>0%</option>
                                            <option value="5%" selected={selectedVal('5%', propertyDetailsCurrentOccupancyPercentVal, true)}>5%</option>
                                            <option value="10%" selected={selectedVal('10%', propertyDetailsCurrentOccupancyPercentVal, true)}>10%</option>
                                            <option value="15%" selected={selectedVal('15%', propertyDetailsCurrentOccupancyPercentVal, true)}>15%</option>
                                            <option value="20%" selected={selectedVal('20%', propertyDetailsCurrentOccupancyPercentVal, true)}>20%</option>
                                            <option value="25%" selected={selectedVal('25%', propertyDetailsCurrentOccupancyPercentVal, true)}>25%</option>
                                            <option value="30%" selected={selectedVal('30%', propertyDetailsCurrentOccupancyPercentVal, true)}>30%</option>
                                            <option value="35%" selected={selectedVal('35%', propertyDetailsCurrentOccupancyPercentVal, true)}>35%</option>
                                            <option value="40%" selected={selectedVal('40%', propertyDetailsCurrentOccupancyPercentVal, true)}>40%</option>
                                            <option value="45%" selected={selectedVal('45%', propertyDetailsCurrentOccupancyPercentVal, true)}>45%</option>
                                            <option value="50%" selected={selectedVal('50%', propertyDetailsCurrentOccupancyPercentVal, true)}>50%</option>
                                            <option value="55%" selected={selectedVal('55%', propertyDetailsCurrentOccupancyPercentVal, true)}>55%</option>
                                            <option value="60%" selected={selectedVal('60%', propertyDetailsCurrentOccupancyPercentVal, true)}>60%</option>
                                            <option value="65%" selected={selectedVal('65%', propertyDetailsCurrentOccupancyPercentVal, true)}>65%</option>
                                            <option value="70%" selected={selectedVal('70%', propertyDetailsCurrentOccupancyPercentVal, true)}>70%</option>
                                            <option value="75%" selected={selectedVal('75%', propertyDetailsCurrentOccupancyPercentVal, true)}>75%</option>
                                            <option value="80%" selected={selectedVal('80%', propertyDetailsCurrentOccupancyPercentVal, true)}>80%</option>
                                            <option value="85%" selected={selectedVal('85%', propertyDetailsCurrentOccupancyPercentVal, true)}>85%</option>
                                            <option value="90%" selected={selectedVal('90%', propertyDetailsCurrentOccupancyPercentVal, true)}>90%</option>
                                            <option value="95%" selected={selectedVal('95%', propertyDetailsCurrentOccupancyPercentVal, true)}>95%</option>
                                            <option value="100%" selected={selectedVal('100%', propertyDetailsCurrentOccupancyPercentVal, true)}>100%</option>
                                        </select>
                                    </div>

                                    <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                        <label className="text-grey font-semibold" for="">Construction Status</label>
                                        <input onChange={inputChange} value={propertyDetailsConstructionStatusVal}  name='property_details_construction_status' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>

                                    <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                        <label className="text-grey font-semibold" for="">Year Built</label>
                                        <input onChange={inputChange} value={propertyDetailsYearBuiltVal}  name='property_details_year_built' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                    </div>
                                </div>

                                <div className="mb-[12px]">
                                    <div className="flex items-center flex-1">
                                        <input checked={checkedVal(propertyDetailsPropertyIncludesParkingAreasVal)} onChange={selectPropertyDetails} name='property_details_property_includes_parking_areas' type="checkbox" className="checkbox-custom select-item w-[15px] md:w-[20px] h-[15px] md:h-[20px] rounded-[4px] mr-[10px]" />
                                        <label for="">Property Includes parking Areas</label>
                                    </div>
                                </div>

                                <div className="mb-[12px]">
                                    <div className="flex items-center flex-1">
                                        <input checked={checkedVal(propertyDetailsPropertyHasAHeatedSwimmingPoolVal)} onChange={selectPropertyDetails} name='property_details_property_has_a_heated_swimming_pool' type="checkbox" className="checkbox-custom select-item w-[15px] md:w-[20px] h-[15px] md:h-[20px] rounded-[4px] mr-[10px]" />
                                        <label for="">Property has a heated swimming pool</label>
                                    </div>
                                </div>

                                <div className="mb-[12px]">
                                    <div className="flex items-center flex-1">
                                        <input checked={checkedVal(propertyDetailsPropertyDetailsPropertyHas1OrMoreRetailStoresVal)} onChange={selectPropertyDetails} name='property_details_property_details_property_has_1_or_more_retail_stores' type="checkbox" className="checkbox-custom select-item w-[15px] md:w-[20px] h-[15px] md:h-[20px] rounded-[4px] mr-[10px]" />
                                        <label for="">Property has 1 or more retail stores `{'>'}`5000 s.f. each OR combined retail space `{'>'}`25% of total  building s.f.</label>
                                    </div>

                                    <div className="mt-3">
                                        <div className="w-full mb-[12px] md:mb-[20px] pl-[30px]">
                                            <label className="text-grey font-semibold" for="">Number of individual stores that are over 5,000 square feet in size and have an exterior entrance to the public</label>
                                            <input onChange={inputChange} value={propertyDetailsNumberOfIndividualStoresVal} name='property_details_number_of_individual_stores' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-[12px]">
                                    <div className="flex items-center flex-1">
                                        <input checked={checkedVal(propertyHasOneOrMoreRestaurantsVal)} onChange={selectPropertyDetails} name='property_has_one_or_more_restaurants' type="checkbox" className="checkbox-custom select-item w-[15px] md:w-[20px] h-[15px] md:h-[20px] rounded-[4px] mr-[10px]" />
                                        <label for="">Property has one or more restaurants/cafeterias</label>
                                    </div>


                                </div>

                                <div className="mb-[12px]">
                                    <div className="flex items-center flex-1">
                                        <input checked={checkedVal(propertyDetailsPropertyHasNursingVal)} onChange={selectPropertyDetails} name='property_details_property_has_nursing' type="checkbox" className="checkbox-custom select-item w-[15px] md:w-[20px] h-[15px] md:h-[20px] rounded-[4px] mr-[10px]" />
                                        <label for="">Property has nursing/assisted care facilities</label>
                                    </div>

                                    <div className="mt-3">
                                        <div className="w-full mb-[12px] md:mb-[20px] pl-[30px]">
                                            <label className="text-grey font-semibold" for="">Percentage of units that offer nursing/assisted care (1-100%)</label>
                                            <input onChange={inputChange} value={propertyDetailsPercentageOfUnitsVal}  name='property_details_percentage_of_units' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center my-[50px] hidden">
                                <a href="#" className="text-[10px] md:text-[12px] leading-[12px] md:leading-[15px] font-semibold bg-[#B4B3EF] text-[#4D4BCF] rounded-[10px] p-[10px] md:py-[10px] md:px-[15px] whitespace-nowrap flex items-center">
                                    <span>Generate  Property Use Types</span>
                                </a>
                            </div>
                        </div>

                        {/* <!-- Property  Use Types --> */}
                        <div>
                            <div className="mt-[40px]">
                                <h2 className="text-white text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-medium p-[6px] md:p-[14px] rounded-[10px] bg-[#343538] text-center mb-[16px] md:mb-[20px]">Property  Use Types</h2>

                                <div className="flex flex-wrap justify-end items-center my-[50px]">
                                    <img className="spinner w-[30px] h-[30px]" src="./images/common/spiner.gif" alt="" />
                                    <select disabled id='usetypes' className='mr-3 border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]'>
                                        <option value={""}>--Select--</option>
                                        {Object.entries(useTypes).map(([key, value]) => (
                                            <option key={key} value={key}>
                                                {key}
                                            </option>
                                          ))}
                                    </select>
                                    <a onClick={createUseType} className="cursor-pointer text-[10px] md:text-[12px] leading-[12px] md:leading-[15px] font-semibold bg-[#B4B3EF] text-[#4D4BCF] rounded-[10px] p-[10px] md:py-[10px] md:px-[15px] whitespace-nowrap flex items-center">
                                        <span>Create New Use Type</span>
                                    </a>
                                </div>

                                <div id='usetype_created'>
                                    {Object.entries(usetypeCreatedHtml).map(([key, value]) => (
                                            <div dangerouslySetInnerHTML={{ __html: value}}></div>
                                          ))}
                                </div>

                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center my-[50px]">
                            <a id='btn_next_section' onClick={changeTabUtilityData} href="#" className="text-[15px] md:text-[20px] leading-[12px] md:leading-[15px] font-semibold bg-[#B4B3EF] text-[#4D4BCF] rounded-[10px] p-[15px] md:py-[20px] md:px-[20px] whitespace-nowrap flex items-center">
                                <span>Continue to next section</span>
                            </a>
                        </div>
                    </div>

                    <div className={tabType == "utility_data" ? "" : "hidden"}>
                        {/* <!-- Benchmarking Information --> */}
                        <div>
                            <div className="mt-[40px]">
                                <h2 className="text-white text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-medium p-[6px] md:p-[14px] rounded-[10px] bg-[#343538] text-center mb-[16px] md:mb-[20px]">Benchmarking Information</h2>

                                {/* <!-- Available Energy Sources--> */}
                                <div className="block-collapse-wrap mb-[20px] md:mb-[40px]">
                                    <h3 className="text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-semibold mb-[10px] md:mb-[20px]">
                                        <div className="collapse-title inline-flex cursor-pointer">
                                            <span>Available Energy Sources</span>
                                            <img className="ml-[10px]" src="./images/common/chevron.down.svg" alt="" />
                                        </div>
                                    </h3>

                                    <div className="block-collapsed flex flex-wrap mx-[-5px]">
                                        <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                            <label className="text-grey font-semibold" for="">Electricity</label>
                                            <input onChange={inputChange} value={availableEnergySourcesElectricityVal}  name='available_energy_sources_electricity' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                        </div>

                                        <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                            <label className="text-grey font-semibold" for="">Natural Gas</label>
                                            <input onChange={inputChange} value={availableEnergySourcesNaturalGasVal} name='available_energy_sources_natural_gas' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                        </div>

                                        <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                            <label className="text-grey font-semibold" for="">Natural Gas Provider</label>
                                            <input onChange={inputChange} value={availableEnergySourcesNaturalGasProviderVal} name='available_energy_sources_natural_gas_provider' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                        </div>

                                        <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                            <label className="text-grey font-semibold" for="">Fuel Oil</label>
                                            <input onChange={inputChange} value={availableEnergySourcesFuelOilVal}  name='available_energy_sources_fuel_oil' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Utility Account Information --> */}
                                <div className="block-collapse-wrap mb-[20px] md:mb-[40px]">
                                    <h3 className="text-[16px] md:text-[20px] leading-[20px] md:leading-[24px] font-semibold mb-[10px] md:mb-[20px]">
                                        <div className="collapse-title inline-flex cursor-pointer">
                                            <span>Utility Account Information</span>
                                            <img className="ml-[10px]" src="./images/common/chevron.down.svg" alt="" />
                                        </div>
                                    </h3>

                                    <div className="block-collapsed flex flex-wrap mx-[-5px]">
                                        <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                            <label className="text-grey font-semibold" for="">Electric Account Number</label>
                                            <input onChange={inputChange} value={utilityAccountInformationElectricAccountNumberVal}  name='utility_account_information_electric_account_number' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                        </div>

                                        <div className="w-full lg:w-[calc(100%_/_3)] mb-[12px] md:mb-[20px] px-[5px]">
                                            <label className="text-grey font-semibold" for="">Natural Gas Account Number</label>
                                            <input onChange={inputChange} value={utilityAccountInformationNaturalGasAccountNumberVal}  name='utility_account_information_natural_gas_account_number' type="text" placeholder="Enter Value" className="w-full border border-solid border-[#DADADB] rounded-[8px] py-[5px] md:py-[8px] px-[12px] md:px-[15px] mt-[5px] text-[12px] md:text-[16px] leading-[15px] md:leading-[20px]" />
                                        </div>

                                        <div className="w-full mb-[12px] md:mb-[20px] px-[5px]">
                                            <label className="text-grey font-semibold" for="">Months in Use</label>

                                            <div className="grid xl:grid-flow-col xl:grid-rows-1 xl:grid-cols-[auto_55%] md:gap-x-[30px] gap-y-[10px] md:gap-y-[20px] mt-[15px]">

                                                {/* <!-- Property Image --> */}
                                                <div className="upload-area-wrap relative bg-greywhite px-[16px] py-[20px] md:p-[40px] rounded-[10px]
                                         text-white border-dashed border border-grey flex justify-center items-center overflow-hidden min-h-[200px]">
                                                    <div className="text-center inline-block">
                                                        <div className="mb-[10px]">
                                                            <label for="property-image" className="flex justify-center items-center cursor-pointer">
                                                                <img className="mr-[5px]" src="./images/common/attach.svg" alt="" />
                                                                <span className="text-[12px] leading-[15px] text-[#36AFE2] font-normal underline">Select a file to upload</span>
                                                            </label>
                                                            <input type="file" name="months_in_use_image" id="property-image" accept="" hidden="true" />
                                                        </div>
                                                        <p className="text-[12px] leading-[10px] text-grey">Or drag and drop it here</p>
                                                    </div>

                                                    <div className="property-image-uploaded w-full h-full absolute hidden">
                                                        <div className="uploaded-image-wrap w-full h-full">
                                                            <img className=" w-full h-full object-contain bg-greywhite" src="" alt="" />
                                                        </div>
                                                        <div className="edit-image-wrap absolute top-0 right-0 p-[10px]">
                                                            <span className="edit-image flex justify-end">
                                                                <img className="w-[15px] h-[15px] cursor-pointer" src="./images/common/pencil.svg" alt="" />
                                                            </span>
                                                            <ul className="upload-action-wrap hidden bg-[#343538] rounded-[10px] p-[10px] mt-[8px]">
                                                                <li className="text-[10px] leading-[12px] flex items-center mb-[10px]">
                                                                    <a href="#" className=" flex items-center">
                                                                        <img className="w-[10px] h-[10px] mr-[4px]" src="./images/common/attach.svg" alt="" />
                                                                        <span>Upload New File</span>
                                                                    </a>
                                                                </li>
                                                                <li className="text-[10px] leading-[12px]">
                                                                    <a href="#" className=" flex items-center">
                                                                        <img className="w-[10px] h-[10px] mr-[4px]" src="./images/common/remove.svg" alt="" />
                                                                        <span>Remove Image</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center my-[50px]">
                            <button id='btn_submit_form' type='submit' className="text-[15px] md:text-[20px] leading-[12px] md:leading-[15px] font-semibold bg-[#B4B3EF] text-[#4D4BCF] rounded-[10px] p-[15px] md:py-[20px] md:px-[20px] whitespace-nowrap flex items-center">
                                <span>Submit Questionnaire</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FormPage;
