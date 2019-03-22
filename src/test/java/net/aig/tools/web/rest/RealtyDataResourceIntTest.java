package net.aig.tools.web.rest;

import net.aig.tools.TestApp;

import net.aig.tools.domain.RealtyData;
import net.aig.tools.domain.Site;
import net.aig.tools.repository.RealtyDataRepository;
import net.aig.tools.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static net.aig.tools.web.rest.TestUtil.sameInstant;
import static net.aig.tools.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RealtyDataResource REST controller.
 *
 * @see RealtyDataResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestApp.class)
public class RealtyDataResourceIntTest {

    private static final String DEFAULT_WORLD_REGION = "AAAAAAAAAA";
    private static final String UPDATED_WORLD_REGION = "BBBBBBBBBB";

    private static final String DEFAULT_REGION = "AAAAAAAAAA";
    private static final String UPDATED_REGION = "BBBBBBBBBB";

    private static final String DEFAULT_SUBREGION = "AAAAAAAAAA";
    private static final String UPDATED_SUBREGION = "BBBBBBBBBB";

    private static final String DEFAULT_DEVICE_REGION = "AAAAAAAAAA";
    private static final String UPDATED_DEVICE_REGION = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY_ISO_2 = "AA";
    private static final String UPDATED_COUNTRY_ISO_2 = "BB";

    private static final String DEFAULT_COUNTRY_ISO_3 = "AAA";
    private static final String UPDATED_COUNTRY_ISO_3 = "BBB";

    private static final String DEFAULT_STATE_ABBREV = "AAAAAAAAAA";
    private static final String UPDATED_STATE_ABBREV = "BBBBBBBBBB";

    private static final String DEFAULT_STATE_FULL = "AAAAAAAAAA";
    private static final String UPDATED_STATE_FULL = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COMMON_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMMON_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_1 = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final Double DEFAULT_LATITUDE = 1D;
    private static final Double UPDATED_LATITUDE = 2D;

    private static final Double DEFAULT_LONGITUDE = 1D;
    private static final Double UPDATED_LONGITUDE = 2D;

    private static final String DEFAULT_BUILDING_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_BUILDING_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_PRIMARY_USE = "AAAAAAAAAA";
    private static final String UPDATED_PRIMARY_USE = "BBBBBBBBBB";

    private static final Long DEFAULT_CAPACITY = 1L;
    private static final Long UPDATED_CAPACITY = 2L;

    private static final Long DEFAULT_HEADCOUNT = 1L;
    private static final Long UPDATED_HEADCOUNT = 2L;

    private static final Long DEFAULT_OCCUPIED = 1L;
    private static final Long UPDATED_OCCUPIED = 2L;

    private static final String DEFAULT_COLOCATION = "AAAAAAAAAA";
    private static final String UPDATED_COLOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_FACILITY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FACILITY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BUILDING_IMAGE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_BUILDING_IMAGE_PATH = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_UPDATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_UPDATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_DELETED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DELETED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private RealtyDataRepository realtyDataRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRealtyDataMockMvc;

