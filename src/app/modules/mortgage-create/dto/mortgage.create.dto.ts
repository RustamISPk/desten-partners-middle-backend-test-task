import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

enum PropertyType {
  apartment_in_new_building = 'apartment_in_new_building',
  apartment_in_secondary_building = 'apartment_in_secondary_building',
  house = 'house',
  house_with_land_plot = 'house_with_land_plot',
  land_plot = 'land_plot',
  other = 'other'
}

export class MortgageCreateDto {
  @IsNotEmpty()
  @IsNumber()
  public readonly propertyPrice: number;
  @IsNotEmpty()
  @IsEnum(PropertyType)
  public readonly propertyType: PropertyType;

  @IsNotEmpty()
  @IsNumber()
  public readonly downPaymentAmount: number;

  public readonly matCapitalAmount: number | null;

  @IsNotEmpty()
  @IsBoolean()
  public readonly matCapitalIncluded: boolean;

  @IsNotEmpty()
  @IsNumber()
  public readonly mortgageTermYears: number;

  @IsNotEmpty()
  @IsNumber()
  public readonly interestRate: number;
}
