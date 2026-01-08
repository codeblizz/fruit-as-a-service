package com.fruit.service.config;

import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.SerializationFeature;
import tools.jackson.databind.json.JsonMapper;
import tools.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import tools.jackson.databind.jsontype.PolymorphicTypeValidator;
import tools.jackson.datatype.jsr310.JavaTimeModule;
import tools.jackson.databind.DefaultTyping;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.JacksonJsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

@Configuration
@EnableCaching
public class RedisConfig {

    public ObjectMapper redisObjectMapper() {
        PolymorphicTypeValidator ptv = BasicPolymorphicTypeValidator.builder()
                .allowIfBaseType(Object.class) 
                .build();

        return JsonMapper.builder()
                .addModule(new JavaTimeModule())
                .activateDefaultTyping(ptv, DefaultTyping.NON_FINAL)
                .configure(SerializationFeature.FAIL_ON_SELF_REFERENCES, false)
                .build();
    }

    @Bean
    public JacksonJsonRedisSerializer<Object> jacksonJsonRedisSerializer(ObjectMapper redisObjectMapper) {
        return new JacksonJsonRedisSerializer<>(redisObjectMapper, Object.class);
    }

    @Bean
    public RedisTemplate<Object, Object> redisTemplate(
            RedisConnectionFactory connectionFactory,
            JacksonJsonRedisSerializer<Object> jsonSerializer) {

        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        
        template.setValueSerializer(jsonSerializer);
        template.setHashValueSerializer(jsonSerializer);
        
        return template;
    }

    @Bean
    public RedisCacheConfiguration cacheConfiguration(JacksonJsonRedisSerializer<Object> jsonSerializer) {
        return RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofHours(1))
                .disableCachingNullValues()
                .serializeKeysWith(
                        RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jsonSerializer));
    }
}