    private RealtyData realtyData;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RealtyDataResource realtyDataResource = new RealtyDataResource(realtyDataRepository);
        this.restRealtyDataMockMvc = MockMvcBuilders.standaloneSetup(realtyDataResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RealtyData createEntity(EntityManager em) {
        RealtyData realtyData = new RealtyData()
            .worldRegion(DEFAULT_WORLD_REGION)
            .region(DEFAULT_REGION)
            .subregion(DEFAULT_SUBREGION)
            .deviceRegion(DEFAULT_DEVICE_REGION)
            .country(DEFAULT_COUNTRY)
            .countryIso2(DEFAULT_COUNTRY_ISO_2)
            .countryIso3(DEFAULT_COUNTRY_ISO_3)
            .stateAbbrev(DEFAULT_STATE_ABBREV)
            .stateFull(DEFAULT_STATE_FULL)
            .city(DEFAULT_CITY)
            .commonName(DEFAULT_COMMON_NAME)
            .address1(DEFAULT_ADDRESS_1)
            .postalCode(DEFAULT_POSTAL_CODE)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE)
            .buildingStatus(DEFAULT_BUILDING_STATUS)
            .primaryUse(DEFAULT_PRIMARY_USE)
            .capacity(DEFAULT_CAPACITY)
            .headcount(DEFAULT_HEADCOUNT)
            .occupied(DEFAULT_OCCUPIED)
            .colocation(DEFAULT_COLOCATION)
            .facilityName(DEFAULT_FACILITY_NAME)
            .buildingImagePath(DEFAULT_BUILDING_IMAGE_PATH)
            .updatedAt(DEFAULT_UPDATED_AT)
            .deletedAt(DEFAULT_DELETED_AT);
        // Add required entity
        Site site = SiteResourceIntTest.createEntity(em);
        em.persist(site);
        em.flush();
        realtyData.setSite(site);
        return realtyData;
    }

    @Before
    public void initTest() {
        realtyData = createEntity(em);
    }

