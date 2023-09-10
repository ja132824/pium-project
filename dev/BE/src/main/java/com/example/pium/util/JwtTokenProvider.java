package com.example.pium.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static String secretKey ="rkGU45258GGhiolLO2465TFY5345kGU45258GGhiolLO2465TFY5345seeew";
    private static Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

    //==토큰 생성 메소드==//
    public static String createToken(int userNo) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + Duration.ofSeconds(30).toMillis()); // 만료기간 30초 (임시)
        Claims claims = Jwts.claims().setSubject(Integer.toString(userNo));
        return Jwts.builder()
                .setClaims(claims)
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // (1)
                .setIssuer(Integer.toString(userNo)) // 토큰발급자(iss)
                .setIssuedAt(now) // 발급시간(iat)
                .setExpiration(expiration) // 만료시간(exp)
//                .setSubject(subject) //  토큰 제목(subject)
                .signWith(key,SignatureAlgorithm.HS256) // 알고리즘, 시크릿 키
                .compact();
    }

    //==토큰 생성 메소드==//
    public static String createRefreshToken(int userNo) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + Duration.ofDays(14).toMillis()); // 만료기간
        Claims claims = Jwts.claims();
        return Jwts.builder()
                .setClaims(claims)
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // (1)
                .setIssuer(Integer.toString(userNo)) // 토큰발급자(iss)
                .setIssuedAt(now) // 발급시간(iat)
                .setExpiration(expiration) // 만료시간(exp)
//                .setSubject(subject) //  토큰 제목(subject)
                .signWith(key,SignatureAlgorithm.HS256) // 알고리즘, 시크릿 키
                .compact();
    }



//    //==Jwt 토큰의 유효성 체크 메소드==//
//    public static Claims parseJwtToken(String token) {
//        token = BearerRemove(token); // Bearer 제거
//        return Jwts.parserBuilder()
//                .setSigningKey(key)
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//    public String getSubject(String token) {
//        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
//    }

    public String getJwt(){
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        return request.getHeader("X-ACCESS-TOKEN");
    }


    //토큰에서 값 추출
    public String getUserNo(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    //유효한 토큰인지 확인
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            if (claims.getBody().getExpiration().before(new Date())) {
                System.out.println("GO");
                return false;
            }
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("BACK");
            return false;
        }
    }

}
