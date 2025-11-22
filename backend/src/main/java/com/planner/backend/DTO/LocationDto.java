package com.planner.backend.DTO;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationDto {

    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    // Address fields (keep flexible; adjust @NotBlank if you want required)
    @NotBlank(message = "Address Line 1 is required")
    private String addressLine1;
    private String addressLine2;
    @NotBlank(message = "City is required")
    private String city;
    @NotBlank(message = "State is required")
    private String state;
    @NotBlank(message = "Postal Code is required")
    private String postalCode;
    @NotBlank(message = "Country is required")
    private String country;

    // Latitude/Longitude optional but if present they should be in valid ranges
    @DecimalMin(value = "-90.0", inclusive = true, message = "Latitude must be >= -90")
    @DecimalMax(value = "90.0", inclusive = true, message = "Latitude must be <= 90")
    private Double latitude;

    @DecimalMin(value = "-180.0", inclusive = true, message = "Longitude must be >= -180")
    @DecimalMax(value = "180.0", inclusive = true, message = "Longitude must be <= 180")
    private Double longitude;
}

