package com.assignmenthelper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetOtp(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Assignment Helper Agent - Password Reset Verification");
        
        String body = "Hello,\n\n"
                + "Your verification code is:\n\n"
                + otp + "\n\n"
                + "This code is valid for 10 minutes.\n\n"
                + "Do not share this code with anyone.\n\n"
                + "Regards,\n"
                + "Assignment Helper Agent";
                
        message.setText(body);
        mailSender.send(message);
    }
}
