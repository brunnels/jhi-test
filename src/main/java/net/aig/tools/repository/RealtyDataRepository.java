package net.aig.tools.repository;

import net.aig.tools.domain.RealtyData;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RealtyData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RealtyDataRepository extends JpaRepository<RealtyData, Long> {

}
