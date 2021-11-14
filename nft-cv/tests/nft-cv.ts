import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { NftCv } from '../target/types/nft_cv';

describe('nft-cv', () => {
  // Use a local provider.
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.NftCv as Program<NftCv>;

  const {SystemProgram} = anchor.web3;

  // The Account to create.
  const myAccount = anchor.web3.Keypair.generate();

  it('Is initialized!', async () => {
    // Add your test here
    const basicProfile = {
      firstName: 'John',
      lastName: 'Doe',
      headline: 'Software Engineer',
      summary: 'I am a software engineer',
      phone: '+1-123-456-7890',
      email: 'john.doe@test.tst',
      country: 'US',
    };
    const skills = [
      'react',
      'typescript',
      'javascript',
      'node',
      'express',
    ];

    const tx = await program.rpc.createCv({basicProfile, skills},{
      accounts: {
        cv: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [myAccount],
    });

    console.log('tx: ', tx);

    let curriculumVitae = await program.account.curriculumVitae.fetch(myAccount.publicKey);

    console.log('cv', curriculumVitae);
  });
});
