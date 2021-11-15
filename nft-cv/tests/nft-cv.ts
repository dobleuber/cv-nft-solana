import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { NftCv } from '../target/types/nft_cv';
import assert from 'assert';

describe('nft-cv', async () => {
  // Use a local provider.
  const provider = anchor.Provider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.NftCv as Program<NftCv>;

  const {SystemProgram} = anchor.web3;

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

  const positions = [
    {
      title: 'Software Engineer',
      companyName: 'Test Company',
      startDate: 'may-2019',
      endDate: 'present',
      description: 'I am a software engineer',
      location: 'San Francisco, CA',
    }
  ];

  const education = [
    {
      organization: 'Test University',
      activities: 'I founded the test investigation group',
      startDate: 'jan-2013',
      endDate: 'april-2019',
      program: 'Test Program',
      fieldOfStudy: 'Science',
      degree: 'Bachelor',
    }
  ];

  // const languages = [{
  //   language: 'English',
  //   level: 'LanguageLevel.Elementary',
  // }]
  const skills = [
    'react',
    'typescript',
    'javascript',
    'node',
    'express',
  ];

  const cv = {
    basicProfile,
    education,
    positions,
    skills,
  };

  it('Is initialized!', async () => {

    // The Account to create.
    const myAccount = anchor.web3.Keypair.generate();

    await program.rpc.createCv(cv, provider.wallet.publicKey, {
      accounts: {
        cv: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [myAccount],
    });

    const curriculumVitae = await program.account.curriculumVitae
      .fetch(myAccount.publicKey);

    assert.deepEqual(
      curriculumVitae.basicProfile,
      basicProfile
    );

    assert.deepEqual(curriculumVitae.skills, skills);

    assert.deepEqual(curriculumVitae.positions, positions);

    assert.deepEqual(curriculumVitae.education, education);

    assert.deepEqual(curriculumVitae.owner, provider.wallet.publicKey);
  });

  it('Can update!', async () => {
      // The Account to create.
    const myAccount = anchor.web3.Keypair.generate();
    await program.rpc.createCv(cv, provider.wallet.publicKey, {
      accounts: {
        cv: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [myAccount],
    });

    const newBasicProfile = {
      ...basicProfile,
      headline: 'Blockchain Engineer',
    };

    const newPositions = [
      ...positions,
      {
        title: 'blockchain Engineer',
      companyName: 'Test Company',
      startDate: 'may-2019',
      endDate: 'present',
      description: 'I am a blockchain engineer',
      location: 'San Francisco, CA',
      }
    ];

    const newCv = {
      ...cv,
      basicProfile: newBasicProfile,
      positions: newPositions,
    };

    await program.rpc.updateCv(newCv, {
      accounts: {
        cv: myAccount.publicKey,
        owner: provider.wallet.publicKey
      }
    });

    const curriculumVitae = await program.account.curriculumVitae
    .fetch(myAccount.publicKey);

    assert.deepEqual(
      curriculumVitae.basicProfile,
      newBasicProfile
    );

    assert.deepEqual(curriculumVitae.positions, newPositions);
  });
});
