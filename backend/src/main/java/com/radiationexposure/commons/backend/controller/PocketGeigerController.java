package com.radiationexposure.commons.backend.controller;

import com.radiationexposure.commons.backend.model.PocketGeigerDTO;
import com.radiationexposure.commons.backend.service.PocketGeigerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sensor")
public class PocketGeigerController {

    private PocketGeigerService pocketGeigerService;

    @Autowired
    public PocketGeigerController(PocketGeigerService pocketGeigerService) { this.pocketGeigerService = pocketGeigerService; }

    @PostMapping
    public void save(@RequestBody final PocketGeigerDTO pocketGeigerDTO)
    {
        pocketGeigerService.save(pocketGeigerDTO);
    }
}