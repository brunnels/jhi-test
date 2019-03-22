package net.aig.tools.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Site.
 */
@Entity
@Table(name = "site")
public class Site implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "site_contact")
    private String siteContact;

    @NotNull
    @Column(name = "updated_at", nullable = false)
    private ZonedDateTime updatedAt;

    @Column(name = "deleted_at")
    private ZonedDateTime deletedAt;

    @OneToOne
    @JoinColumn(unique = true)
    private RealtyData realtyData;

    @OneToMany(mappedBy = "site")
    private Set<Document> documents = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("sites")
    private SiteCategory category;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSiteContact() {
        return siteContact;
    }

    public Site siteContact(String siteContact) {
        this.siteContact = siteContact;
        return this;
    }

    public void setSiteContact(String siteContact) {
        this.siteContact = siteContact;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public Site updatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public ZonedDateTime getDeletedAt() {
        return deletedAt;
    }

    public Site deletedAt(ZonedDateTime deletedAt) {
        this.deletedAt = deletedAt;
        return this;
    }

    public void setDeletedAt(ZonedDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public RealtyData getRealtyData() {
        return realtyData;
    }

    public Site realtyData(RealtyData realtyData) {
        this.realtyData = realtyData;
        return this;
    }

    public void setRealtyData(RealtyData realtyData) {
        this.realtyData = realtyData;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public Site documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public Site addDocument(Document document) {
        this.documents.add(document);
        document.setSite(this);
        return this;
    }

    public Site removeDocument(Document document) {
        this.documents.remove(document);
        document.setSite(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public SiteCategory getCategory() {
        return category;
    }

    public Site category(SiteCategory siteCategory) {
        this.category = siteCategory;
        return this;
    }

    public void setCategory(SiteCategory siteCategory) {
        this.category = siteCategory;
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
        Site site = (Site) o;
        if (site.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), site.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Site{" +
            "id=" + getId() +
            ", siteContact='" + getSiteContact() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", deletedAt='" + getDeletedAt() + "'" +
            "}";
    }
}
