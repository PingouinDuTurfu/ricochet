package fr.pingouinduturfu.ricochet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
    private static final String[] EVERYONE_LIST_URLS = {
            "/", "/home", "/register", "/login"
    };

    private static final String[] USER_LIST_URLS = {
            "/play/classic", "/play/classic/try", "/play/classic/previous",
            "/play/splash_art", "/play/splash_art/try", "/play/splash_art/previous", "play/splash_art/partial_splash_art",
            "/leaderboard/classic_game", "/leaderboard/splash_art"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
        return http.build();
    }
}