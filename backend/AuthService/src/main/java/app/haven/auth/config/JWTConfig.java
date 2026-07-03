package app.haven.auth.config;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.security.KeyStore;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@Configuration
public class JWTConfig {

    @Value("${app.security.keystore-location}")
    private Resource keystoreLocation;

    @Value("${app.security.keystore-password}")
    private String keystorePassword;

    @Value("${app.security.key-alias}")
    private String keyAlias;

    @Value("${app.security.key-password}")
    private String keyPassword;

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        try {
            KeyStore keyStore = KeyStore.getInstance("PKCS12");

            try (InputStream inputStream = keystoreLocation.getInputStream()) {
                keyStore.load(inputStream, keystorePassword.toCharArray());
            }

            RSAPrivateKey privateKey = (RSAPrivateKey) keyStore.getKey(keyAlias, keyPassword.toCharArray());
            RSAPublicKey publicKey = (RSAPublicKey) keyStore.getCertificate(keyAlias).getPublicKey();

            RSAKey rsaKey = new RSAKey.Builder(publicKey)
                    .privateKey(privateKey)
                    .keyID("haven-static-production-kid")
                    .build();

            return new ImmutableJWKSet<>(new JWKSet(rsaKey));
        } catch (Exception ex) {
            throw new IllegalStateException("Failed to load production keystore properties", ex);
        }
    }
}
