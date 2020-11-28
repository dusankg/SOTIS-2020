package com.example.SOTIS.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

/***********************************************************************
 * Module: Predmet.java Author: Tamara and Dusan Purpose: Defines the Class
 * Predmet
 ***********************************************************************/

@Entity
/** @pdOid 504d1e35-43bb-40db-b9db-8ec39a8f5555 */
public class Predmet {

	@Id
	/** @pdOid 54579e1c-d939-47ca-b481-e4cb69285da4 */
	private long id;

	@Column
	/** @pdOid ad754e5d-65e8-4044-94c4-29d7b089052f */
	private String naziv;

	@OneToMany
	/**
	 * @pdRoleInfo migr=no name=Nastavnik assc=association7
	 *             coll=java.util.Collection impl=java.util.HashSet mult=0..*
	 *             type=Aggregation
	 */
	public Set<Nastavnik> nastavnik;

	@ManyToMany(mappedBy = "predmet")
	public Set<Ucenik> ucenik;

	/** @pdGenerated default getter */
	public java.util.Collection<Nastavnik> getNastavnik() {

		return nastavnik;
	}

	/**
	 * @pdGenerated default add
	 * @param newNastavnik
	 */
	public void addNastavnik(Nastavnik newNastavnik) {

		this.nastavnik.add(newNastavnik);
	}

	/**
	 * @pdGenerated default remove
	 * @param oldNastavnik
	 */
	public void removeNastavnik(Nastavnik oldNastavnik) {

		this.nastavnik.remove(oldNastavnik);
	}

	/** @pdGenerated default removeAll */
	public void removeAllNastavnik() {

		nastavnik.clear();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public Set<Ucenik> getUcenik() {
		return ucenik;
	}

	public void setUcenik(Set<Ucenik> ucenik) {
		this.ucenik = ucenik;
	}

	public void setNastavnik(Set<Nastavnik> nastavnik) {
		this.nastavnik = nastavnik;
	}

}