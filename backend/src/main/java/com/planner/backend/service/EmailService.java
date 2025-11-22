package com.planner.backend.service;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import com.planner.backend.DTO.Mail;
import com.planner.backend.controller.EmailController;
import com.planner.backend.entity.UserProfile;
import com.planner.backend.repository.UserProfileRepository;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class EmailService {

    @Value("${app-password}")
    private String appPassword;

    private final UserProfileRepository userProfileRepository;

    public EmailService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public void sendEmail(Authentication authentication, Mail mail) {

        UserProfile userProfile = userProfileRepository.findUserProfileByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User profile not found for email: " + authentication.getName()));

        try {
            HtmlEmail email = new HtmlEmail();
            email.setHostName("smtp.gmail.com");
            email.setSmtpPort(587);
            email.setAuthentication("bdahal17@gmail.com", "cpdr rprz zeiy lzud");
            email.setStartTLSEnabled(true);
            InternetAddress internetAddress = new InternetAddress(mail.getEmail());
            email.setReplyTo(List.of(internetAddress));

            email.setFrom("bdahal17@gmail.com");
            email.addTo("officialrtaff@gmail.com");
            email.setSubject("New Client Inquiry - GG Decor");

            String htmlTemplate = createStyledEmailTemplate(mail, userProfile);
            email.setHtmlMsg(htmlTemplate);

            email.send();
            System.out.println("Email sent successfully!");
        } catch (EmailException e) {
            e.printStackTrace();
        } catch (AddressException e) {
            throw new RuntimeException(e);
        }
    }

    private String createStyledEmailTemplate(Mail mail, UserProfile userProfile) {
        StringBuilder htmlTemplate = new StringBuilder();
        htmlTemplate.append("<!DOCTYPE html>\n")
                .append("<html lang='en'>\n")
                .append("<head>\n")
                .append("    <meta charset='UTF-8'>\n")
                .append("    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n")
                .append("    <title>GG Decor - Client Inquiry</title>\n")
                .append("</head>\n")
                .append("<body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;'>\n")
                .append("    <div style='background-color: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;'>\n")
                .append("        <div style='background-color: #4A90E2; color: white; padding: 20px; text-align: center;'>\n")
                .append("            <h1 style='margin: 0; font-size: 24px;'>GG Decor</h1>\n")
                .append("            <p style='margin: 5px 0 0; font-size: 14px;'>New Client Inquiry</p>\n")
                .append("        </div>\n")
                .append("        <div style='padding: 20px;'>\n")
                .append("            <h2 style='color: #333; border-bottom: 2px solid #4A90E2; padding-bottom: 10px;'>Client Details</h2>\n")
                .append("            <table style='width: 100%; border-collapse: collapse;'>\n")
                .append("                <tr>\n")
                .append("                    <td style='padding: 10px; width: 30%; color: #666;'>First Name:</td>\n")
                .append(String.format("                    <td style='padding: 10px; color: #333;'>%s</td>\n", userProfile.getFirstName()))
                .append("                </tr>\n")
                .append("                <tr style='background-color: #f9f9f9;'>\n")
                .append("                    <td style='padding: 10px; color: #666;'>Last Name:</td>\n")
                .append(String.format("                    <td style='padding: 10px; color: #333;'>%s</td>\n", userProfile.getLastName()))
                .append("                </tr>\n")
                .append("                <tr>\n")
                .append("                    <td style='padding: 10px; color: #666;'>Email:</td>\n")
                .append(String.format("                    <td style='padding: 10px; color: #333;'>%s</td>\n", mail.getEmail()))
                .append("                </tr>\n")
                .append("                <tr style='background-color: #f9f9f9;'>\n")
                .append("                    <td style='padding: 10px; color: #666;'>Phone:</td>\n")
                .append(String.format("                    <td style='padding: 10px; color: #333;'>%s</td>\n", mail.getPhone()))
                .append("                </tr>\n")
                .append("                <tr style='background-color: #f9f9f9;'>\n")
                .append("                    <td style='padding: 10px; color: #666;'>Description:</td>\n")
                .append(String.format("                    <td style='padding: 10px; color: #333;'>%s</td>\n", mail.getMessage()))
                .append("                </tr>\n")
                .append("            </table>\n")
                .append("        </div>\n")
                .append("        <div style='background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #666;'>\n")
                .append("            © 2024 GG Decor. All rights reserved.\n")
                .append("        </div>\n")
                .append("    </div>\n")
                .append("</body>\n")
                .append("</html>");

        return htmlTemplate.toString();
    }


}