    @Test
    @Transactional
    public void createRealtyData() throws Exception {
        int databaseSizeBeforeCreate = realtyDataRepository.findAll().size();

        // Create the RealtyData
        restRealtyDataMockMvc.perform(post("/api/realty-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(realtyData)))
            .andExpect(status().isCreated());

        // Validate the RealtyData in the database
        List<RealtyData> realtyDataList = realtyDataRepository.findAll();
        assertThat(realtyDataList).hasSize(databaseSizeBeforeCreate + 1);
        RealtyData testRealtyData = realtyDataList.get(realtyDataList.size() - 1);
        assertThat(testRealtyData.getWorldRegion()).isEqualTo(DEFAULT_WORLD_REGION);
        assertThat(testRealtyData.getRegion()).isEqualTo(DEFAULT_REGION);
        assertThat(testRealtyData.getSubregion()).isEqualTo(DEFAULT_SUBREGION);
        assertThat(testRealtyData.getDeviceRegion()).isEqualTo(DEFAULT_DEVICE_REGION);
        assertThat(testRealtyData.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testRealtyData.getCountryIso2()).isEqualTo(DEFAULT_COUNTRY_ISO_2);
        assertThat(testRealtyData.getCountryIso3()).isEqualTo(DEFAULT_COUNTRY_ISO_3);
        assertThat(testRealtyData.getStateAbbrev()).isEqualTo(DEFAULT_STATE_ABBREV);
        assertThat(testRealtyData.getStateFull()).isEqualTo(DEFAULT_STATE_FULL);
        assertThat(testRealtyData.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testRealtyData.getCommonName()).isEqualTo(DEFAULT_COMMON_NAME);
        assertThat(testRealtyData.getAddress1()).isEqualTo(DEFAULT_ADDRESS_1);
        assertThat(testRealtyData.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testRealtyData.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testRealtyData.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testRealtyData.getBuildingStatus()).isEqualTo(DEFAULT_BUILDING_STATUS);
        assertThat(testRealtyData.getPrimaryUse()).isEqualTo(DEFAULT_PRIMARY_USE);
        assertThat(testRealtyData.getCapacity()).isEqualTo(DEFAULT_CAPACITY);
        assertThat(testRealtyData.getHeadcount()).isEqualTo(DEFAULT_HEADCOUNT);
        assertThat(testRealtyData.getOccupied()).isEqualTo(DEFAULT_OCCUPIED);
        assertThat(testRealtyData.getColocation()).isEqualTo(DEFAULT_COLOCATION);
        assertThat(testRealtyData.getFacilityName()).isEqualTo(DEFAULT_FACILITY_NAME);
        assertThat(testRealtyData.getBuildingImagePath()).isEqualTo(DEFAULT_BUILDING_IMAGE_PATH);
        assertThat(testRealtyData.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
        assertThat(testRealtyData.getDeletedAt()).isEqualTo(DEFAULT_DELETED_AT);
    }

    @Test
    @Transactional
    public void createRealtyDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = realtyDataRepository.findAll().size();

        // Create the RealtyData with an existing ID
        realtyData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRealtyDataMockMvc.perform(post("/api/realty-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(realtyData)))
            .andExpect(status().isBadRequest());

        // Validate the RealtyData in the database
        List<RealtyData> realtyDataList = realtyDataRepository.findAll();
        assertThat(realtyDataList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUpdatedAtIsRequired() throws Exception {
        int databaseSizeBeforeTest = realtyDataRepository.findAll().size();
        // set the field null
        realtyData.setUpdatedAt(null);

        // Create the RealtyData, which fails.

        restRealtyDataMockMvc.perform(post("/api/realty-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(realtyData)))
            .andExpect(status().isBadRequest());

        List<RealtyData> realtyDataList = realtyDataRepository.findAll();
        assertThat(realtyDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllRealtyData() throws Exception {
        // Initialize the database
        realtyDataRepository.saveAndFlush(realtyData);

        // Get all the realtyDataList
        restRealtyDataMockMvc.perform(get("/api/realty-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(realtyData.getId().intValue())))
            .andExpect(jsonPath("$.[*].worldRegion").value(hasItem(DEFAULT_WORLD_REGION.toString())))
            .andExpect(jsonPath("$.[*].region").value(hasItem(DEFAULT_REGION.toString())))
            .andExpect(jsonPath("$.[*].subregion").value(hasItem(DEFAULT_SUBREGION.toString())))
            .andExpect(jsonPath("$.[*].deviceRegion").value(hasItem(DEFAULT_DEVICE_REGION.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].countryIso2").value(hasItem(DEFAULT_COUNTRY_ISO_2.toString())))
            .andExpect(jsonPath("$.[*].countryIso3").value(hasItem(DEFAULT_COUNTRY_ISO_3.toString())))
            .andExpect(jsonPath("$.[*].stateAbbrev").value(hasItem(DEFAULT_STATE_ABBREV.toString())))
            .andExpect(jsonPath("$.[*].stateFull").value(hasItem(DEFAULT_STATE_FULL.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].commonName").value(hasItem(DEFAULT_COMMON_NAME.toString())))
            .andExpect(jsonPath("$.[*].address1").value(hasItem(DEFAULT_ADDRESS_1.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].buildingStatus").value(hasItem(DEFAULT_BUILDING_STATUS.toString())))
            .andExpect(jsonPath("$.[*].primaryUse").value(hasItem(DEFAULT_PRIMARY_USE.toString())))
            .andExpect(jsonPath("$.[*].capacity").value(hasItem(DEFAULT_CAPACITY.intValue())))
            .andExpect(jsonPath("$.[*].headcount").value(hasItem(DEFAULT_HEADCOUNT.intValue())))
            .andExpect(jsonPath("$.[*].occupied").value(hasItem(DEFAULT_OCCUPIED.intValue())))
            .andExpect(jsonPath("$.[*].colocation").value(hasItem(DEFAULT_COLOCATION.toString())))
            .andExpect(jsonPath("$.[*].facilityName").value(hasItem(DEFAULT_FACILITY_NAME.toString())))
            .andExpect(jsonPath("$.[*].buildingImagePath").value(hasItem(DEFAULT_BUILDING_IMAGE_PATH.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(sameInstant(DEFAULT_UPDATED_AT))))
            .andExpect(jsonPath("$.[*].deletedAt").value(hasItem(sameInstant(DEFAULT_DELETED_AT))));
    }
    
    @Test
    @Transactional
    public void getRealtyData() throws Exception {
        // Initialize the database
        realtyDataRepository.saveAndFlush(realtyData);

        // Get the realtyData
        restRealtyDataMockMvc.perform(get("/api/realty-data/{id}", realtyData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(realtyData.getId().intValue()))
            .andExpect(jsonPath("$.worldRegion").value(DEFAULT_WORLD_REGION.toString()))
            .andExpect(jsonPath("$.region").value(DEFAULT_REGION.toString()))
            .andExpect(jsonPath("$.subregion").value(DEFAULT_SUBREGION.toString()))
            .andExpect(jsonPath("$.deviceRegion").value(DEFAULT_DEVICE_REGION.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.countryIso2").value(DEFAULT_COUNTRY_ISO_2.toString()))
            .andExpect(jsonPath("$.countryIso3").value(DEFAULT_COUNTRY_ISO_3.toString()))
            .andExpect(jsonPath("$.stateAbbrev").value(DEFAULT_STATE_ABBREV.toString()))
            .andExpect(jsonPath("$.stateFull").value(DEFAULT_STATE_FULL.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.commonName").value(DEFAULT_COMMON_NAME.toString()))
            .andExpect(jsonPath("$.address1").value(DEFAULT_ADDRESS_1.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.buildingStatus").value(DEFAULT_BUILDING_STATUS.toString()))
            .andExpect(jsonPath("$.primaryUse").value(DEFAULT_PRIMARY_USE.toString()))
            .andExpect(jsonPath("$.capacity").value(DEFAULT_CAPACITY.intValue()))
            .andExpect(jsonPath("$.headcount").value(DEFAULT_HEADCOUNT.intValue()))
            .andExpect(jsonPath("$.occupied").value(DEFAULT_OCCUPIED.intValue()))
            .andExpect(jsonPath("$.colocation").value(DEFAULT_COLOCATION.toString()))
            .andExpect(jsonPath("$.facilityName").value(DEFAULT_FACILITY_NAME.toString()))
            .andExpect(jsonPath("$.buildingImagePath").value(DEFAULT_BUILDING_IMAGE_PATH.toString()))
            .andExpect(jsonPath("$.updatedAt").value(sameInstant(DEFAULT_UPDATED_AT)))
            .andExpect(jsonPath("$.deletedAt").value(sameInstant(DEFAULT_DELETED_AT)));
    }

    @Test
    @Transactional
    public void getNonExistingRealtyData() throws Exception {
        // Get the realtyData
        restRealtyDataMockMvc.perform(get("/api/realty-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRealtyData() throws Exception {
        // Initialize the database
        realtyDataRepository.saveAndFlush(realtyData);

        int databaseSizeBeforeUpdate = realtyDataRepository.findAll().size();

        // Update the realtyData
        RealtyData updatedRealtyData = realtyDataRepository.findById(realtyData.getId()).get();
        // Disconnect from session so that the updates on updatedRealtyData are not directly saved in db
        em.detach(updatedRealtyData);
        updatedRealtyData
            .worldRegion(UPDATED_WORLD_REGION)
            .region(UPDATED_REGION)
            .subregion(UPDATED_SUBREGION)
            .deviceRegion(UPDATED_DEVICE_REGION)
            .country(UPDATED_COUNTRY)
            .countryIso2(UPDATED_COUNTRY_ISO_2)
            .countryIso3(UPDATED_COUNTRY_ISO_3)
            .stateAbbrev(UPDATED_STATE_ABBREV)
            .stateFull(UPDATED_STATE_FULL)
            .city(UPDATED_CITY)
            .commonName(UPDATED_COMMON_NAME)
            .address1(UPDATED_ADDRESS_1)
            .postalCode(UPDATED_POSTAL_CODE)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .buildingStatus(UPDATED_BUILDING_STATUS)
            .primaryUse(UPDATED_PRIMARY_USE)
            .capacity(UPDATED_CAPACITY)
            .headcount(UPDATED_HEADCOUNT)
            .occupied(UPDATED_OCCUPIED)
            .colocation(UPDATED_COLOCATION)
            .facilityName(UPDATED_FACILITY_NAME)
            .buildingImagePath(UPDATED_BUILDING_IMAGE_PATH)
            .updatedAt(UPDATED_UPDATED_AT)
            .deletedAt(UPDATED_DELETED_AT);

        restRealtyDataMockMvc.perform(put("/api/realty-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRealtyData)))
            .andExpect(status().isOk());

        // Validate the RealtyData in the database
        List<RealtyData> realtyDataList = realtyDataRepository.findAll();
        assertThat(realtyDataList).hasSize(databaseSizeBeforeUpdate);
        RealtyData testRealtyData = realtyDataList.get(realtyDataList.size() - 1);
        assertThat(testRealtyData.getWorldRegion()).isEqualTo(UPDATED_WORLD_REGION);
        assertThat(testRealtyData.getRegion()).isEqualTo(UPDATED_REGION);
        assertThat(testRealtyData.getSubregion()).isEqualTo(UPDATED_SUBREGION);
        assertThat(testRealtyData.getDeviceRegion()).isEqualTo(UPDATED_DEVICE_REGION);
        assertThat(testRealtyData.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testRealtyData.getCountryIso2()).isEqualTo(UPDATED_COUNTRY_ISO_2);
        assertThat(testRealtyData.getCountryIso3()).isEqualTo(UPDATED_COUNTRY_ISO_3);
        assertThat(testRealtyData.getStateAbbrev()).isEqualTo(UPDATED_STATE_ABBREV);
        assertThat(testRealtyData.getStateFull()).isEqualTo(UPDATED_STATE_FULL);
        assertThat(testRealtyData.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testRealtyData.getCommonName()).isEqualTo(UPDATED_COMMON_NAME);
        assertThat(testRealtyData.getAddress1()).isEqualTo(UPDATED_ADDRESS_1);
        assertThat(testRealtyData.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testRealtyData.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testRealtyData.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testRealtyData.getBuildingStatus()).isEqualTo(UPDATED_BUILDING_STATUS);
        assertThat(testRealtyData.getPrimaryUse()).isEqualTo(UPDATED_PRIMARY_USE);
        assertThat(testRealtyData.getCapacity()).isEqualTo(UPDATED_CAPACITY);
        assertThat(testRealtyData.getHeadcount()).isEqualTo(UPDATED_HEADCOUNT);
        assertThat(testRealtyData.getOccupied()).isEqualTo(UPDATED_OCCUPIED);
        assertThat(testRealtyData.getColocation()).isEqualTo(UPDATED_COLOCATION);
        assertThat(testRealtyData.getFacilityName()).isEqualTo(UPDATED_FACILITY_NAME);
        assertThat(testRealtyData.getBuildingImagePath()).isEqualTo(UPDATED_BUILDING_IMAGE_PATH);
        assertThat(testRealtyData.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testRealtyData.getDeletedAt()).isEqualTo(UPDATED_DELETED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingRealtyData() throws Exception {
        int databaseSizeBeforeUpdate = realtyDataRepository.findAll().size();

        // Create the RealtyData

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRealtyDataMockMvc.perform(put("/api/realty-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(realtyData)))
            .andExpect(status().isBadRequest());

        // Validate the RealtyData in the database
        List<RealtyData> realtyDataList = realtyDataRepository.findAll();
        assertThat(realtyDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRealtyData() throws Exception {
        // Initialize the database
        realtyDataRepository.saveAndFlush(realtyData);

        int databaseSizeBeforeDelete = realtyDataRepository.findAll().size();

        // Delete the realtyData
        restRealtyDataMockMvc.perform(delete("/api/realty-data/{id}", realtyData.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RealtyData> realtyDataList = realtyDataRepository.findAll();
        assertThat(realtyDataList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RealtyData.class);
        RealtyData realtyData1 = new RealtyData();
        realtyData1.setId(1L);
        RealtyData realtyData2 = new RealtyData();
        realtyData2.setId(realtyData1.getId());
        assertThat(realtyData1).isEqualTo(realtyData2);
        realtyData2.setId(2L);
        assertThat(realtyData1).isNotEqualTo(realtyData2);
        realtyData1.setId(null);
        assertThat(realtyData1).isNotEqualTo(realtyData2);
    }
}
