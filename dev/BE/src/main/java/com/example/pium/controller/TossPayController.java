package com.example.pium.controller;

import com.example.pium.config.TossPaymentConfig;
import com.example.pium.dto.PaymentSuccessDto;
import com.example.pium.entity.PointTypeEntity;
import com.example.pium.entity.UserEntity;
import com.example.pium.service.PointServiceImp;
import com.example.pium.service.UserServiceImp;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RequestMapping("/toss")
@RestController
@Slf4j
public class TossPayController {

    private final TossPaymentConfig tossPaymentConfig;
    private final UserServiceImp userService;


    @GetMapping("success")
    public ResponseEntity paymentResult(@RequestParam(value = "orderId") String orderId, @RequestParam(value = "paymentKey") String paymentKey, @RequestParam(value = "amount") int amount, HttpServletRequest request) {
        log.info("request to api/v1/toss/success  Method:[GET]");
        Integer userNo = (Integer) request.getAttribute("userNo");
        UserEntity user = userService.getUserInfo(userNo);
        Map<String,String> params = new HashMap<>();
        params.put("orderId",orderId);
        params.put("amount",String.valueOf(amount));
        params.put("paymentKey",paymentKey);
        String encodedAuthKey = new String(
                Base64.getEncoder().encode((tossPaymentConfig.getTESTSECRETKEY() + ":").getBytes(StandardCharsets.UTF_8)));

            try{
                PaymentSuccessDto paymentSuccessDto = WebClient.create(tossPaymentConfig.getURL()).post().headers(httpHeaders -> {
                    httpHeaders.setBasicAuth(encodedAuthKey);
                    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
                    httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
                }).body(BodyInserters.fromValue(params)).retrieve().bodyToMono(PaymentSuccessDto.class).block();
                user.setCash(user.getCash()+amount);
                userService.save(user);
                log.info("충전금액 : "+amount+" 충전 성공");
                return ResponseEntity.ok("성공");
            }
            catch (Exception e){
                log.error("충전 실패");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("실패");
            }









    }

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        String encodedAuthKey = new String(
                Base64.getEncoder().encode((tossPaymentConfig.getTESTSECRETKEY() + ":").getBytes(StandardCharsets.UTF_8)));
        headers.setBasicAuth(encodedAuthKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        return headers;
    }

}



