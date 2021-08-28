package com.radiationexposure.commons.backend.jwt.resource;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class JwtTokenResponse {
    private final String token;
}
