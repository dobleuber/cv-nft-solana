use anchor_lang::prelude::*;
use std::collections::HashMap;


declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nft_cv {
    use super::*;
    pub fn create_cv(ctx: Context<CreateCV>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateCV {}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub struct BasicProfile  {
    first_name: String,
    last_name: String,
    headline: String,
    summary: String,
    phone: String,
    email: String,
    country: String,
}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub struct Position  {
    company_name: String,
    description: String,
    location: String,
    title: String,
    start_date: String,
    end_date: String,
}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub struct Education {
    activities: String,
    degree: String,
    end_date: String,
    field_of_study: String,
    start_date: String,
    program: String,
    organization: String,
}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub enum LanguageLevel {
    Elementary,
    LimitedWorking,
    ProfessionalWorking,
    FullProfessional,
    NativeOrBilingual,
}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub struct Language {
    language: String,
    level: LanguageLevel,
}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub struct CurriculumVitae {
    basic_profile: BasicProfile,
    positions: Vec<Position>,
    education: Vec<Education>,
    languages: Vec<Language>,
    skills: Vec<String>,
}

#[account]
pub struct CVList {
    user_list: Vec<Pubkey>,
    cv_list: Vec<CurriculumVitae>,
}
