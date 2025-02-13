// src/dto/flight-create.dto.ts
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class FlightCreateDto {
    @IsNotEmpty()
    @IsString()
    origin!: string;

    @IsNotEmpty()
    @IsString()
    destination!: string;

    @IsNotEmpty()
    @IsDateString()
    departure!: Date; // Or string, depending on your data format

    @IsNotEmpty()
    @IsDateString()
    arrival!: Date;   // Or string, depending on your data format

    // ... other required fields for Flight creation ...
}