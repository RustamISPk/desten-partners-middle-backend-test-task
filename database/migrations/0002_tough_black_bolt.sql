CREATE TABLE `MortgageCalculation` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(255),
	`mortgageProfileId` int,
	`monthlyPayment` float NOT NULL,
	`totalPayment` float NOT NULL,
	`totalOverpaymentAmount` float NOT NULL,
	`possibleTaxDeduction` float NOT NULL,
	`savingsDueMotherCapital` float NOT NULL,
	`recommendedIncome` float NOT NULL,
	`paymentSchedule` text NOT NULL,
	CONSTRAINT `MortgageCalculation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `MortgageCalculation` ADD CONSTRAINT `MortgageCalculation_userId_Users_tgId_fk` FOREIGN KEY (`userId`) REFERENCES `Users`(`tgId`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `MortgageCalculation` ADD CONSTRAINT `MortgageCalculation_mortgageProfileId_MortgageProfile_id_fk` FOREIGN KEY (`mortgageProfileId`) REFERENCES `MortgageProfile`(`id`) ON DELETE cascade ON UPDATE cascade;