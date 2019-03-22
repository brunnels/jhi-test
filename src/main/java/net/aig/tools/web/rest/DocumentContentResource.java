package net.aig.tools.web.rest;
import net.aig.tools.domain.DocumentContent;
import net.aig.tools.repository.DocumentContentRepository;
import net.aig.tools.web.rest.errors.BadRequestAlertException;
import net.aig.tools.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing DocumentContent.
 */
@RestController
@RequestMapping("/api")
public class DocumentContentResource {

    private final Logger log = LoggerFactory.getLogger(DocumentContentResource.class);

    private static final String ENTITY_NAME = "documentContent";

    private final DocumentContentRepository documentContentRepository;

    public DocumentContentResource(DocumentContentRepository documentContentRepository) {
        this.documentContentRepository = documentContentRepository;
    }

    /**
     * POST  /document-contents : Create a new documentContent.
     *
     * @param documentContent the documentContent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new documentContent, or with status 400 (Bad Request) if the documentContent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/document-contents")
    public ResponseEntity<DocumentContent> createDocumentContent(@Valid @RequestBody DocumentContent documentContent) throws URISyntaxException {
        log.debug("REST request to save DocumentContent : {}", documentContent);
        if (documentContent.getId() != null) {
            throw new BadRequestAlertException("A new documentContent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentContent result = documentContentRepository.save(documentContent);
        return ResponseEntity.created(new URI("/api/document-contents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /document-contents : Updates an existing documentContent.
     *
     * @param documentContent the documentContent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated documentContent,
     * or with status 400 (Bad Request) if the documentContent is not valid,
     * or with status 500 (Internal Server Error) if the documentContent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/document-contents")
    public ResponseEntity<DocumentContent> updateDocumentContent(@Valid @RequestBody DocumentContent documentContent) throws URISyntaxException {
        log.debug("REST request to update DocumentContent : {}", documentContent);
        if (documentContent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocumentContent result = documentContentRepository.save(documentContent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, documentContent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /document-contents : get all the documentContents.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of documentContents in body
     */
    @GetMapping("/document-contents")
    public List<DocumentContent> getAllDocumentContents(@RequestParam(required = false) String filter) {
        if ("document-is-null".equals(filter)) {
            log.debug("REST request to get all DocumentContents where document is null");
            return StreamSupport
                .stream(documentContentRepository.findAll().spliterator(), false)
                .filter(documentContent -> documentContent.getDocument() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all DocumentContents");
        return documentContentRepository.findAll();
    }

    /**
     * GET  /document-contents/:id : get the "id" documentContent.
     *
     * @param id the id of the documentContent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the documentContent, or with status 404 (Not Found)
     */
    @GetMapping("/document-contents/{id}")
    public ResponseEntity<DocumentContent> getDocumentContent(@PathVariable Long id) {
        log.debug("REST request to get DocumentContent : {}", id);
        Optional<DocumentContent> documentContent = documentContentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documentContent);
    }

    /**
     * DELETE  /document-contents/:id : delete the "id" documentContent.
     *
     * @param id the id of the documentContent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/document-contents/{id}")
    public ResponseEntity<Void> deleteDocumentContent(@PathVariable Long id) {
        log.debug("REST request to delete DocumentContent : {}", id);
        documentContentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
