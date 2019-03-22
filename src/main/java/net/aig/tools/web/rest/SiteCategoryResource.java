package net.aig.tools.web.rest;
import net.aig.tools.domain.SiteCategory;
import net.aig.tools.repository.SiteCategoryRepository;
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

/**
 * REST controller for managing SiteCategory.
 */
@RestController
@RequestMapping("/api")
public class SiteCategoryResource {

    private final Logger log = LoggerFactory.getLogger(SiteCategoryResource.class);

    private static final String ENTITY_NAME = "siteCategory";

    private final SiteCategoryRepository siteCategoryRepository;

    public SiteCategoryResource(SiteCategoryRepository siteCategoryRepository) {
        this.siteCategoryRepository = siteCategoryRepository;
    }

    /**
     * POST  /site-categories : Create a new siteCategory.
     *
     * @param siteCategory the siteCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new siteCategory, or with status 400 (Bad Request) if the siteCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/site-categories")
    public ResponseEntity<SiteCategory> createSiteCategory(@Valid @RequestBody SiteCategory siteCategory) throws URISyntaxException {
        log.debug("REST request to save SiteCategory : {}", siteCategory);
        if (siteCategory.getId() != null) {
            throw new BadRequestAlertException("A new siteCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SiteCategory result = siteCategoryRepository.save(siteCategory);
        return ResponseEntity.created(new URI("/api/site-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /site-categories : Updates an existing siteCategory.
     *
     * @param siteCategory the siteCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated siteCategory,
     * or with status 400 (Bad Request) if the siteCategory is not valid,
     * or with status 500 (Internal Server Error) if the siteCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/site-categories")
    public ResponseEntity<SiteCategory> updateSiteCategory(@Valid @RequestBody SiteCategory siteCategory) throws URISyntaxException {
        log.debug("REST request to update SiteCategory : {}", siteCategory);
        if (siteCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SiteCategory result = siteCategoryRepository.save(siteCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, siteCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /site-categories : get all the siteCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of siteCategories in body
     */
    @GetMapping("/site-categories")
    public List<SiteCategory> getAllSiteCategories() {
        log.debug("REST request to get all SiteCategories");
        return siteCategoryRepository.findAll();
    }

    /**
     * GET  /site-categories/:id : get the "id" siteCategory.
     *
     * @param id the id of the siteCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the siteCategory, or with status 404 (Not Found)
     */
    @GetMapping("/site-categories/{id}")
    public ResponseEntity<SiteCategory> getSiteCategory(@PathVariable Long id) {
        log.debug("REST request to get SiteCategory : {}", id);
        Optional<SiteCategory> siteCategory = siteCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(siteCategory);
    }

    /**
     * DELETE  /site-categories/:id : delete the "id" siteCategory.
     *
     * @param id the id of the siteCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/site-categories/{id}")
    public ResponseEntity<Void> deleteSiteCategory(@PathVariable Long id) {
        log.debug("REST request to delete SiteCategory : {}", id);
        siteCategoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
