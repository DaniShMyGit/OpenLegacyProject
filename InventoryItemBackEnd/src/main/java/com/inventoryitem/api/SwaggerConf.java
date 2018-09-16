package com.inventoryitem.api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration

//Enables SpringFox support for Swagger
@EnableSwagger2

@Import(BeanValidatorPluginsConfiguration.class)
public class SwaggerConf {

	// The main bean used to configure SpringFox.
	@Bean
	public Docket apiDocket() {
		return new Docket(DocumentationType.SWAGGER_2)
				/*
				 * Creates a builder, which is used to define which controllers and which of
				 * their methods should be included in the generated documentation
				 */
				.select()
				// Defines the base package which holds the controller and model classes to be
				// included
				.apis(RequestHandlerSelectors.basePackage("com.inventoryitem")).build().apiInfo(getApiInfo());
	}

	// Provides general information about the API
	private ApiInfo getApiInfo() {
		return new ApiInfoBuilder().title("Stock List")
				.description("This documentaion demonstrates how to use the 'Inventory Item' app functions")
				.version("1.0.0").build();
	}
}
