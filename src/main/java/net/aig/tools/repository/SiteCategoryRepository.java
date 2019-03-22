package net.aig.tools.repository;

import net.aig.tools.domain.SiteCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SiteCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SiteCategoryRepository extends JpaRepository<SiteCategory, Long> {

}
