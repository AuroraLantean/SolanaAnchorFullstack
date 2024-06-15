use anchor_lang::prelude::*;

declare_id!("C21vgVwS2X1g9XmSyJPFtLfrob5zwwoij54L7Rq6dmes");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
