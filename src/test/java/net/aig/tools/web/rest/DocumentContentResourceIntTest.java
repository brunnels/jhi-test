package net.aig.tools.web.rest;

import net.aig.tools.TestApp;

import net.aig.tools.domain.DocumentContent;
import net.aig.tools.domain.Document;
import net.aig.tools.repository.DocumentContentRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static net.aig.tools.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DocumentContentResource REST controller.
 *
 * @see DocumentContentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestApp.class)
public class DocumentContentResourceIntTest {

    private static final byte[] DEFAULT_DATA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DATA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DATA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DATA_CONTENT_TYPE = "image/png";

    @Autowired
    private DocumentContentRepository documentContentRepository;

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

    private MockMvc restDocumentContentMockMvc;

    private DocumentContent documentContent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentContentResource documentContentResource = new DocumentContentResource(documentContentRepository);
        this.restDocumentContentMockMvc = MockMvcBuilders.standaloneSetup(documentContentResource)
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
    public static DocumentContent createEntity(EntityManager em) {
        DocumentContent documentContent = new DocumentContent()
            .data(DEFAULT_DATA)
            .dataContentType(DEFAULT_DATA_CONTENT_TYPE);
        // Add required entity
        Document document = DocumentResourceIntTest.createEntity(em);
        em.persist(document);
        em.flush();
        documentContent.setDocument(document);
        return documentContent;
    }

    @Before
    public void initTest() {
        documentContent = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentContent() throws Exception {
        int databaseSizeBeforeCreate = documentContentRepository.findAll().size();

        // Create the DocumentContent
        restDocumentContentMockMvc.perform(post("/api/document-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentContent)))
            .andExpect(status().isCreated());

        // Validate the DocumentContent in the database
        List<DocumentContent> documentContentList = documentContentRepository.findAll();
        assertThat(documentContentList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentContent testDocumentContent = documentContentList.get(documentContentList.size() - 1);
        assertThat(testDocumentContent.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testDocumentContent.getDataContentType()).isEqualTo(DEFAULT_DATA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createDocumentContentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentContentRepository.findAll().size();

        // Create the DocumentContent with an existing ID
        documentContent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentContentMockMvc.perform(post("/api/document-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentContent)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentContent in the database
        List<DocumentContent> documentContentList = documentContentRepository.findAll();
        assertThat(documentContentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDocumentContents() throws Exception {
        // Initialize the database
        documentContentRepository.saveAndFlush(documentContent);

        // Get all the documentContentList
        restDocumentContentMockMvc.perform(get("/api/document-contents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentContent.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataContentType").value(hasItem(DEFAULT_DATA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].data").value(hasItem(Base64Utils.encodeToString(DEFAULT_DATA))));
    }
    
    @Test
    @Transactional
    public void getDocumentContent() throws Exception {
        // Initialize the database
        documentContentRepository.saveAndFlush(documentContent);

        // Get the documentContent
        restDocumentContentMockMvc.perform(get("/api/document-contents/{id}", documentContent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentContent.getId().intValue()))
            .andExpect(jsonPath("$.dataContentType").value(DEFAULT_DATA_CONTENT_TYPE))
            .andExpect(jsonPath("$.data").value(Base64Utils.encodeToString(DEFAULT_DATA)));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentContent() throws Exception {
        // Get the documentContent
        restDocumentContentMockMvc.perform(get("/api/document-contents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentContent() throws Exception {
        // Initialize the database
        documentContentRepository.saveAndFlush(documentContent);

        int databaseSizeBeforeUpdate = documentContentRepository.findAll().size();

        // Update the documentContent
        DocumentContent updatedDocumentContent = documentContentRepository.findById(documentContent.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentContent are not directly saved in db
        em.detach(updatedDocumentContent);
        updatedDocumentContent
            .data(UPDATED_DATA)
            .dataContentType(UPDATED_DATA_CONTENT_TYPE);

        restDocumentContentMockMvc.perform(put("/api/document-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentContent)))
            .andExpect(status().isOk());

        // Validate the DocumentContent in the database
        List<DocumentContent> documentContentList = documentContentRepository.findAll();
        assertThat(documentContentList).hasSize(databaseSizeBeforeUpdate);
        DocumentContent testDocumentContent = documentContentList.get(documentContentList.size() - 1);
        assertThat(testDocumentContent.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testDocumentContent.getDataContentType()).isEqualTo(UPDATED_DATA_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentContent() throws Exception {
        int databaseSizeBeforeUpdate = documentContentRepository.findAll().size();

        // Create the DocumentContent

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentContentMockMvc.perform(put("/api/document-contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentContent)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentContent in the database
        List<DocumentContent> documentContentList = documentContentRepository.findAll();
        assertThat(documentContentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocumentContent() throws Exception {
        // Initialize the database
        documentContentRepository.saveAndFlush(documentContent);

        int databaseSizeBeforeDelete = documentContentRepository.findAll().size();

        // Delete the documentContent
        restDocumentContentMockMvc.perform(delete("/api/document-contents/{id}", documentContent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DocumentContent> documentContentList = documentContentRepository.findAll();
        assertThat(documentContentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentContent.class);
        DocumentContent documentContent1 = new DocumentContent();
        documentContent1.setId(1L);
        DocumentContent documentContent2 = new DocumentContent();
        documentContent2.setId(documentContent1.getId());
        assertThat(documentContent1).isEqualTo(documentContent2);
        documentContent2.setId(2L);
        assertThat(documentContent1).isNotEqualTo(documentContent2);
        documentContent1.setId(null);
        assertThat(documentContent1).isNotEqualTo(documentContent2);
    }
}
