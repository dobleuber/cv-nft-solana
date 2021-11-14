use anchor_lang::prelude::*;


declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nft_cv {
    use super::*;
    pub fn create_cv(ctx: Context<CreateCV>, init_data: CurriculumVitae) -> ProgramResult {
        let cv = &mut ctx.accounts.cv;
        cv.basic_profile = init_data.basic_profile;
        cv.skills = init_data.skills;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateCV<'info> {
    #[account(init, payer = user, space = 4096)]
    pub cv: Account<'info, CurriculumVitae>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,

}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub struct BasicProfile  {
    pub first_name: String,
    pub last_name: String,
    pub headline: String,
    pub summary: String,
    pub phone: String,
    pub email: String,
    pub country: String,
}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub struct Position  {
    pub company_name: String,
    pub description: String,
    pub location: String,
    pub title: String,
    pub start_date: String,
    pub end_date: String,
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
    pub language: String,
    pub level: LanguageLevel,
}

#[account]
pub struct CurriculumVitae {
    pub basic_profile: BasicProfile,
    // pub positions: Vec<Position>,
    // pub education: Vec<Education>,
    // pub languages: Vec<Language>,
    pub skills: Vec<String>,
}
