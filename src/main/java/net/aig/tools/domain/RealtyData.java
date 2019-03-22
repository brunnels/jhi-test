package net.aig.tools.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A RealtyData.
 */
@Entity
@Table(name = "realty_data")
public class RealtyData implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 700)
    @Column(name = "world_region", length = 700)
    private String worldRegion;

    @Size(max = 700)
    @Column(name = "region", length = 700)
    private String region;

    @Size(max = 150)
    @Column(name = "subregion", length = 150)
    private String subregion;

    @Size(max = 20)
    @Column(name = "device_region", length = 20)
    private String deviceRegion;

    @Size(max = 50)
    @Column(name = "country", length = 50)
    private String country;

    @Size(max = 2)
    @Column(name = "country_iso_2", length = 2)
    private String countryIso2;

    @Size(max = 3)
    @Column(name = "country_iso_3", length = 3)
    private String countryIso3;

    @Size(max = 70)
    @Column(name = "state_abbrev", length = 70)
    private String stateAbbrev;

    @Size(max = 150)
    @Column(name = "state_full", length = 150)
    private String stateFull;

    @Size(max = 700)
    @Column(name = "city", length = 700)
    private String city;

    @Size(max = 150)
    @Column(name = "common_name", length = 150)
    private String commonName;

    @Size(max = 150)
    @Column(name = "address_1", length = 150)
    private String address1;

    @Size(max = 25)
    @Column(name = "postal_code", length = 25)
    private String postalCode;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Size(max = 50)
    @Column(name = "building_status", length = 50)
    private String buildingStatus;

    @Size(max = 150)
    @Column(name = "primary_use", length = 150)
    private String primaryUse;

    @Column(name = "capacity")
    private Long capacity;

    @Column(name = "headcount")
    private Long headcount;

    @Column(name = "occupied")
    private Long occupied;

    @Size(max = 15)
    @Column(name = "colocation", length = 15)
    private String colocation;

    @Size(max = 400)
    @Column(name = "facility_name", length = 400)
    private String facilityName;

    @Size(max = 150)
    @Column(name = "building_image_path", length = 150)
    private String buildingImagePath;

    @NotNull
    @Column(name = "updated_at", nullable = false)
    private ZonedDateTime updatedAt;

    @Column(name = "deleted_at")
    private ZonedDateTime deletedAt;

    @OneToOne(mappedBy = "realtyData")
    @JsonIgnore
    private Site site;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorldRegion() {
        return worldRegion;
    }

    public RealtyData worldRegion(String worldRegion) {
        this.worldRegion = worldRegion;
        return this;
    }

    public void setWorldRegion(String worldRegion) {
        this.worldRegion = worldRegion;
    }

    public String getRegion() {
        return region;
    }

    public RealtyData region(String region) {
        this.region = region;
        return this;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getSubregion() {
        return subregion;
    }

    public RealtyData subregion(String subregion) {
        this.subregion = subregion;
        return this;
    }

    public void setSubregion(String subregion) {
        this.subregion = subregion;
    }

    public String getDeviceRegion() {
        return deviceRegion;
    }

    public RealtyData deviceRegion(String deviceRegion) {
        this.deviceRegion = deviceRegion;
        return this;
    }

    public void setDeviceRegion(String deviceRegion) {
        this.deviceRegion = deviceRegion;
    }

    public String getCountry() {
        return country;
    }

    public RealtyData country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountryIso2() {
        return countryIso2;
    }

    public RealtyData countryIso2(String countryIso2) {
        this.countryIso2 = countryIso2;
        return this;
    }

    public void setCountryIso2(String countryIso2) {
        this.countryIso2 = countryIso2;
    }

    public String getCountryIso3() {
        return countryIso3;
    }

    public RealtyData countryIso3(String countryIso3) {
        this.countryIso3 = countryIso3;
        return this;
    }

    public void setCountryIso3(String countryIso3) {
        this.countryIso3 = countryIso3;
    }

    public String getStateAbbrev() {
        return stateAbbrev;
    }

    public RealtyData stateAbbrev(String stateAbbrev) {
        this.stateAbbrev = stateAbbrev;
        return this;
    }

    public void setStateAbbrev(String stateAbbrev) {
        this.stateAbbrev = stateAbbrev;
    }

    public String getStateFull() {
        return stateFull;
    }

    public RealtyData stateFull(String stateFull) {
        this.stateFull = stateFull;
        return this;
    }

    public void setStateFull(String stateFull) {
        this.stateFull = stateFull;
    }

    public String getCity() {
        return city;
    }

    public RealtyData city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCommonName() {
        return commonName;
    }

    public RealtyData commonName(String commonName) {
        this.commonName = commonName;
        return this;
    }

    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }

    public String getAddress1() {
        return address1;
    }

    public RealtyData address1(String address1) {
        this.address1 = address1;
        return this;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public RealtyData postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Double getLatitude() {
        return latitude;
    }

    public RealtyData latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public RealtyData longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getBuildingStatus() {
        return buildingStatus;
    }

    public RealtyData buildingStatus(String buildingStatus) {
        this.buildingStatus = buildingStatus;
        return this;
    }

    public void setBuildingStatus(String buildingStatus) {
        this.buildingStatus = buildingStatus;
    }

    public String getPrimaryUse() {
        return primaryUse;
    }

    public RealtyData primaryUse(String primaryUse) {
        this.primaryUse = primaryUse;
        return this;
    }

    public void setPrimaryUse(String primaryUse) {
        this.primaryUse = primaryUse;
    }

    public Long getCapacity() {
        return capacity;
    }

    public RealtyData capacity(Long capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public Long getHeadcount() {
        return headcount;
    }

    public RealtyData headcount(Long headcount) {
        this.headcount = headcount;
        return this;
    }

    public void setHeadcount(Long headcount) {
        this.headcount = headcount;
    }

    public Long getOccupied() {
        return occupied;
    }

    public RealtyData occupied(Long occupied) {
        this.occupied = occupied;
        return this;
    }

    public void setOccupied(Long occupied) {
        this.occupied = occupied;
    }

    public String getColocation() {
        return colocation;
    }

    public RealtyData colocation(String colocation) {
        this.colocation = colocation;
        return this;
    }

    public void setColocation(String colocation) {
        this.colocation = colocation;
    }

    public String getFacilityName() {
        return facilityName;
    }

    public RealtyData facilityName(String facilityName) {
        this.facilityName = facilityName;
        return this;
    }

    public void setFacilityName(String facilityName) {
        this.facilityName = facilityName;
    }

    public String getBuildingImagePath() {
        return buildingImagePath;
    }

    public RealtyData buildingImagePath(String buildingImagePath) {
        this.buildingImagePath = buildingImagePath;
        return this;
    }

    public void setBuildingImagePath(String buildingImagePath) {
        this.buildingImagePath = buildingImagePath;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public RealtyData updatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public ZonedDateTime getDeletedAt() {
        return deletedAt;
    }

    public RealtyData deletedAt(ZonedDateTime deletedAt) {
        this.deletedAt = deletedAt;
        return this;
    }

    public void setDeletedAt(ZonedDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Site getSite() {
        return site;
    }

    public RealtyData site(Site site) {
        this.site = site;
        return this;
    }

    public void setSite(Site site) {
        this.site = site;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        RealtyData realtyData = (RealtyData) o;
        if (realtyData.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), realtyData.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RealtyData{" +
            "id=" + getId() +
            ", worldRegion='" + getWorldRegion() + "'" +
            ", region='" + getRegion() + "'" +
            ", subregion='" + getSubregion() + "'" +
            ", deviceRegion='" + getDeviceRegion() + "'" +
            ", country='" + getCountry() + "'" +
            ", countryIso2='" + getCountryIso2() + "'" +
            ", countryIso3='" + getCountryIso3() + "'" +
            ", stateAbbrev='" + getStateAbbrev() + "'" +
            ", stateFull='" + getStateFull() + "'" +
            ", city='" + getCity() + "'" +
            ", commonName='" + getCommonName() + "'" +
            ", address1='" + getAddress1() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", buildingStatus='" + getBuildingStatus() + "'" +
            ", primaryUse='" + getPrimaryUse() + "'" +
            ", capacity=" + getCapacity() +
            ", headcount=" + getHeadcount() +
            ", occupied=" + getOccupied() +
            ", colocation='" + getColocation() + "'" +
            ", facilityName='" + getFacilityName() + "'" +
            ", buildingImagePath='" + getBuildingImagePath() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", deletedAt='" + getDeletedAt() + "'" +
            "}";
    }
}
