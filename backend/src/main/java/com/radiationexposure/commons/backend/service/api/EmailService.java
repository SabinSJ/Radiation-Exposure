package com.radiationexposure.commons.backend.service.api;

import org.springframework.mail.SimpleMailMessage;

public interface EmailService {

    public void sendEmail(SimpleMailMessage email);
}
