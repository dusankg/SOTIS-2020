package com.example.SOTIS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SOTIS.model.Test;
import com.example.SOTIS.model.DTO.MatrixDTO;
import com.example.SOTIS.model.DTO.NextQDTO;
import com.example.SOTIS.model.DTO.ProbabilityQuestionDTO;
import com.example.SOTIS.model.DTO.TestDTO;
import com.example.SOTIS.model.DTO.TestViewDTO;
import com.example.SOTIS.service.QtiService;
import com.example.SOTIS.service.TestService;

@RestController
@RequestMapping(value = "/test")
@CrossOrigin(origins = "http://localhost:4200")
public class TestController {

	@Autowired
	TestService testService;

	@Autowired
	QtiService qtiService;

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TestViewDTO> getTest(@PathVariable Long id) {
		if (testService.findById(id) != null)
			return new ResponseEntity<>(testService.findById(id), HttpStatus.OK);
		else
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping(value = "/quiz/{id}/{ucenikId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProbabilityQuestionDTO> startQuiz(@PathVariable Long id, @PathVariable Long ucenikId) {
		ProbabilityQuestionDTO pqd = testService.startQuiz(id, ucenikId);
		return new ResponseEntity<>(pqd, HttpStatus.OK);
	}

	@PostMapping(value = "/nextQ/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProbabilityQuestionDTO> nextQuestion(@PathVariable Long id, @RequestBody NextQDTO nqd) {
		System.out.println("next question " + nqd.getProbabs());
		System.out.println("next question " + nqd.getkSpaces());
		ProbabilityQuestionDTO pqd = testService.nextQuestion(id, nqd);
		System.out.println(pqd);
		return new ResponseEntity<>(pqd, HttpStatus.OK);
	}

	@GetMapping(value = "/nastavnik/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<TestDTO>> getAllByNastavnik(@PathVariable Long id) {
		return new ResponseEntity<>(testService.findAllByNastavnik(id), HttpStatus.OK);
	}

	@GetMapping(value = "/ucenik/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<TestDTO>> getAllByUcenik(@PathVariable Long id) {
		return new ResponseEntity<>(testService.findAllByUcenik(id), HttpStatus.OK);
	}

	@PostMapping(value = "/uradjen/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> submitTest(@PathVariable Long id, @RequestBody TestViewDTO test) {
		System.out.print(test);
		if (testService.submitTest(id, test))
			return new ResponseEntity<>(true, HttpStatus.OK);
		else
			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// use 100 as test id to evoke data from database
	@GetMapping(value = "/matrica/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MatrixDTO> getMatrix(@PathVariable Long id) {

		MatrixDTO matrica = testService.getMatrix(id);

		if (matrica != null) {

			return new ResponseEntity<>(matrica, HttpStatus.OK);
		} else
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> newTest(@RequestBody Test t) {
		System.out.print(t);
		if (testService.addTest(t));
		return new ResponseEntity<>(true, HttpStatus.OK);
	}

	// vraca lokaciju samog zip fajla, za download
	@GetMapping(value = "/generateQTI/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<byte[]> generateQTI(@PathVariable Long id) {
		return new ResponseEntity<>(qtiService.generateQTI(id), HttpStatus.OK);
	}

}
