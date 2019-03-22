package net.aig.tools.repository;

import net.aig.tools.domain.DocumentContent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DocumentContent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentContentRepository extends JpaRepository<DocumentContent, Long> {

}
