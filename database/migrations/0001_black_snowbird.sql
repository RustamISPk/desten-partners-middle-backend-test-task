CREATE TABLE `MortgageProfile` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(255),
	`propertyPrice` float NOT NULL,
	`propertyType` enum('apartment_in_new_building','apartment_in_secondary_building','house','house_with_land_plot','land_plot','other') DEFAULT 'apartment_in_new_building',
	`downPaymentAmount` float NOT NULL,
	`matCapitalAmount` float,
	`matCapitalIncluded` boolean NOT NULL DEFAULT false,
	`mortgageTermYears` float NOT NULL,
	`interestRate` float NOT NULL,
	CONSTRAINT `MortgageProfile_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `MortgageProfile` ADD CONSTRAINT `MortgageProfile_userId_Users_tgId_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`tgId`) ON DELETE cascade ON UPDATE cascade;