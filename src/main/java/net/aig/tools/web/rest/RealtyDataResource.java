package net.aig.tools.web.rest;
import net.aig.tools.domain.RealtyData;
import net.aig.tools.repository.RealtyDataRepository;
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
 * REST controller for managing RealtyData.
 */
@RestController
@RequestMapping("/api")
public class RealtyDataResource {

    private final Logger log = LoggerFactory.getLogger(RealtyDataResource.class);

    private static final String ENTITY_NAME = "realtyData";

    private final RealtyDataRepository realtyDataRepository;

    public RealtyDataResource(RealtyDataRepository realtyDataRepository) {
        this.realtyDataRepository = realtyDataRepository;
    }

    /**
     * POST  /realty-data : Create a new realtyData.
     *
     * @param realtyData the realtyData to create
     * @return the ResponseEntity with status 201 (Created) and with body the new realtyData, or with status 400 (Bad Request) if the realtyData has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/realty-data")
    public ResponseEntity<RealtyData> createRealtyData(@Valid @RequestBody RealtyData realtyData) throws URISyntaxException {
        log.debug("REST request to save RealtyData : {}", realtyData);
        if (realtyData.getId() != null) {
            throw new BadRequestAlertException("A new realtyData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RealtyData result = realtyDataRepository.save(realtyData);
        return ResponseEntity.created(new URI("/api/realty-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /realty-data : Updates an existing realtyData.
     *
     * @param realtyData the realtyData to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated realtyData,
     * or with status 400 (Bad Request) if the realtyData is not valid,
     * or with status 500 (Internal Server Error) if the realtyData couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/realty-data")
    public ResponseEntity<RealtyData> updateRealtyData(@Valid @RequestBody RealtyData realtyData) throws URISyntaxException {
        log.debug("REST request to update RealtyData : {}", realtyData);
        if (realtyData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RealtyData result = realtyDataRepository.save(realtyData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, realtyData.getId().toString()))
            .body(result);
    }

    /**
     * GET  /realty-data : get all the realtyData.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of realtyData in body
     */
    @GetMapping("/realty-data")
    public List<RealtyData> getAllRealtyData(@RequestParam(required = false) String filter) {
        if ("site-is-null".equals(filter)) {
            log.debug("REST request to get all RealtyDatas where site is null");
            return StreamSupport
                .stream(realtyDataRepository.findAll().spliterator(), false)
                .filter(realtyData -> realtyData.getSite() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all RealtyData");
        return realtyDataRepository.findAll();
    }

    /**
     * GET  /realty-data/:id : get the "id" realtyData.
     *
     * @param id the id of the realtyData to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the realtyData, or with status 404 (Not Found)
     */
    @GetMapping("/realty-data/{id}")
    public ResponseEntity<RealtyData> getRealtyData(@PathVariable Long id) {
        log.debug("REST request to get RealtyData : {}", id);
        Optional<RealtyData> realtyData = realtyDataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(realtyData);
    }

    /**
     * DELETE  /realty-data/:id : delete the "id" realtyData.
     *
     * @param id the id of the realtyData to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/realty-data/{id}")
    public ResponseEntity<Void> deleteRealtyData(@PathVariable Long id) {
        log.debug("REST request to delete RealtyData : {}", id);
        realtyDataRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
