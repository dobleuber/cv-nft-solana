import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { NftCv } from '../target/types/nft_cv';

describe('nft-cv', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.NftCv as Program<NftCv>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.createCv({});
    console.log("CV created", tx);
  });
});
