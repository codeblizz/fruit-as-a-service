// package com.fruit.service.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.Bean;
// import org.springframework.data.redis.connection.RedisConnectionFactory;
// import org.springframework.data.redis.core.RedisTemplate;
// import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
// import org.springframework.data.redis.serializer.StringRedisSerializer;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.datatype.hibernate5.jakarta.Hibernate5JakartaModule;

// @Configuration
// public class RedisConfig {

    // @Bean
    // public ObjectMapper objectMapper() {
    //     ObjectMapper mapper = new ObjectMapper();

    //     Hibernate5JakartaModule hibernateModule = new Hibernate5JakartaModule();
    //     hibernateModule.enable(Hibernate5JakartaModule.Feature.FORCE_LAZY_LOADING);

    //     mapper.registerModule(hibernateModule);
    //     mapper.findAndRegisterModules();

    //     return mapper;
    // }

    // @Bean
    // public RedisTemplate<Object, Object> redisTemplate(
    //         RedisConnectionFactory connectionFactory,
    //         ObjectMapper objectMapper) {

    //     RedisTemplate<Object, Object> template = new RedisTemplate<>();
    //     template.setConnectionFactory(connectionFactory);

    //     GenericJackson2JsonRedisSerializer jsonSerializer = new GenericJackson2JsonRedisSerializer(objectMapper);

    //     template.setKeySerializer(new StringRedisSerializer());
    //     template.setValueSerializer(jsonSerializer);

    //     template.setHashKeySerializer(new StringRedisSerializer());
    //     template.setHashValueSerializer(jsonSerializer);

    //     template.afterPropertiesSet();
    //     return template;
    // }
// }
