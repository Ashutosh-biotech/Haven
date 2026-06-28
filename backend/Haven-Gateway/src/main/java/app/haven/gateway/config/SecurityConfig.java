package app.haven.gateway.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    public SecurityWebFilterChain securityFilterChain(ServerHttpSecurity http) {
        http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(
                        exchange -> exchange
                                .pathMatchers("/api/**", "/actuator/**").permitAll()
                                .pathMatchers("/api/admin/**").hasRole("ADMIN")
                                .anyExchange().authenticated()
                )
                .oauth2ResourceServer(
                        authServer -> authServer
                                .jwt(
                                        jwt -> jwt
                                                .jwtAuthenticationConverter(new CustomReactiveJwtAuthenticationConverter())
                                )
                );
        return http.build();
    }
}
