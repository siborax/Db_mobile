package com.example.demo;

import com.sun.xml.internal.ws.spi.db.DatabindingException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;

@Controller
public class ViewController {
    @RequestMapping("/")
    public String main(Model model){
        model.addAttribute("datetime", new Date());
        model.addAttribute("username","User_id");
        return "main";
    }
}
