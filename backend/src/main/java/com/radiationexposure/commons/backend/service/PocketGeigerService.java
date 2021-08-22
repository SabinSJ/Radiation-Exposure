package com.radiationexposure.commons.backend.service;

import com.radiationexposure.commons.backend.model.PocketGeigerDTO;
import com.radiationexposure.commons.backend.repository.PocketGeigerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PocketGeigerService {

    PocketGeigerRepository pocketGeigerRepository;

    @Autowired
    public PocketGeigerService(PocketGeigerRepository pocketGeigerRepository) { this.pocketGeigerRepository = pocketGeigerRepository; }

    public void save(final PocketGeigerDTO pocketGeigerDTO) { pocketGeigerRepository.save(pocketGeigerDTO); }
}