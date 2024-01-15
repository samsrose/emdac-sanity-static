var simplemaps_statemap_mapdata={
    main_settings: {
     //General settings
      width: "responsive", //'700' or 'responsive'
      background_color: "#FFFFFF",
      background_transparent: "yes",
      popups: "detect",
      
      //State defaults
      state_description: "State description",
      state_color: "#88A4BC",
      state_hover_color: "#3B729F",
      state_url: "https://emdac.org",
      border_size: "1",
      border_color: "#ffffff",
      all_states_inactive: "no",
      all_states_zoomable: "no",
      
      //Location defaults
      location_description: "Location description",
      location_color: "#FF0067",
      location_opacity: 0.8,
      location_hover_opacity: 1,
      location_url: "",
      location_size: 25,
      location_type: "square",
      location_border_color: "#FFFFFF",
      location_border: 2,
      location_hover_border: 2.5,
      all_locations_inactive: "no",
      all_locations_hidden: "no",
      
      //Label defaults
      label_color: "#ffffff",
      label_hover_color: "#ffffff",
      label_size: 22,
      label_font: "Arial",
      hide_labels: "no",
      hide_eastern_labels: false,
      manual_zoom: "yes",
      back_image: "no",
      arrow_box: "no",
      navigation_size: "40",
      navigation_color: "#f7f7f7",
      navigation_border_color: "#636363",
      initial_back: "no",
      initial_zoom: -1,
      initial_zoom_solo: "no",
      region_opacity: 1,
      region_hover_opacity: 0.6,
      zoom_out_incrementally: "yes",
      zoom_percentage: 0.99,
      zoom_time: 0.5,
      
      //Popup settings
      popup_color: "white",
      popup_opacity: 0.9,
      popup_shadow: 1,
      popup_corners: 5,
      popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
      popup_nocss: "no",
      
      //Advanced settings
      div: "map",
      auto_load: "yes",
      rotate: "0",
      url_new_tab: "yes",
      images_directory: "default",
      import_labels: "no",
      fade_time: 0.1,
      link_text: "View Website",
      state_image_url: "",
      state_image_position: "",
      location_image_url: "",
      border_hover_size: "2"
    },
    state_specific: {
      "06001": {
        name: "Alameda",
        color: "#3B729F",
        url: "http://ems.acgov.org/",
        description: "Karl Sporer, MD, FACEP, FACP",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06003": {
        name: "Alpine",
        color: "rgba(244, 114, 182,1)",
        url: "http://www.mvemsa.org/",
        description: "Kim Freeman, MD",
        zoomable: "no"
      },
      "06005": {
        name: "Amador",
        color: "rgba(244, 114, 182,1)",
        url: "http://www.mvemsa.org/",
        description: "Kim Freeman, MD",
        zoomable: "no"
      },
      "06007": {
        name: "Butte",
        color: "rgba(139, 92, 246,1)",
        url: "http://www.ssvems.com/",
        description: "Troy Falck, MD, FACEP, FAAEM",
        zoomable: "no"
      },
      "06009": {
        name: "Calaveras",
        color: "rgba(244, 114, 182,1)",
        url: "http://www.mvemsa.org/",
        description: "Kim Freeman, MD",
        zoomable: "no"
      },
      "06011": {
        name: "Colusa",
        color: "rgba(139, 92, 246,1)",
        url: "http://www.ssvems.com/",
        description: "Troy Falck, MD, FACEP, FAAEM",
        zoomable: "no"
      },
      "06013": {
        name: "Contra Costa",
        color: "#3B729F",
        url: "https://cchealth.org/ems/",
        description: "Senai Kidane, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06015": {
        name: "Del Norte",
        color: "rgba(239, 68, 68,1)",
        url: "http://www.northcoastems.com/",
        description: "Matthew Karp, MD",
        zoomable: "no"
      },
      "06017": {
        name: "El Dorado",
        color: "#3B729F",
        url: "https://www.edcgov.us/ems",
        description: "Dave Duncan, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06019": {
        name: "Fresno",
        color: "rgba(96, 165, 250,1)",
        url: "http://www.co.fresno.ca.us/departments/public-health/emergency-medical-services",
        description: "Jim Andrews, MD",
        zoomable: "no"
      },
      "06021": {
        name: "Glenn",
        color: "rgba(139, 92, 246,1)",
        url: "http://www.ssvems.com/",
        description: "Troy Falck, MD, FACEP, FAAEM",
        zoomable: "no"
      },
      "06023": {
        name: "Humboldt",
        color: "rgba(239, 68, 68,1)",
        url: "http://www.northcoastems.com/",
        description: "Matthew Karp, MD",
        zoomable: "no"
      },
      "06025": {
        name: "Imperial",
        color: "#3B729F",
        url: "http://www.icphd.org/emergency-medical-services/",
        description: "Kathy Staats, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06027": {
        name: "Inyo",
        color: "rgba(5, 150, 105,1)",
        url: "http://www.sbcounty.gov/icema/main/default.aspx",
        description: "Reza Vaezazizi, MD, FACEP",
        zoomable: "no"
      },
      "06029": {
        name: "Kern",
        color: "#3B729F",
        url: "http://kernpublichealth.com/ems/",
        description: "Kristopher L. Lyon, MD, FACEP",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06031": {
        name: "Kings",
        color: "rgba(96, 165, 250,1)",
        url: "http://www.co.fresno.ca.us/departments/public-health/emergency-medical-services",
        description: "Jim Andrews, MD",
        zoomable: "no"
      },
      "06033": {
        name: "Lake",
        color: "rgba(239, 68, 68,1)",
        url: "http://www.northcoastems.com/",
        description: "Matthew Karp, MD",
        zoomable: "no"
      },
      "06035": {
        name: "Lassen",
        color: "rgba(245, 158, 11,1)",
        url: "http://www.norcalems.org/",
        description: "Jeffrey Kepple, MD",
        zoomable: "no"
      },
      "06037": {
        name: "Los Angeles",
        color: "#3B729F",
        url: "http://dhs.lacounty.gov/wps/portal/dhs/ems/",
        description: "Marianne Gausche-Hill, MD, FACEP, FAAP, FAEMS",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06039": {
        name: "Madera",
        color: "rgba(96, 165, 250,1)",
        url: "http://www.co.fresno.ca.us/departments/public-health/emergency-medical-services",
        description: "Jim Andrews, MD",
        zoomable: "no"
      },
      "06041": {
        name: "Marin",
        color: "#3B729F",
        url: "https://ems.marinhhs.org/",
        description: "Dustin Ballard, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06043": {
        name: "Mariposa",
        color: "rgba(244, 114, 182,1)",
        url: "http://www.mvemsa.org/",
        description: "Kim Freeman, MD",
        zoomable: "no"
      },
      "06045": {
        name: "Mendocino",
        color: "#3B729F",
        url: "https://www.coastalvalleysems.org/",
        description: "Mark Luoto, MD, FACEP",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06047": {
        name: "Merced",
        color: "#3B729F",
        url: "http://www.co.merced.ca.us/2261/Emergency-Medical-Services",
        description: "Ajinder Singh, MD, CPE",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06049": {
        name: "Modoc",
        color: "rgba(245, 158, 11,1)",
        url: "http://www.norcalems.org/",
        description: "Jeffrey Kepple, MD",
        zoomable: "no"
      },
      "06051": {
        name: "Mono",
        color: "rgba(5, 150, 105,1)",
        url: "http://www.sbcounty.gov/icema/main/default.aspx",
        description: "Reza Vaezazizi, MD, FACEP",
        zoomable: "no"
      },
      "06053": {
        name: "Monterey",
        color: "#3B729F",
        url: "https://www.sjgov.org/ems/",
        description: "John Beuerle, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06055": {
        name: "Napa",
        color: "#3B729F",
        url: "https://www.countyofnapa.org/756/Emergency-Medical-Services-EMS-Agency",
        description: "Zita Konik, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06057": {
        name: "Nevada",
        color: "rgba(139, 92, 246,1)",
        url: "http://www.ssvems.com/",
        description: "Troy Falck, MD, FACEP, FAAEM",
        zoomable: "no"
      },
      "06059": {
        name: "Orange",
        color: "#3B729F",
        url: "/",
        description: "Carl H. Schultz, MD, FACEP, FAAEM",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06061": {
        name: "Placer",
        color: "rgba(139, 92, 246,1)",
        url: "http://www.ssvems.com/",
        description: "Troy Falck, MD, FACEP, FAAEM",
        zoomable: "no"
      },
      "06063": {
        name: "Plumas",
        color: "rgba(245, 158, 11,1)",
        url: "http://www.norcalems.org/",
        description: "Jeffrey Kepple, MD",
        zoomable: "no"
      },
      "06065": {
        name: "Riverside",
        color: "#3B729F",
        description: "Reza Vaezazizi, MD, FACEP",
        url: "https://www.rivcoems.org/",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06067": {
        name: "Sacramento",
        color: "#3B729F",
        url: "https://dhs.saccounty.gov/PRI/EMS/Pages/EMS-Home.aspx",
        description: "Greg Kann, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06069": {
        name: "San Benito",
        color: "#3B729F",
        url: "https://www.cosb.us/departments/office-of-emergency-services-oes-and-emergency-medical-services/emergency-medical-services-ems",
        description: "Dave Ghilarducci, MD, FACEP",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06071": {
        name: "San Bernardino",
        color: "rgba(5, 150, 105,1)",
        url: "http://www.sbcounty.gov/icema/main/default.aspx",
        description: "Reza Vaezazizi, MD, FACEP",
        zoomable: "no"
      },
      "06073": {
        name: "San Diego",
        color: "#3B729F",
        url: "https://www.sandiegocounty.gov/content/sdc/ems.html",
        description: "Kristi Koenig, MD, FACEP",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06075": {
        name: "San Francisco",
        color: "#3B729F",
        url: "https://www.sfdph.org/dph/comupg/oservices/emergency/default.asp",
        description: "John Brown, MD, MPA, FACEP",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06077": {
        name: "San Joaquin",
        color: "#3B729F",
        url: "https://www.sjgov.org/ems/",
        description: "Katherine A. Shafer, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06079": {
        name: "San Luis Obispo",
        color: "#3B729F",
        url: "http://www.sloemsa.org/",
        description: "Thomas G. Ronay, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06081": {
        name: "San Mateo",
        color: "#3B729F",
        url: "https://www.smchealth.org/services-emergency-medical",
        description: "Gregory H. Gilbert, MD, FAAEM",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06083": {
        name: "Santa Barbara",
        color: "#3B729F",
        url: "https://countyofsb.org/phd/ems/ems-home.sbc",
        description: "Daniel Shepherd, M.D.",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06085": {
        name: "Santa Clara",
        color: "#3B729F",
        url: "https://www.sccgov.org/sites/ems/Pages/ems.aspx",
        description: "Kenneth Miller, MD, PhD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06087": {
        name: "Santa Cruz",
        color: "#3B729F",
        url: "http://www.santacruzhealth.org/HSAHome/HSADivisions/PublicHealth/EmergencyMedicalServices.aspx",
        description: "David Ghilarducci, MD, FACEP",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06089": {
        name: "Shasta",
        color: "rgba(139, 92, 246,1)",
        url: "http://www.ssvems.com/",
        description: "Troy Falck, MD, FACEP, FAAEM",
        zoomable: "no"
      },
      "06091": {
        name: "Sierra",
        color: "rgba(245, 158, 11,1)",
        url: "http://www.norcalems.org/",
        description: "Jeffrey Kepple, MD",
        zoomable: "no"
      },
      "06093": {
        name: "Siskiyou",
        color: "rgba(139, 92, 246,1)",
        url: "http://www.ssvems.com/",
        description: "Troy Falck, MD, FACEP, FAAEM",
        zoomable: "no"
      },
      "06095": {
        name: "Solano",
        color: "#3B729F",
        url: "http://www.solanocounty.com/depts/ems/",
        description: "Pranav Shetty",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06097": {
        name: "Sonoma",
        color: "#3B729F",
        url: "https://www.coastalvalleysems.org/",
        description: "Mark Luoto, MD, FACEP",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06099": {
        name: "Stanislaus",
        color: "#3B729F",
        url: "http://www.mvemsa.org/",
        description: "Alex Schmalz, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06101": {
        name: "Sutter",
        color: "rgba(139, 92, 246,1)",
        url: "http://www.ssvems.com/",
        description: "Troy Falck, MD, FACEP, FAAEM",
        zoomable: "no"
      },
      "06103": {
        name: "Tehama",
        color: "rgba(245, 158, 11,1)",
        url: "http://www.ssvems.com/",
        description: "Troy Falck, MD, FACEP, FAAEM",
        zoomable: "no"
      },
      "06105": {
        name: "Trinity",
        color: "rgba(139, 92, 246,1)",
        url: "http://www.norcalems.org/",
        description: "Jeffrey Kepple, MD",
        zoomable: "no"
      },
      "06107": {
        name: "Tulare",
        color: "rgba(96, 165, 250,1)",
        url: "http://www.co.fresno.ca.us/departments/public-health/emergency-medical-services",
        description: "Jim Andrews, MD",
        zoomable: "no"
      },
      "06109": {
        name: "Tuolumne",
        color: "#3B729F",
        url: "https://www.tuolumnecounty.ca.gov/302/Emergency-Medical-Services",
        description: "Kimberly Freeman, MD, FACEP, NREMT-P",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06111": {
        name: "Ventura",
        color: "#3B729F",
        url: "http://www.vchca.org/ems",
        description: "Daniel Shepherd, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06113": {
        name: "Yolo",
        color: "#3B729F",
        url: "http://www.yolocounty.org/health-human-services/providers-partners/yolo-emergency-medical-services-agency-yemsa",
        description: "John Rose, MD",
        zoomable: "no",
        hover_color: "#3B729F"
      },
      "06115": {
        name: "Yuba",
        color: "#3B729F",
        url: "http://www.ssvems.com/",
        description: "Troy Falck, MD, FACEP, FAAEM",
        zoomable: "no",
        hover_color: "#3B729F"
      }
    },
    locations: {},
    labels: {},
    legend: {
      entries: []
    },
    regions: {
      "0": {
        states: [
          "06027",
          "06051",
          "06071"
        ],
        name: "Inland Counties EMS",
        color: "#059669",
        description: "Reza Vaezazizi, MD, FACEP",
        url: "http://www.sbcounty.gov/icema/main/default.aspx",
        zoomable: "no"
      },
      "1": {
        states: [
          "06039",
          "06019",
          "06031",
          "06107"
        ],
        name: "Central California EMS",
        color: "#60a5fa",
        zoomable: "no",
        description: "Jim Andrews, MD",
        url: "http://www.co.fresno.ca.us/departments/public-health/emergency-medical-services"
      },
      "2": {
        states: [
          "06043",
          "06009",
          "06005",
          "06003"
        ],
        name: "Mountain Valley EMS",
        color: "#f472b6",
        zoomable: "no",
        description: "Kim Freeman, MD",
        url: "http://www.mvemsa.org/"
      },
      "3": {
        states: [
          "06023",
          "06033",
          "06015"
        ],
        name: "North Coast EMS",
        color: "#ef4444",
        description: "Matthew Karp, MD",
        url: "http://www.northcoastems.com/",
        zoomable: "no"
      },
      "4": {
        states: [
          "06049",
          "06035",
          "06103",
          "06103",
          "06063",
          "06091"
        ],
        name: "Northern California EMS",
        zoomable: "no",
        color: "#f59e0b",
        description: "Jeffrey Kepple, MD",
        url: "http://www.norcalems.org/"
      },
      "5": {
        states: [
          "06093",
          "06105",
          "06089",
          "06021",
          "06021",
          "06007",
          "06011",
          "06101",
          "06057",
          "06061"
        ],
        name: "Sierra-Sacramento EMS",
        zoomable: "no",
        description: "Troy Falck, MD, FACEP, FAAEM",
        color: "#8b5cf6",
        url: "http://www.ssvems.com/"
      }
    }
  };