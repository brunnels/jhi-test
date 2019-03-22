package net.aig.tools.web.rest;

import net.aig.tools.TestApp;

import net.aig.tools.domain.SiteCategory;
import net.aig.tools.repository.SiteCategoryRepository;
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
import java.util.List;


import static net.aig.tools.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SiteCategoryResource REST controller.
 *
 * @see SiteCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestApp.class)
public class SiteCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SiteCategoryRepository siteCategoryRepository;

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

    private MockMvc restSiteCategoryMockMvc;

    private SiteCategory siteCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SiteCategoryResource siteCategoryResource = new SiteCategoryResource(siteCategoryRepository);
        this.restSiteCategoryMockMvc = MockMvcBuilders.standaloneSetup(siteCategoryResource)
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
    public static SiteCategory createEntity(EntityManager em) {
        SiteCategory siteCategory = new SiteCategory()
            .name(DEFAULT_NAME);
        return siteCategory;
    }

    @Before
    public void initTest() {
        siteCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createSiteCategory() throws Exception {
        int databaseSizeBeforeCreate = siteCategoryRepository.findAll().size();

        // Create the SiteCategory
        restSiteCategoryMockMvc.perform(post("/api/site-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(siteCategory)))
            .andExpect(status().isCreated());

        // Validate the SiteCategory in the database
        List<SiteCategory> siteCategoryList = siteCategoryRepository.findAll();
        assertThat(siteCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        SiteCategory testSiteCategory = siteCategoryList.get(siteCategoryList.size() - 1);
        assertThat(testSiteCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSiteCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = siteCategoryRepository.findAll().size();

        // Create the SiteCategory with an existing ID
        siteCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSiteCategoryMockMvc.perform(post("/api/site-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(siteCategory)))
            .andExpect(status().isBadRequest());

        // Validate the SiteCategory in the database
        List<SiteCategory> siteCategoryList = siteCategoryRepository.findAll();
        assertThat(siteCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = siteCategoryRepository.findAll().size();
        // set the field null
        siteCategory.setName(null);

        // Create the SiteCategory, which fails.

        restSiteCategoryMockMvc.perform(post("/api/site-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(siteCategory)))
            .andExpect(status().isBadRequest());

        List<SiteCategory> siteCategoryList = siteCategoryRepository.findAll();
        assertThat(siteCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSiteCategories() throws Exception {
        // Initialize the database
        siteCategoryRepository.saveAndFlush(siteCategory);

        // Get all the siteCategoryList
        restSiteCategoryMockMvc.perform(get("/api/site-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(siteCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getSiteCategory() throws Exception {
        // Initialize the database
        siteCategoryRepository.saveAndFlush(siteCategory);

        // Get the siteCategory
        restSiteCategoryMockMvc.perform(get("/api/site-categories/{id}", siteCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(siteCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSiteCategory() throws Exception {
        // Get the siteCategory
        restSiteCategoryMockMvc.perform(get("/api/site-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSiteCategory() throws Exception {
        // Initialize the database
        siteCategoryRepository.saveAndFlush(siteCategory);

        int databaseSizeBeforeUpdate = siteCategoryRepository.findAll().size();

        // Update the siteCategory
        SiteCategory updatedSiteCategory = siteCategoryRepository.findById(siteCategory.getId()).get();
        // Disconnect from session so that the updates on updatedSiteCategory are not directly saved in db
        em.detach(updatedSiteCategory);
        updatedSiteCategory
            .name(UPDATED_NAME);

        restSiteCategoryMockMvc.perform(put("/api/site-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSiteCategory)))
            .andExpect(status().isOk());

        // Validate the SiteCategory in the database
        List<SiteCategory> siteCategoryList = siteCategoryRepository.findAll();
        assertThat(siteCategoryList).hasSize(databaseSizeBeforeUpdate);
        SiteCategory testSiteCategory = siteCategoryList.get(siteCategoryList.size() - 1);
        assertThat(testSiteCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSiteCategory() throws Exception {
        int databaseSizeBeforeUpdate = siteCategoryRepository.findAll().size();

        // Create the SiteCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSiteCategoryMockMvc.perform(put("/api/site-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(siteCategory)))
            .andExpect(status().isBadRequest());

        // Validate the SiteCategory in the database
        List<SiteCategory> siteCategoryList = siteCategoryRepository.findAll();
        assertThat(siteCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSiteCategory() throws Exception {
        // Initialize the database
        siteCategoryRepository.saveAndFlush(siteCategory);

        int databaseSizeBeforeDelete = siteCategoryRepository.findAll().size();

        // Delete the siteCategory
        restSiteCategoryMockMvc.perform(delete("/api/site-categories/{id}", siteCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SiteCategory> siteCategoryList = siteCategoryRepository.findAll();
        assertThat(siteCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SiteCategory.class);
        SiteCategory siteCategory1 = new SiteCategory();
        siteCategory1.setId(1L);
        SiteCategory siteCategory2 = new SiteCategory();
        siteCategory2.setId(siteCategory1.getId());
        assertThat(siteCategory1).isEqualTo(siteCategory2);
        siteCategory2.setId(2L);
        assertThat(siteCategory1).isNotEqualTo(siteCategory2);
        siteCategory1.setId(null);
        assertThat(siteCategory1).isNotEqualTo(siteCategory2);
    }
}
